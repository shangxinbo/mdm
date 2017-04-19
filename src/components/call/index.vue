<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp" v-if="userType==4">我的话务</div>
            <div class="title-warp" v-else>话务管理</div>
            <div class="data-property">
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
                            <label class="name">创建日期</label>
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
                <div class="data-export" v-if="head.effect_call_times">
                    <ul>
                        <li>
                            <span class="t">拨通次数</span>
                            <span class="num">{{head.effect_call_times}}</span>
                        </li>
                        <li>
                            <span class="t">通话时长</span>
                            <span class="num">{{head.charge_time}}</span>
                        </li>
                    </ul>
                </div>
                <div class="data-export" v-else>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>项目名称</th>
                                <th v-if="userType==1">客户名称</th>
                                <th v-if="userType==1">所属代理</th>
                                <th>外呼次数</th>
                                <th>拨通次数</th>
                                <th>拨通率</th>
                                <th>呼损次数</th>
                                <th>呼损率</th>
                                <th>通话时长</th>
                                <th>平均通话</th>
                                <th v-if="userType!=4">参与坐席</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>
                                    <span v-if="userType !=3">{{item.name}}</span>
                                    <router-link :to="{path : '/call/cate',query : {search_project_id:item.id}}" v-else>{{item.name}}</router-link>
                                </td>
                                <td v-if="userType==1">
                                    <router-link :to="{path : '/call/cate',query : {search_client_id:item.client_id,client_name:item.client_name}}">{{item.client_name}}</router-link>
                                </td>
                                <td v-if="userType==1">
                                    <router-link :to="{ path : '/call/cate',query : {search_agent_id:item.agency_id,agent_name:item.agency_name}}">{{item.agency_name}}</router-link>
                                </td>
                                <td>{{item.call_times}}</td>
                                <td>{{item.effect_call_times}}</td>
                                <td>{{item.effect_call_rate}}%</td>
                                <td>{{item.uneffect_call_times}}</td>
                                <td>{{item.uneffect_call_rate}}%</td>
                                <td>{{item.charge_time}}</td>
                                <td>{{item.avg_time}}</td>
                                <td v-if="userType!=4">{{item.seat_num}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
        <confirm ref="confirm"></confirm>
        <alert ref="alert"></alert>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import mselect from 'components/utils/select'
    import datepicker from 'vuejs-datepicker'
    import confirm from 'components/dialog/confirm'
    import alert from 'components/dialog/alert'
    
    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                list: [],
                head: [],
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                search_start_time : '',
                search_end_time : '',
                api: {
                    customerList: API.customer_list_all,
                    agentList: API.angent_list_all,
                }
            }
        },
        computed: {
            datepicker_disabled1:function () {
                let end = this.search_end_time?this.search_end_time:''
                if(end) {
                    return  {
                        to: new Date(2017,0,1),
                        from: new Date(end)
                    }
                }else{
                    return  {
                        to: new Date(2017,0,1),
                        from: new Date()
                    }
                }

            },
            datepicker_disabled2: function () {
                let start = this.search_start_time
                return  {
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
            confirm,
            alert,
        },
        methods: {
            init: function () {
                this.search_agent_id = this.$route.query.search_agent_id===undefined ?'': this.$route.query.search_agent_id
                this.search_client_id = this.$route.query.search_client_id===undefined ?'': this.$route.query.search_client_id
                this.search_end_time = this.$route.query.search_end_time ? this.$route.query.search_end_time : ''
                this.search_start_time = this.$route.query.search_start_time ? this.$route.query.search_start_time : ''
                this.search_name = this.$route.query.search_name ? this.$route.query.search_name : ''
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.refresh()
                this.heads()
            },

            refresh: function () {
                let _this = this
                mAjax(this, {
                    url: API.call_list,
                    data: {
                        search_name: _this.search_name ? _this.search_name : null ,
                        search_client_id: _this.search_client_id ? _this.search_client_id : null,
                        search_agent_id: _this.search_agent_id ? _this.search_agent_id : null,
                        search_start_time: _this.search_start_time ? dateFormat(_this.search_start_time) : null,
                        search_end_time: _this.search_end_time ? dateFormat(_this.search_end_time) : null,
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
                mAjax(this, {
                    url: API.call_head,
                    data: {
                        search_name: _this.search_name ? _this.search_name :null,
                        search_client_id:  _this.search_client_id ? _this.search_client_id : null,
                        search_agent_id: _this.search_agent_id ? _this.search_agent_id :null,
                        search_start_time: _this.search_start_time ? dateFormat(_this.search_start_time) : null,
                        search_end_time: _this.search_end_time ? dateFormat(_this.search_end_time) : null
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
                let query = Object.assign({}, this.$route.query, {
                    search_name: this.search_name,
                    search_client_id: search_client_id,
                    search_agent_id: search_agent_id,
                    search_start_time: this.search_start_time,
                    search_end_time: this.search_end_time,
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