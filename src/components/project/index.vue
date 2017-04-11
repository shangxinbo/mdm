<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp" v-if="userType==4">我的项目</div>
            <div class="title-warp" v-else>{{customer_name?customer_name + '的项目':(agent_name?agent_name + '的项目':'项目管理')}}</div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">项目名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="search_name" type="text">
                            </div>
                        </li>
                        <li v-if="!customer_id&&userType==1">
                            <label class="name">客户名称</label>
                            <mselect ref="customerSelect" :api="api.customerList" :id="search_customer"></mselect>
                        </li>
                        <li v-if="!agent_id&&!customer_id&&userType==1">
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
                <div class="data-export" v-if="userType==1">
                    <ul>
                        <li>
                            <span class="t">项目数</span>
                            <span class="num">{{sum.projectNumTotal}}</span>
                        </li>
                        <li>
                            <span class="t">进行中项目</span>
                            <span class="num">{{sum.projectStatusIngTotal}}</span>
                        </li>
                        <li>
                            <span class="t">线索量</span>
                            <span class="num">{{sum.clueNumTotal}}</span>
                        </li>
                        <li>
                            <span class="t">剩余线索</span>
                            <span class="num">{{sum.oddNumTotal}}</span>
                        </li>
                        <li>
                            <span class="t">拨通线索</span>
                            <span class="num">{{sum.connectNumTotal}}</span>
                        </li>
                        <li>
                            <span class="t">有效率</span>
                            <span class="num">{{sum.clueValidPercent}}%</span>
                        </li>
                    </ul>
                </div>
                <div class="data-export" v-if="userType==3">
                    <ul>
                        <li>
                            <span class="t">
                                <router-link to="/user/myseat">现有坐席</router-link>
                            </span>
                            <span class="num">10</span>
                        </li>
                    </ul>
                    <router-link to="/project/add" class="btn blue btn-export">
                        <span>
                            <i class="icon add"></i>新建顶目</span>
                    </router-link>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>项目名称</th>
                                <th v-if="!customer_id&&userType==1">客户名称</th>
                                <th v-if="!agent_id&&!customer_id&&userType==1">所属代理</th>
                                <th>类型</th>
                                <th>创建日期</th>
                                <th>状态</th>
                                <th>线索量</th>
                                <th>剩余线索</th>
                                <th>拨通线索</th>
                                <th>有效率</th>
                                <th>通话时长</th>
                                <th>剩余时间</th>
                                <th v-if="userType!=4">项目坐席</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>
                                    <span v-if="userType==4">{{item.name}}</span>
                                    <router-link :to="'/project/detail/'+item.id" v-else>{{item.name}}</router-link>
                                </td>
                                <td v-if="!customer_id&&userType==1">
                                    <router-link :to="{query:{customer_id:item.client_id,customer_name:item.client_name}}">{{item.client_name}}</router-link>
                                </td>
                                <td v-if="!agent_id&&!customer_id&&userType==1">
                                    <router-link :to="{query:{agent_id:item.agency_id,agent_name:item.agency}}">{{item.agency}}</router-link>
                                </td>
                                <td>{{item.project_type}}</td>
                                <td>{{item.created_at}}</td>
                                <td>{{item.project_status}}</td>
                                <td>{{item.clue_num}}</td>
                                <td>{{item.clue_odd_num}}</td>
                                <td>{{item.clue_connect_num}}</td>
                                <td>{{item.clue_valid_percent}}%</td>
                                <td>{{item.call_time}}</td>
                                <td>{{item.odd_time}}</td>
                                <td v-if="userType!=4">{{item.project_seat_num}}</td>
                                <td v-if="userType==1">
                                    <router-link v-if="item.status==-1" :to="'/project/detail/' + item.id">审核</router-link>
                                    <a v-if="item.status==1" href="javascript:void(0);" @click="stop(item.id)">暂停</a>
                                    <a v-if="item.status==2" href="javascript:void(0);" @click="start(item.id)">开启</a>
                                </td>
                                <td v-else-if="userType==4">
                                    <router-link v-if="item.status==-1" :to="'/project/call/?id='+ item.id +'&projectName=' + item.name ">外呼</router-link>
                                </td>
                                <td v-else>
                                    <router-link v-if="item.status==-1" :to="'/project/add/' + item.id">重新申请</router-link>
                                    <a v-if="item.status==1" href="javascript:void(0);" @click="assignSeat(item.id,item.name)">分配坐席</a>
                                </td>
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
        <chooseSeatDialog ref="chooseSeatDialog"></chooseSeatDialog>
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
    import chooseSeatDialog from './dialog/chooseSeat'
    let user = JSON.parse(localStorage.getItem('user'))
    export default {
        data: function () {
            return {
                list: [],
                userType: user.type,
                start_time: '',
                end_time: '',
                currentPage: 1,
                totalPage: 1,
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
                datepicker_disabled: {
                    to: new Date(2017, 0, 1),
                    from: new Date()
                },
                api: {
                    customerList: API.customer_list_all,
                    agentList: API.customer_type_list,
                    statusList: API.project_status
                },
                sum: {
                    projectNumTotal: '',
                    projectStatusIngTotal: '',
                    clueNumTotal: '',
                    oddNumTotal: '',
                    connectNumTotal: '',
                    clueValidPercent: ''
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
            chooseSeatDialog
        },
        methods: {
            init() {
                this.search_name = this.$route.query.search_name
                this.search_customer = this.$route.query.search_customer
                this.search_agent = this.$route.query.search_agent
                this.search_status = this.$route.query.search_status
                this.search_start_time = this.$route.query.search_start_time
                this.search_end_time = this.$route.query.search_end_time
                this.start_time = this.$route.query.search_start_time
                this.end_time = this.$route.query.search_end_time
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.agent_id = this.$route.query.agent_id
                this.agent_name = this.$route.query.agent_name
                this.customer_id = this.$route.query.customer_id
                this.customer_name = this.$route.query.customer_name
                this.refresh()
            },
            refresh: function () {
                let _this = this
                mAjax(this, {
                    url: API.project_list,
                    data: {
                        nums: 10,
                        page: _this.currentPage,
                        search_project_name: _this.search_name,
                        search_client_id: _this.customer_id ? _this.customer_id : _this.search_customer,
                        search_agency_id: this.agent_id ? this.agent_id : _this.search_agent,
                        search_project_status: _this.search_status,
                        search_project_begin_time: _this.search_start_time,
                        search_project_end_time: _this.search_end_time
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.list = data.data.data
                            _this.sum = data.data.count
                            _this.totalPage = Math.ceil(data.data.page.total / 10)
                        } else {
                            _this.$refs.alert.$emit('show', data.message)
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
                let search_status = this.$refs.statusSelect ? this.$refs.statusSelect.selected.id : ''
                let search_name = this.search_name
                let start_time = typeof(this.start_time)=='string' ? this.start_time : dateFormat(this.start_time)
                let end_time = typeof(this.end_time)=='string' ? this.end_time : dateFormat(this.end_time)
                
                let query = Object.assign({}, this.$route.query, {
                    search_name: search_name,
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
            stop(id) {
                let _this = this
                this.$refs.confirm.$emit('show', '是否要暂停该项目', function () {
                    mAjax(_this, {
                        url: API.project_stop,
                        data: {
                            id: id
                        },
                        success: data => {
                            if (data.code == 200)
                                _this.$refs.alert.$emit('show', '已成功暂停', function () {
                                    _this.refresh()
                                })
                            else
                                _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    })
                })
            },
            start(id) {
                let _this = this
                this.$refs.confirm.$emit('show', '是否要开启该项目', function () {
                    mAjax(_this, {
                        url: API.project_start,
                        data: {
                            id: id
                        },
                        success: data => {
                            if (data.code == 200)
                                _this.$refs.alert.$emit('show', '已成功开启', function () {
                                    _this.refresh()
                                })
                            else
                                _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    })
                })
            },
            assignSeat(id, name) {
                this.$refs.chooseSeatDialog.$emit('show', id, name)
            }
        },
        created: function () {
            this.init()
        }
    }

</script>