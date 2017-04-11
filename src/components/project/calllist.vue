<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{project.name}}外呼列表</div>
            <div class="tag-nav">
                <a href="javascript:void(0);" :class="{active:!clue_status}" @click="tab(0)">未完成</a>
                <a href="javascript:void(0);" :class="{active:clue_status}" @click="tab(1)">已完成</a>
            </div>
            <div class="data-property">
                <form>
                    <div class="cutover">
                        <ul class="data-text cutover-tab01">
                            <li>
                                <label class="name">手机号</label>
                                <div class="input-warp">
                                    <input class="text" type="text" v-model="tel">
                                </div>
                            </li>
                            <li>
                                <label class="name">拨打状态</label>
                                <mselect ref="callStatusSelect" :initlist="call_status" :id="is_dial"></mselect>
                            </li>
                            <li>
                                <label class="name">拨打结果</label>
                                <mselect ref="callResultSelect" :initlist="call_result_list" :id="dial_status"></mselect>
                            </li>
                            <li>
                                <label class="name">分配日期</label>
                                <div class="input-warp date-warp">
                                    <div class="calendar-warp w45">
                                        <datepicker input-class="date" :disabled="datepicker_disabled" language="zh" format="yyyy.MM.dd" v-model="start_time"></datepicker>
                                    </div>
                                    <em class="or">至</em>
                                    <div class="calendar-warp w45">
                                        <datepicker input-class="date" :disabled="datepicker_disabled" language="zh" format="yyyy.MM.dd" v-model="end_time"></datepicker>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button class="btn blue" type="button" @click="search">
                                    <span>
                                        <i class="icon search"></i>查询
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <div class="data-warp">
                <div class="cutover">
                    <div class="data-table cutover-tab01">
                        <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                            <tbody>
                                <tr>
                                    <th>手机号</th>
                                    <th>分配日期</th>
                                    <th v-if="!clue_status">拨打状态</th>
                                    <th>拨打结果</th>
                                    <th>操作</th>
                                </tr>
                                <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                    <td>{{item.telephone_crypt}}</td>
                                    <td>{{item.distribution_date}}</td>
                                    <td v-if="!clue_status">{{item.is_dial==1?'已拨打':'未拨打'}}</td>
                                    <td>{{item.dial_status | toResultText}}</td>
                                    <td>
                                        <a href="javascript:void(0);" @click="call(item.id,item.telephone)">
                                            <span class="notice">
                                                <i class="icon phone"></i>
                                            </span>拨打
                                        </a>
                                        <a v-if="item.is_dial" href="javascript:void(0);" @click="view(item.id)">查看</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p v-else class="no-data">暂无数据</p>
                    </div>
                    <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
                </div>
            </div>
        </div>
        <doCallDialog ref="doCallDialog"></doCallDialog>
        <callViewDialog ref="callViewDialog" @callThis="call"></callViewDialog>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import datepicker from 'vuejs-datepicker'
    import pages from 'components/common/pages'
    import doCallDialog from './dialog/doCall'
    import callViewDialog from './dialog/callView'
    import callResultConf from './callResultConf'
    export default {
        data: () => {
            return {
                project: {
                    id: '',
                    name: ''
                },
                currentPage: 1,
                totalPage: 1,
                clue_status: '',
                tel: '',
                call_status: {
                    "0": '未拨打',
                    "1": '已拨打'
                },
                is_dial: '',
                call_result_list: callResultConf,
                dial_status: '',
                start_time: '',
                end_time: '',
                datepicker_disabled: {
                    to: new Date(2017, 0, 1),
                    from: new Date()
                },
                list: []
            }
        },
        components: {
            mselect,
            datepicker,
            pages,
            doCallDialog,
            callViewDialog
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        filters: {
            toResultText: function (value) {
                if (value) {
                    return callResultConf[value]
                } else {
                    return '未拨打'
                }
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
                this.tel = this.$route.query.tel
                this.is_dial = this.$route.query.is_dial
                this.dial_status = this.$route.query.dial_status
                this.start_time = this.$route.query.start_time
                this.end_time = this.$route.query.end_time
                this.render()
            },
            search() {
                let is_dial = this.$refs.callStatusSelect ? this.$refs.callStatusSelect.selected.id : ''
                let dial_status = this.$refs.callResultSelect ? this.$refs.callResultSelect.selected.id : ''
                let tel = this.tel
                let start_time = typeof (this.start_time) == 'string' ? this.start_time : dateFormat(this.start_time)
                let end_time = typeof (this.end_time) == 'string' ? this.end_time : dateFormat(this.end_time)
                let query = Object.assign({}, this.$route.query, {
                    is_dial,
                    dial_status,
                    tel,
                    start_time,
                    end_time,
                    page: 1
                })
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
                        phone: _this.tel,
                        is_dial: _this.is_dial,
                        dial_status: _this.dial_status,
                        created_at_start: _this.start_time,
                        created_at_end: _this.start_time
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.list = data.data.data
                            _this.totalPage = Math.ceil(data.data.total / 10)
                        } else {
                            _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    }
                })
            },
            jump(num) {
                let obj = Object.assign({}, this.$route.query, { page: num })
                this.$router.replace({
                    name: this.$route.name,
                    query: obj
                })
            },
            tab(num) {
                this.$router.replace({
                    name: this.$route.name,
                    query: Object.assign({}, this.$route.query, {
                        clue_status: num,
                        is_dial:'',
                        dial_status:'',
                        tel:'',
                        start_time:'',
                        end_time:'',
                        page: 1
                    })
                })
            },
            call(id,tel){
                let _this = this
                window.mycomm_agent.on_dial_s = function (evt) {
                    _this.$store.commit('SHOW_TOAST','拨通中……',-1)
                }
                window.mycomm_agent.on_dial_f = function (evt) {
                    _this.$store.commit('SHOW_TOAST',evt.params.err_des)
                }
                let uuid = ''
                window.mycomm_agent.on_agent_service_start = function(queue,session_uuid,joined_time,call_number,user_data){
                    uuid = session_uuid
                    mAjax(_this,{
                        url:API.save_call_uuid,
                        data:{
                            call_uuid:uuid,
                            phone:call_number,
                            project_id:_this.project.id
                        },
                        success:data=>{
                            console.log('已拨通')
                        }
                    })
                }
                //window.mycomm_agent.on_agent_service_start = function(queue,session_uuid,)
                window.mycomm_agent.dial(tel, 'support','My User Data')
            },
            view(id){
                this.$refs.callViewDialog.$emit('show',id,this.project.name)
            },
        },
        created: function () {
            this.init()
        }
    }

</script>