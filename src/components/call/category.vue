<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp" v-if="userType==5"></div>
            <div class="title-warp" v-else>{{client_name?client_name + '的话务':(agent_name?'代理' + agent_name + '的话务':'我的话务')}}
            </div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li v-if="userType==1">
                            <label class="name">项目</label>
                            <div class="input-warp">
                                <input class="text" v-model="search_name" type="text">
                            </div>
                        </li>
                        <li v-if="category==2&&userType==1">
                            <label class="name">客户</label>
                            <mselect ref="customerSelect" :api="api.customerList" :id="search_client_id"></mselect>
                        </li>
                        <li>
                            <label class="name">创建日期</label>
                            <div class="input-warp date-warp">
                                <div class="calendar-warp w45">
                                    <datepicker input-class="date" :disabled="datepicker_disabled" language="zh" format="yyyy.MM.dd" v-model="search_start_time"></datepicker>
                                </div>
                                <em class="or">至</em>
                                <div class="calendar-warp w45">
                                    <datepicker input-class="date" :disabled="datepicker_disabled" language="zh" format="yyyy.MM.dd" v-model="search_end_time"></datepicker>
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
                 <div class="data-export" v-if="userType ==3&&head.seat_num">
                     <ul>
                        <li>
                            <span class="t">参与坐席</span>
                            <span class="num">{{head.seat_num}}</span>
                        </li>
                        <li>
                            <span class="t">拨通次数</span>
                            <span class="num">{{head.effect_call_times}}</span>
                        </li>
                        <li>
                            <span class="t">拨通率</span>
                            <span class="num">{{head.effect_call_rate}}</span>
                        </li>

                        <li>
                            <span class="t">通话时长</span>
                            <span class="num">{{head.charge_time}}</span>
                        </li>
                        <li>
                            <span class="t">平均通话</span>
                            <span class="num">{{head.avg_time}}</span>
                        </li>
                    </ul>
                </div>
                <div class="data-export" v-else>
                    <div v-if="head.effect_call_times">
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
                    <div v-else>
                    </div>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th v-if="userType==1">项目名称</th>
                                <th v-else>参与坐席</th>
                                <th v-if="category==2&&userType==1">客户名称</th>
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
                                    <span v-else>{{item.seat_id}}</span>
                                </td>
                                <td v-if="category==2&&userType==1">
                                    <router-link :to="{path : '/call/cate',query:{search_client_id:item.client_id,client_name:item.client_name}}">{{item.client_name}}</router-link>
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
                head :[],
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                search_name: null,
                client_name : '',
                agent_name : '',
                search_start_time: null,
                search_end_time: null,
                search_agent_id: null,
                search_client_id : null,
                search_project_id : null,
                datepicker_disabled: {
                    to: new Date(2017, 0, 1),
                    from: new Date()
                },
                category : '',
                api: {
                    customerList: API.customer_list_all,
                }
            }
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
            init : function() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.search_agent_id = this.$route.query.search_agent_id ? this.$route.query.search_agent_id : null
                this.agent_name = this.$route.query.agent_name ? this.$route.query.agent_name : null 
                this.search_client_id = this.$route.query.search_client_id ? this.$route.query.search_client_id : null
                this.client_name = this.$route.query.client_name ? this.$route.query.client_name : null 
                this.search_project_id = this.$route.query.search_project_id ? this.$route.query.search_project_id : null
                this.category = this.userType == 3 ? 1 :(this.search_agent_id ? 2:3)
                this.refresh()
                this.heads()
            },
            refresh: function () {
                let _this = this
                mAjax(this, {
                    url: API.call_cate,
                    data: {
                        search_name : _this.search_name,
                        search_agent_id: _this.search_agent_id ,
                        search_client_id : _this.search_client_id ,
                        search_project_id : _this.search_project_id ,
                        search_start_time: dateFormat(_this.search_start_time),
                        search_end_time: dateFormat(_this.search_end_time),
                        category : _this.category,
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
            heads : function () {
                let _this = this
                mAjax(this, {
                    url: API.call_head,
                    data: {
                        category : _this.category,
                        search_name: _this.search_name,
                        search_client_id: _this.search_client_id,
                        search_agent_id: _this.search_agent_id,
                        search_project_id : _this.search_project_id,
                        search_start_time: dateFormat(_this.search_start_time),
                        search_end_time: dateFormat(_this.search_end_time)
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
                let search_client_id = this.$refs.customerSelect ? this.$refs.customerSelect.selected.id : this.search_client_id
                let query = Object.assign({}, this.$route.query, {
                    search_name: this.search_name,
                    search_client_id: search_client_id,
                    search_agent_id: this.search_agent_id,
                    search_project_id : this.search_project_id,
                    search_start_time: dateFormat(this.search_start_time),
                    search_end_time: dateFormat(this.search_end_time),
                    page: 1,
                    category : this.category,
                })
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            }
        },
        created: function () {
            this.init()
        }
    }

</script>