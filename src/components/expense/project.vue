<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp" v-if="userType==3">
                项目计费
            </div>
            <div class="title-warp" v-if="userType==1">
                {{customer_name ? customer_name + '的项目计费' : (agent_name ? agent_name + '的项目计费' : '项目计费')}}
            </div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">项目名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="search_name" type="text">
                            </div>
                        </li>
                        <li v-if="type!='user' && userType == 1">
                            <label class="name">客户名称</label>
                            <mselect ref="customerSelect" :api="api.customerList" :id="search_customer"></mselect>
                        </li>
                        <li v-if="type == 'all' && userType == 1">
                            <label class="name">所属代理</label>
                            <mselect ref="agentSelect" :api="api.agentList" :id="search_agent"></mselect>
                        </li>
                        <li>
                            <label class="name">项目状态</label>
                            <mselect ref="statusSelect" :api="api.statusList" :id="search_status"></mselect>
                        </li>
                        <li>
                            <label class="name">创建日期</label>
                            <div class="input-warp date-warp">
                                <div class="calendar-warp w45">
                                    <datepicker input-class="date" :disabled="datepicker_disabled" language="zh" format="yyyy.MM.dd" v-model="search_start_time"></datepicker>
                                </div>
                                <em class="or">至</em>
                                <div class="calendar-warp w45">
                                    <datepicker input-class="date" :disabled="datepicker_disabled2" language="zh" format="yyyy.MM.dd" v-model="search_end_time"></datepicker>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a class="btn blue" type="button" @click="search">
                                <span>
                                    <i class="icon search"></i>查询
                                </span>
                            </a>
                        </li>
                    </ul>
                </form>
                <div class="data-export" v-if="list.length>0">
                    <ul>
                        <li>
                            <span class="t">线索计费</span>
                            <span class="num">¥{{sum.clue_charging}}</span>
                        </li>
                        <li>
                            <span class="t">通话计费</span>
                            <span class="num">¥{{sum.call_charging}}</span>
                        </li>
                        <li>
                            <span class="t">挂机短信计费</span>
                            <span class="num">¥{{sum.message_charging}}</span>
                        </li>
                    </ul>
                    <div class="add-explain" v-if="userType==3">
                        <router-link to="/expense/doc">收费说明</router-link>
                    </div>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <dataTable ref="table" :list="list" :type="type" v-if="list.length>0"></dataTable>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
    </div>
</template>

<script>
    import { dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import mselect from 'components/utils/select'
    import datepicker from 'vuejs-datepicker'
    import dataTable from './pTable'

    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                userType: user.type,
                list: [],
                currentPage: 1,
                totalPage: 1,
                type: 'all',
                url: API.expense_project,
                search_name: '',
                search_customer: '',
                search_agent: '',
                search_status: '',
                search_start_time: '',
                search_end_time: '',
                agent_id: '',
                agent_name: '',
                customer_id: '',
                customer_name: '',
                api: {
                    customerList: API.customer_list_all,
                    agentList: API.angent_list_all,
                    statusList: API.project_status
                },
                sum: {
                    clue_charging: '',
                    call_charging: ''
                }
            }
        },
        computed: {
            datepicker_disabled: function () {
                let end = this.search_end_time ? this.search_end_time : ''
                if (end) {
                    return {
                        to: new Date(2017, 0, 1),
                        from: new Date(end)
                    }
                } else {
                    return {
                        to: new Date(2017, 0, 1),
                        from: new Date()
                    }
                }

            },
            datepicker_disabled2: function () {
                let start = this.search_start_time
                return {
                    to: new Date(start),
                    from: new Date()
                }
            },
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        components: {
            pages,
            mselect,
            datepicker,
            dataTable
        },
        created: function () {
            this.init()
            let _this = this
            document.onkeyup = function (evt) {
                if (evt.keyCode == 13)
                    _this.search()
            }
        },
        methods: {
            init: function () {
                this.search_name = this.$route.query.search_name ? this.$route.query.search_name : ''
                this.search_customer = this.$route.query.search_customer === undefined ? '' : this.$route.query.search_customer
                this.search_agent = this.$route.query.search_agent === undefined ? '' : this.$route.query.search_agent
                this.search_status = this.$route.query.search_status === undefined ? '' : this.$route.query.search_status
                this.search_start_time = this.$route.query.search_start_time ? this.$route.query.search_start_time : ''
                this.search_end_time = this.$route.query.search_end_time ? this.$route.query.search_end_time : ''
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.agent_id = this.$route.query.agent_id
                this.agent_name = this.$route.query.agent_name
                this.customer_id = this.$route.query.customer_id
                this.customer_name = this.$route.query.customer_name
                this.type = this.$route.query.type ? this.$route.query.type : 'all'

                if (this.agent_id && this.agent_name) {
                    this.type = 'agent'
                    this.url = API.expense_project_agent
                    this.search_agent = this.agent_id
                } else if (this.customer_id && this.customer_name) {
                    this.type = 'user'
                    this.url = API.expense_project_user
                    this.search_customer = this.customer_id
                } else if (this.type == 'customer') {
                    this.url = API.customer_expense_project
                } else {
                    this.type = 'all'
                    this.url = API.expense_project
                }
                this.refresh()
            },
            refresh: function () {
                let start_time = typeof (this.search_start_time) == 'string' ? this.search_start_time : dateFormat(this.search_start_time)
                let end_time = typeof (this.search_end_time) == 'string' ? this.search_end_time : dateFormat(this.search_end_time)
                this.$ajax({
                    url: this.url,
                    data: {
                        page: this.currentPage,
                        name: this.search_name ? this.search_name : '',
                        uid: this.search_customer ? this.search_customer : '',
                        superior_id: this.search_agent ? this.search_agent : '',
                        status: this.search_status,
                        created_at_start: start_time,
                        created_at_end: end_time
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data.charging.data
                            this.sum = {
                                clue_charging: data.data.clue_charging,
                                call_charging: data.data.call_charging,
                                message_charging: data.data.message_charging
                            }
                            this.totalPage = Math.ceil(data.data.charging.total / data.data.charging.per_page)
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            },
            search() {
                let search_customer = this.$refs.customerSelect ? this.$refs.customerSelect.selected.id : ''
                let search_agent = this.$refs.agentSelect ? this.$refs.agentSelect.selected.id : ''
                let search_status = this.$refs.statusSelect ? this.$refs.statusSelect.selected.id : ''
                let start_time = typeof (this.search_start_time) == 'string' ? this.search_start_time : dateFormat(this.search_start_time)
                let end_time = typeof (this.search_end_time) == 'string' ? this.search_end_time : dateFormat(this.search_end_time)
                let query = Object.assign({}, this.$route.query, {
                    search_name: this.search_name,
                    search_customer: search_customer,
                    search_agent: search_agent,
                    search_status: search_status,
                    search_start_time: start_time,
                    search_end_time: end_time,
                    page: 1
                })
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            },
            jump(num) {
                let obj = Object.assign({}, this.$route.query, { page: num })
                this.$router.replace({
                    name: this.$route.name,
                    query: obj
                })
            }
        }
    }

</script>