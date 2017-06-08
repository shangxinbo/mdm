<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp" v-if="userType==4">我的话务</div>
            <div class="title-warp" v-else>{{client_name?client_name+'的话务':(agent_name?agent_name+'的话务':'话务管理')}}</div>
            <div class="data-property">
                <indexFilter @submit="search"></indexFilter>
                <div class="data-export" v-if="list.length>0">
                    <ul>
                        <li>
                            <span class="t">拨通次数</span>
                            <span class="num">{{head.effect_call_times}}</span>
                        </li> 
                        <li>
                            <span class="t">通话时长</span>
                            <span class="num">{{head.charge_time}}</span>
                        </li>
                        <a :href="downUrl" target="_blank" class="btn blue btn-export">
                            <span>
                                <i class="icon icon-export"></i>导出
                            </span>
                        </a>
                    </ul>
                </div>
                <div class="data-export" v-else></div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th width="14%">项目名称</th>
                                <th width="14%" v-if="userType==1&&!client_id">客户名称</th>
                                <th width="11%" v-if="userType==1&&!agent_id&&!client_id">所属代理</th>
                                <th width="5%">外呼次数</th>
                                <th width="5%">拨通次数</th>
                                <th width="10%">拨通率</th>
                                <th width="5%">呼损次数</th>
                                <th width="10%">呼损率</th>
                                <th width="8%">通话时长</th>
                                <th width="8%">平均通话</th>
                                <th width="10%" v-if="userType!=4">参与坐席</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>
                                    <router-link :to="{path : '/call/cate',query : {project_id:item.id,project_name:item.name}}">{{item.name}}</router-link>
                                </td>
                                <td v-if="userType==1&&!client_id">
                                    <router-link :to="{path : '/call/index',query : {client_id:item.client_id,client_name:item.client_name}}">{{item.client_name}}</router-link>
                                </td>
                                <td v-if="userType==1&&!agent_id&&!client_id">
                                    <router-link :to="{ path : '/call/index',query : {agent_id:item.agency_id,agent_name:item.agency_name}}">{{item.agency_name}}</router-link>
                                </td>
                                <td>{{item.call_times}}</td>
                                <td>{{item.effect_call_times}}</td>
                                <td>{{item.effect_call_rate}}%</td>
                                <td>{{item.uneffect_call_times}}</td>
                                <td>{{item.uneffect_call_rate}}%</td>
                                <td>{{item.charge_time }}</td>
                                <td>{{item.avg_time }}</td>
                                <td v-if="userType!=4">{{item.seat_num}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
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
    import indexFilter from './index_filter'
    import confirm from 'components/dialog/confirm'
    import alert from 'components/dialog/alert'

    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                list: [],
                head: [],
                userType: user.type,
                agent_id:'',
                agent_name:'',
                client_id:'',
                client_name:'',
                currentPage: 1,
                totalPage: 1
            }
        },
        computed: {
            downUrl() {
                return '/teltraffic/export?'
                    + 'search_name=' + (this.$route.query.search_name?this.$route.query.search_name:'')
                    + '&search_client_id=' + (this.$route.query.search_client_id?this.$route.query.search_client_id:'')
                    + '&search_agent_id=' + (this.$route.query.search_agent_id?this.$route.query.search_agent_id:'')
                    + '&search_start_time=' + (this.$route.query.startTime?this.$route.query.startTime:'')
                    + '&search_end_time=' + (this.$route.query.endTime?this.$route.query.endTime:'')
            }
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        components: {
            pages,
            indexFilter,
            confirm,
            alert,
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.agent_id = this.$route.query.agent_id
                this.agent_name = this.$route.query.agent_name
                this.client_id = this.$route.query.client_id
                this.client_name = this.$route.query.client_name
                this.render()
                this.heads()
            },
            render() {
                let search_agent_id = this.$route.query.search_agent_id === undefined ? '' : this.$route.query.search_agent_id
                let search_client_id = this.$route.query.search_client_id === undefined ? '' : this.$route.query.search_client_id
                mAjax(this, {
                    url: API.call_list,
                    data: {
                        search_name: this.$route.query.search_name,
                        search_client_id: search_client_id,
                        search_agent_id: search_agent_id,
                        search_start_time: this.$route.query.startTime,
                        search_end_time: this.$route.query.endTime,
                        page: this.currentPage,
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            this.list = data.data.data
                            this.totalPage = data.data.page
                        } else {
                            this.list = []
                            this.totalPage = 1
                        }
                    }
                })
            },
            heads() {
                let search_agent_id = this.$route.query.search_agent_id === undefined ? '' : this.$route.query.search_agent_id
                let search_client_id = this.$route.query.search_client_id === undefined ? '' : this.$route.query.search_client_id
                mAjax(this, {
                    url: API.call_head,
                    data: {
                        search_name: this.$route.query.search_name,
                        search_client_id: search_client_id,
                        search_agent_id: search_agent_id,
                        search_start_time: this.$route.query.startTime,
                        search_end_time: this.$route.query.end_time
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            this.head = data.data
                        } else {
                            this.head = []
                        }
                    }
                })
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
            }
        }
    }

</script>