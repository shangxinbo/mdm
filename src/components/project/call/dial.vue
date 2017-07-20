<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{render.projectName}}拨打详情</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text seat-text">
                        <li class="li-fl">
                            <div class="fl-in">
                                <label class="name">拨打资源</label>
                                <div class="input-warp">
                                    <p class="text">{{render.tel}}</p>
                                </div>
                            </div>
                            <div class="fl-in" v-if="render.city">
                                <label class="name">归属地</label>
                                <div class="input-warp">
                                    <p class="text">{{render.city}}</p>
                                </div>
                            </div>
                            <div class="fl-in" v-if="dialing">
                                <button class="btn red" type="button" @click="drop()">
                                    <span>
                                        <i class="icon hangup"></i>挂断</span>
                                </button>
                            </div>
                            <div class="fl-in" v-if="variable.showsms&&render.smsShow">
                                <a class="btn-sms" href="javascript:void(0);" @click="sms">
                                    <span>
                                        <i class="icon sms"></i>发短信</span>
                                </a>
                            </div>
                        </li>
                        <li class="li-sex">
                            <label class="name">
                                <em>（选填）</em>称呼</label>
                            <div class="input-warp">
                                <input class="text" type="text" v-model="variable.call">
                                <label class="radio-warp" @click="chooseSex('男')" :class="{'radio-active':variable.sex=='男'}" for="male">
                                    <input type="radio" name="sendMode" class="radio" id="male" value="male">
                                    <i class="icon"></i>
                                    <span class="radioname">先生</span>
                                </label>
                                <label class="radio-warp" @click="chooseSex('女')" :class="{'radio-active':variable.sex=='女'}" for="female">
                                    <input type="radio" name="sendMode" class="radio" id="female" value="female">
                                    <i class="icon"></i>
                                    <span class="radioname">女士</span>
                                </label>
                            </div>
                        </li>
                        <li class="li-fl">
                            <label class="name">拨打结果</label>
                            <mselect ref="result1Select" :api="api.getResult1" style="padding-right:10px;" @change="linkResult"></mselect>
                            <mselect ref="result2Select" :api="api.getResult2" :param="variable.param"></mselect>
                            <p class="error" style="padding-left:75px;" v-show="variable.result_error">{{variable.result_error}}</p>
                        </li>
                        <li>
                            <label class="name">
                                <em>（选填）</em>备注说明</label>
                            <div class="input-warp">
                                <textarea v-model="variable.desc"></textarea>
                                <p v-if="variable.desc_error" class="error">{{variable.desc_error}}</p>
                            </div>
                        </li>
                        <li class="li-btn">
                            <div class="input-warp input-fl">
                                <button class="btn" :class="{disabled:!variable.complete}" @click="saveAndExit" type="button">保存并关闭</button>
                                <button class="btn" :class="{disabled:!variable.complete}" @click="saveAddNext" type="button">保存并拨打下一个</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="data-warp" v-if="render.call_num">
                <div class="data-table">
                    <div class="data-export">
                        <ul>
                            <li>
                                <span class="t">已拨打次数</span>
                                <span class="num">{{render.call_num}}</span>
                            </li>
                            <li v-if="render.call||render.sex">
                                <span class="t">称呼</span>
                                <span class="num">{{render.call}}{{render.sex=='男'?'先生':''}}{{render.sex=='女'?'女士':''}}</span>
                            </li>
                        </ul>
                    </div>
                    <clueHistory></clueHistory>
                </div>
            </div>
        </div>
        <smsDialog ref="smsDialog"></smsDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import clueHistory from './clueHistory'
    import smsDialog from '../dialog/sms'
    export default {
        data() {
            let user = localStorage.getItem('user')
            return {
                clue_id: '',
                user_id: user.id,
                render: {
                    projectId: '',
                    projectName: '',
                    tel: '',
                    city: '',
                    call: '',
                    sex: '',
                    call_num: '',
                    smsShow:false
                },
                api: {
                    getResult1: API.clue_get_result,
                    getResult2: API.clue_get_sub_result,
                },
                variable: {
                    param: {},
                    showsms: false,
                    complete: false,
                    desc: '',
                    result_error: '',
                    desc_error: '',
                    call: '',
                    sex: ''
                },
                global: {
                    history_id: ''
                },
                search: {
                    city: '',
                    startTime: '',
                    endTime: '',
                    sex: '',
                    result1: '',
                    result2: '',
                    status: ''
                },
                jump_self: false
            }
        },
        computed: {
            dialing: function () {
                return this.$store.state.dialing
            },
            tel_pre: function () {
                return this.$store.state.tel_pre
            },
            seat_info: function () {
                return this.$store.state.callInfo
            }
        },
        watch: {
            dialing(newVal, oldVal) {
                if (newVal == true) {
                    this.variable.showsms = true
                }
            }
        },
        created() {
            this.clue_id = this.$route.query.id
            this.render = {
                projectId: this.$route.query.project_id,
                projectName: this.$route.query.projectName,
                tel: this.$route.query.tel,
                city: this.$route.query.city,
                call: this.$route.query.call,
                sex: this.$route.query.sex,
                call_num: this.$route.query.call_num,
                smsShow:this.$route.query.sms
            }
            this.variable.call = this.render.call
            this.variable.sex = this.render.sex
            this.search = {
                city: this.$route.query.search_city,
                startTime: this.$route.query.startTime,
                endTime: this.$route.query.endTime,
                sex: this.$route.query.search_sex,
                result1: this.$route.query.search_result1,
                result2: this.$route.query.search_result2,
                status: this.$route.query.status
            }
            this.init()

            window.onbeforeunload = () => {
                return '关闭或刷新页面'
            }
        },
        beforeRouteLeave(to, from, next) {
            if (from.path != to.path && !this.jump_self) {
                let r = confirm('是否要离开这个页面')
                if (r) {
                    window.onbeforeunload = ''
                    next()
                }
            } else {
                window.onbeforeunload = ''
                next()
            }
        },
        methods: {
            sms() {
                let id = this.clue_id
                this.$refs.smsDialog.$emit('show', id)
            },
            drop() {
                window.mycomm_agent.drop()
            },
            linkResult(item) {
                this.variable.param = {
                    pid: item.id
                }
                this.$nextTick(() => {
                    this.$refs.result2Select.init()
                    this.$refs.result2Select.selected = {
                        id: '',
                        name: '全部'
                    }
                })
            },
            chooseSex(str) {
                this.variable.sex = str
            },
            save(callback) {
                let result1 = this.$refs.result1Select.selected.id
                let result2 = this.$refs.result2Select.selected.id

                if (!result1) {
                    this.variable.result_error = '拨打结果必须选择'
                    return false
                } else {
                    if (this.variable.desc.length > 100) {
                        this.variable.desc_error = '备注不能超过100个字符'
                        return false
                    } else {
                        this.variable.desc_error = ''
                    }
                }

                this.$ajax({
                    url: API.project_call_modify,
                    data: {
                        id: this.clue_id,
                        clue_status: 1,
                        remarks: this.variable.desc,
                        sound_code: this.global.history_id,
                        call: this.variable.call,
                        gender: this.variable.sex,
                        dial_result_first: result1,
                        dial_result_second: result2
                    },
                    success: data => {
                        if (data.code == 200) {
                            if (callback) {
                                callback()
                            }
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            },
            saveAndExit(evt) {
                if (evt.currentTarget.className.indexOf('disabled') >= 0) { return false }
                this.save(() => {
                    this.$toast('操作成功', () => {
                        this.jump_self = true
                        window.history.back()
                    })
                })
            },
            saveAddNext(evt) {
                let _this = this
                if (evt.currentTarget.className.indexOf('disabled') >= 0) { return false }
                this.save(() => {
                    _this.$toast('操作成功', () => {
                        let api = API.clue_get_next1
                        let obj = {
                            project_id: _this.render.projectId,
                            city: _this.search_city,
                            created_at_start: _this.startTime,
                            created_at_end: _this.endTime,
                            clue_id: _this.clue_id
                        }
                        if (_this.search.status) {
                            api = API.clue_get_next2
                            obj = {
                                project_id: _this.render.projectId,
                                city: _this.search_city,
                                gender: _this.search.sex,
                                dial_at_start: _this.startTime,
                                dial_at_end: _this.endTime,
                                cule_id: _this.clue_id,
                                dial_result_first: this.search.result1,
                                dial_result_second: this.search.result2
                            }
                        }

                        this.$ajax({
                            url: api,
                            data: obj,
                            success: data => {
                                if (data.code == 200) {
                                    if (data.data) {
                                        let query = Object.assign({}, _this.$route.query, { clue_id: data.data.id })
                                        this.jump_self = true
                                        this.$router.replace({
                                            name: this.$route.name,
                                            query: query
                                        })
                                    }else{
                                        this.jump_self = true
                                        this.$toast('已经是最后一条了',()=>{
                                            window.history.back()
                                        })
                                    }

                                } else {
                                    this.$toast(data.message)
                                }
                            }
                        })
                    })
                })
            },
            init() {
                let _this = this
                let uuid = ''

                window.mycomm_agent.wrap_up(0)

                window.mycomm_agent.on_dial_f = function (evt) {
                    _this.$toast(evt.params.err_des)
                    window.mycomm_agent.logout()
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
                    _this.$toast(msg)
                }

                window.mycomm_agent.on_drop_s = function (evt) {
                    _this.variable.complete = true
                }

                window.mycomm_agent.on_agent_ext_hangup = function (evt) {
                    _this.$store.commit('CHANGE_DIAL_STATUS', false)
                    _this.variable.complete = true
                    window.mycomm_agent.logout()
                    _this.$ajax({
                        url: API.add_call_job,
                        data: {
                            call_uuid: uuid
                        }
                    })
                }

                window.mycomm_agent.on_agent_dial_start = function (evt) {
                    uuid = evt.params.channel_uuid
                    _this.$store.commit('CHANGE_DIAL_STATUS', true)
                    _this.$ajax({
                        url: API.save_call_uuid,
                        data: {
                            call_uuid: uuid,
                            id: _this.global.history_id
                        }
                    })
                }

                this.$ajax({
                    url: API.get_myclient_balance,
                    data: {
                        seat_id: _this.user_id
                    },
                    success: data => {
                        if (data.code == 200) {
                            if (data.data.balance <= 0) {
                                _this.$toast('您的账号已经没有费用，请联系管理员')
                            } else if (!data.data.valid) {
                                _this.$toast('坐席已失效,暂不能拨打')
                            } else {
                                this.$ajax({
                                    url: API.get_tel,
                                    data: {
                                        id: _this.clue_id
                                    },
                                    success: data => {

                                        let info = this.seat_info

                                        let tel_all = data.data.telephone

                                        if (this.tel_pre) {
                                            tel_all = this.tel_pre + tel_all
                                        }

                                        window.mycomm_agent.on_login_s = function (evt) {
                                            window.mycomm_agent.dial(tel_all, 'geo', 'great')
                                            setInterval(() => {  //延长用户有效期
                                                _this.$ajax({
                                                    url: API.get_myclient_balance
                                                })
                                            }, 30 * 1000)
                                        }

                                        _this.$ajax({
                                            url: API.save_dial_history,
                                            data: {
                                                phone: data.data.telephone,
                                                project_id: _this.render.projectId,
                                                clue_id: _this.clue_id
                                            },
                                            success: data => {
                                                if (data.code == 200) {
                                                    _this.global.history_id = data.data.id
                                                    window.mycomm_agent.login(info.cti_server + ':' + info.cti_port, info.agent_id.toString(), info.password, info.queue, info.is_leader, info.org_id, info.agent_name, info.work_id.toString(), info.agent_type)
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        } else {
                            _this.$toast('获取坐席账户状态失败,暂不能拨打')
                        }
                    }
                })

            }
        },
        components: {
            mselect,
            clueHistory,
            smsDialog
        }
    }

</script>