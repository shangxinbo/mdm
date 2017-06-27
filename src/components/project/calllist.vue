<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{project.name}}外呼列表</div>
            <div class="tag-nav" v-if="!end">
                <a href="javascript:void(0);" :class="{active:clue_status==0}" @click="tab(0)">未完成</a>
                <a href="javascript:void(0);" :class="{active:clue_status==1}" @click="tab(1)">已完成</a>
            </div>
            <div class="data-property">
                <searchForm @submit="search" :status="clue_status"></searchForm>
            </div>
            <div class="data-warp">
                <div class="cutover">
                    <div class="data-table cutover-tab01">
                        <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                            <tbody>
                                <tr>
                                    <th>拨打资源</th>
                                    <th>分配日期</th>
                                    <th v-if="clue_status==0">拨打状态</th>
                                    <th>拨打结果</th>
                                    <th>操作</th>
                                </tr>
                                <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                    <td>{{item.telephone}}</td>
                                    <td>{{item.distribution_date}}</td>
                                    <td v-if="clue_status==0">{{item.is_dial==1?'已拨打':'未拨打'}}</td>
                                    <td>{{item.dial_status | toResultText}}</td>
                                    <td>
                                        <a href="javascript:void(0);" @click="call(item.id,item.telephone)">
                                            <span class="notice">
                                                <i class="icon phone"></i>
                                            </span>拨打
                                        </a>
                                        <a v-if="item.is_dial!=0||clue_status!=0" href="javascript:void(0);" @click="view(item.id)">查看</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p v-else class="no-data">暂无数据</p>
                    </div>
                    <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
                </div>
            </div>
        </div>
        <doCallDialog ref="doCallDialog" :uuid="uuid"></doCallDialog>
        <callViewDialog ref="callViewDialog" @callThis="call"></callViewDialog>
        <alert ref="alert"></alert>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import pages from 'components/common/pages'
    import alert from 'components/dialog/alert'
    import doCallDialog from './dialog/doCall'
    import callViewDialog from './dialog/callView'
    import searchForm from './calllistForm'
    import callResultConf from './callResultConf'
    import md5 from 'js-md5'
    export default {
        data: () => {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                project: {
                    id: '',
                    name: ''
                },
                user_id: user.id,
                currentPage: 1,
                totalPage: 1,
                clue_status: '',
                list: [],
                uuid: '',
                end: ''
            }
        },
        computed: {
            dialing: function () {
                return this.$store.state.dialing
            },
            tel_pre:function(){
                return this.$store.state.tel_pre
            },
            seat_info:function(){
                return this.$store.state.callInfo
            }
        },
        components: {
            mselect,
            pages,
            alert,
            doCallDialog,
            callViewDialog,
            searchForm
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        filters: {
            toResultText(value) {
                if (value) {
                    return callResultConf[value]
                } else {
                    return '未拨通'
                }
            },
            md5Tel(value) {
                let mm = md5.create().update(value).hex()
                return mm.substr(0, 16)
            }
        },
        methods: {
            init() {
                this.project = {
                    id: this.$route.query.id,
                    name: this.$route.query.projectName
                }
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.clue_status = this.$route.query.clue_status ? this.$route.query.clue_status : 0
                this.end = this.$route.query.end
                this.render()
            },
            search(param) {
                let query
                if (!isNaN(param)) {
                    query = Object.assign({}, this.$route.query, { page: param })
                } else {
                    query = Object.assign({}, this.$route.query, param, { page: 1 })
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            },
            render() {
                let _this = this
                mAjax(this, {
                    url: API.project_call_list,
                    data: {
                        id: this.project.id,
                        clue_status: _this.clue_status,
                        is_dial: _this.$route.query.isDial,
                        dial_status: _this.$route.query.dialStatus,
                        created_at_start: _this.$route.query.startTime,
                        created_at_end: _this.$route.query.endTime,
                        page: _this.currentPage
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.list = data.data.data
                            _this.totalPage = Math.ceil(data.data.total / data.data.per_page)
                        } else if (data.code == 10005) {
                            _this.$refs.alert.$emit('show', data.message, function () {
                                _this.$router.replace('/')
                            })
                        } else {
                            _this.$refs.alert.$emit('show', data.message)
                        }
                    }
                })
            },
            tab(num) {
                this.$router.replace({
                    name: this.$route.name,
                    query: Object.assign({}, this.$route.query, {
                        clue_status: num,
                        isDial: '',
                        dialStatus: '',
                        startTime: '',
                        endTime: '',
                        page: 1
                    })
                })
            },
            call(id, tel) {
                let _this = this
                let uuid = ''
                

                window.mycomm_agent.on_dial_s = function (evt) {
                    _this.$refs.doCallDialog.$emit('show', id, tel, _this.project.name)
                }
                window.mycomm_agent.on_dial_f = function (evt) {
                    _this.$store.commit('SHOW_TOAST', evt.params.err_des)
                    window.mycomm_agent.logout()
                }

                //用户接通后挂断
                window.mycomm_agent.on_agent_ext_hangup = function (evt) {
                    _this.$store.commit('CHANGE_DIAL_STATUS', false)
                    window.mycomm_agent.logout()
                    mAjax(_this, {
                        url: API.add_call_job,
                        data: {
                            call_uuid: _this.uuid
                        },
                        success: data => {
                            console.log('拨叫任务处理完毕')
                        }
                    })
                }

                window.mycomm_agent.on_agent_dial_start = function (evt) {
                    _this.uuid = evt.params.channel_uuid
                    let tel = evt.params.dest_number.replace(_this.tel_pre,'')
                    _this.$store.commit('CHANGE_DIAL_STATUS',true)
                    mAjax(_this, {
                        url: API.save_call_uuid,
                        data: {
                            call_uuid: _this.uuid,
                            phone: tel,
                            project_id: _this.project.id
                        },
                        success: data => {
                            console.log('已经记录任务')
                        }
                    })
                }

                mAjax(this, {
                    url: API.get_myclient_balance,
                    data: {
                        seat_id: _this.user_id
                    },
                    success: data => {
                        if (data.code == 200) {
                            if (data.data.balance <= 0) {
                                _this.$refs.alert.$emit('show', '您的账号已经没有费用，请联系管理员')
                            } else if (!data.data.valid) {
                                _this.$refs.alert.$emit('show', '坐席已失效,暂不能拨打')
                            } else {
                                mAjax(this, {
                                    url: API.get_tel,
                                    data: {
                                        id: id
                                    },
                                    success: data => {
                                        mAjax(this,{
                                            url:API.dial_pre,
                                            data:{
                                                id:id
                                            }
                                        })
                                        let info = this.seat_info

                                        let tel_all = data.data.telephone
                                        if (this.tel_pre) {
                                            tel_all = this.tel_pre + tel_all
                                        }
                                        window.mycomm_agent.wrap_up(0)
                                        window.mycomm_agent.on_login_s = function (evt) {
                                            window.mycomm_agent.dial(tel_all, 'geo', 'great')
                                            setInterval(() => {  //延长用户有效期
                                                mAjax(_this, {
                                                    url: API.get_myclient_balance,
                                                    success: data => {
                                                        //console.log(123)
                                                    }
                                                })
                                            }, 30 * 1000)
                                        }
                                        window.mycomm_agent.on_login_f = function (evt) {
                                            let msg = '服务暂不可用，请联系管理员'
                                            switch (evt.params.err_num) {
                                                case 404:
                                                    msg = 'IP电话/软电话/分机没有注册，请根据IP电话机内置说明书进行配置，如有疑问请联系管理员'
                                                    break
                                                case 409:
                                                    msg = '该分机已经被其他坐席使用，请联系管理员'
                                                    break
                                                case 503:
                                                    msg = '服务暂不可用，请联系管理员'
                                                    break
                                                default:
                                                    msg = '服务暂不可用，请联系管理员'
                                            }
                                            _this.$refs.alert.$emit('show', msg)
                                        }
                                        window.mycomm_agent.login(info.cti_server + ':' + info.cti_port, info.agent_id.toString(), info.password, info.queue, info.is_leader, info.org_id, info.agent_name, info.work_id.toString(), info.agent_type)
                                    }
                                })
                            }
                        } else {
                            _this.$refs.alert.$emit('show', '获取坐席账户状态失败,暂不能拨打')
                        }
                    }
                })
            },
            view(id) {
                this.$refs.callViewDialog.$emit('show', id, this.project.name)
            }
        },
        created() {
            this.init()
        }
    }

</script>