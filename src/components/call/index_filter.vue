<template>
    <form>
        <ul class="data-text">
            <li>
                <label class="name">项目</label>
                <div class="input-warp">
                    <input class="text" v-model="search_name" type="text">
                </div>
            </li>
            <li v-if="userType==1">
                <label class="name">客户</label>
                <mselect ref="customerSelect" :api="api.customerList" :id="search_client_id"></mselect>
            </li>
            <li v-if="userType==1">
                <label class="name">代理</label>
                <mselect ref="agentSelect" :api="api.agentList" :id="search_agent_id"></mselect>
            </li>
            <li>
                <label class="name">日期</label>
                <div class="input-warp date-warp">
                    <div class="calendar-warp w45">
                        <datepicker input-class="date" :disabled="datepicker_disabled1" language="zh" format="yyyy.MM.dd" v-model="search_start_time"></datepicker>
                    </div>
                    <em class="or">至</em>
                    <div class="calendar-warp w45">
                        <datepicker input-class="date" :disabled="datepicker_disabled2" language="zh" format="yyyy.MM.dd" v-model="search_end_time"></datepicker>
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
    </form>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import datepicker from 'vuejs-datepicker'
    import moment from 'moment'

    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            let now = moment().format('YYYY-MM-DD')
            return {
                list: [],
                head: [],
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                search_start_time: '',
                search_end_time: '',
                api: {
                    customerList: API.customer_list_all,
                    agentList: API.angent_list_all,
                }
            }
        },
        computed: {
            datepicker_disabled1: function () {
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
            mselect,
            datepicker,
            confirm,
            alert,
        },
        methods: {
            init: function () {
                this.search_agent_id = this.$route.query.search_agent_id === undefined ? '' : this.$route.query.search_agent_id
                this.search_client_id = this.$route.query.search_client_id === undefined ? '' : this.$route.query.search_client_id
                this.search_end_time = this.$route.query.search_end_time ? this.$route.query.search_end_time : ''
                this.search_start_time = this.$route.query.search_start_time ? this.$route.query.search_start_time : ''
                this.search_name = this.$route.query.search_name ? this.$route.query.search_name : ''
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.refresh()
                this.heads()
            },

            refresh: function () {
                let _this = this
                let start_time = typeof (this.search_start_time) == 'string' ? this.search_start_time : dateFormat(this.search_start_time)
                let end_time = typeof (this.search_end_time) == 'string' ? this.search_end_time : dateFormat(this.search_end_time)
                mAjax(this, {
                    url: API.call_list,
                    data: {
                        search_name: _this.search_name,
                        search_client_id: _this.search_client_id,
                        search_agent_id: _this.search_agent_id,
                        search_start_time: start_time,
                        search_end_time: end_time,
                        page: _this.currentPage,
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.list = data.data.data
                            _this.totalPage = data.data.page
                        } else {
                            _this.list = []
                            _this.totalPage = 1
                        }
                    }
                })
            },
            heads: function () {
                let _this = this
                let start_time = typeof (this.search_start_time) == 'string' ? this.search_start_time : dateFormat(this.search_start_time)
                let end_time = typeof (this.search_end_time) == 'string' ? this.search_end_time : dateFormat(this.search_end_time)
                mAjax(this, {
                    url: API.call_head,
                    data: {
                        search_name: _this.search_name,
                        search_client_id: _this.search_client_id,
                        search_agent_id: _this.search_agent_id,
                        search_start_time: start_time,
                        search_end_time: end_time
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.head = data.data
                        } else {
                            _this.head = []
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
            search() {
                let search_client_id = this.$refs.customerSelect ? this.$refs.customerSelect.selected.id : ''
                let search_agent_id = this.$refs.agentSelect ? this.$refs.agentSelect.selected.id : ''
                let start_time = this.search_start_time
                let end_time = this.search_end_time
                let query = Object.assign({}, this.$route.query, {
                    search_name: this.search_name,
                    search_client_id: search_client_id,
                    search_agent_id: search_agent_id,
                    search_start_time: start_time,
                    search_end_time: end_time,
                    page: 1
                })
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            }
        },
        created: function () {
            this.init()
            let _this = this
            document.onkeyup = function (evt) {
                if (evt.keyCode == 13)
                    _this.search()
            }
        }
    }

</script>