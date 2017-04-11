<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp" v-if="userType==5"></div>
            <div class="title-warp" v-else>{{customer_name?customer_name + '的话务':(agent_name?'代理' + agent_name + '的话务':'我的话务')}}</div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li v-if="userType==1">
                            <label class="name">项目</label>
                            <div class="input-warp">
                                <input class="text" v-model="search_name" type="text">
                            </div>
                        </li>
                        <li v-if="!customer_id&&userType==1">
                            <label class="name">客户</label>
                            <mselect ref="customerSelect" :api="api.customerList" :id="search_customer"></mselect>
                        </li>
                        <li>
                            <label class="name">创建日期</label>
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
                </form>
                 <div class="data-export" v-if="userType ==3&&head.length>0">
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
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th v-if="userType==1">项目名称</th>
                                <th v-else>参与坐席</th>
                                <th v-if="!customer_id&&userType==1">客户名称</th>
                                <th v-if="!agent_id&&!customer_id&&userType==1">所属代理</th>
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
                                    <span v-else>{{index}}</span>
                                </td>
                                <td v-if="!customer_id&&userType==1">
                                    <router-link :to="{query:{customer_id:item.client_id,customer_name:item.client_name}}">{{item.client_name}}</router-link>
                                </td>
                                <td v-if="!agent_id&&!customer_id&&userType==1">
                                    <router-link :to="{query:{agent_id:item.agency_id,agent_name:item.agency}}">{{item.agency}}</router-link>
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
    let user = JSON.parse(localStorage.getItem('user'))
    export default {
        data: function () {
            return {
                list: [],
                head :[],
                category : '',
                userType: user.type,
                start_time: '',
                end_time: '',
                currentPage: 1,
                totalPage: 1,
                search_name: '',
                search_customer: '',
                search_agent: '',
                search_start_time: '',
                search_end_time: '',
                agent_id: '',
                agent_name: '',
                customer_id: '',
                customer_name: '',
                datepicker_disabled: {
                    to: new Date(2017, 0, 1),
                    from: new Date()
                },
                api: {
                    customerList: API.customer_list_all,
                    agentList: API.customer_type_list,
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
                this.search_name = this.$route.query.search_name
                this.search_customer = this.$route.query.search_customer
                this.search_agent = this.$route.query.search_agent
                this.search_start_time = this.$route.query.search_start_time
                this.search_end_time = this.$route.query.search_end_time
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.agent_id = this.$route.query.agent_id
                this.agent_name = this.$route.query.agent_name
                this.customer_id = this.$route.query.customer_id
                this.customer_name = this.$route.query.customer_name
                this.refresh()
                this.heads()
            },
            refresh: function () {
                let _this = this
                mAjax(this, {
                    url: API.call_cate,
                    data: {
                        nums: 10,
                        category : _this.category,
                        page: _this.currentPage,
                        search_project_name: _this.search_name,
                        search_client_id: _this.search_customer,
                        search_agency_id: _this.search_agent,
                        search_project_begin_time: _this.search_start_time,
                        search_project_end_time: _this.search_end_time
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.list = data.data.data
                            _this.totalPage = Math.ceil(data.data.page.total / 10)
                        } else {
                            _this.$refs.alert.$emit('show',data.message)
                            _this.list = ''
                            _this.sum  = {}
                            _this.totalPage = 1
                            //_this.$store.commit('SHOW_TOAST', data.message)
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
                        search_project_name: _this.search_name,
                        search_client_id: _this.search_customer,
                        search_agent_id: _this.search_agent,
                        search_project_begin_time: _this.search_start_time,
                        search_project_end_time: _this.search_end_time
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.head = data.data.data
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
            search() {
                let search_customer = this.$refs.customerSelect ? this.$refs.customerSelect.selected.id : ''
                let search_agent = this.$refs.agentSelect ? this.$refs.agentSelect.selected.id : ''
                let query = Object.assign({}, this.$route.query, {
                    search_name: this.search_name,
                    search_customer: search_customer,
                    search_agent: search_agent,
                    search_start_time: dateFormat(this.start_time),
                    search_end_time: dateFormat(this.end_time),
                    page: 1,
                    category : user.type == 3 ? 3 :(search_agent ? 1:2)
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