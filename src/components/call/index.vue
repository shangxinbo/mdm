<template>
    <div class="warp">
        <div class="main">
            <crumbs></crumbs>
            <div class="title-warp" v-if="userType==4">我的话务</div>
            <div class="title-warp" v-else>{{client_name?client_name+'的话务':(agent_name?agent_name+'的话务':'话务管理')}}</div>
            <div class="data-property">
                <indexFilter @submit="search"></indexFilter>
                <div class="data-export">
                    <ul v-if="list.length>0">
                        <li>
                            <span class="t">拨通次数</span>
                            <span class="num">{{head.effect_call_times}}</span>
                        </li>
                        <li>
                            <span class="t">通话时长</span>
                            <span class="num">{{head.charge_time}}</span>
                        </li>
                        <li>
                            <span class="t">挂机短信</span>
                            <span class="num">{{head.message_num}}</span>
                        </li>
                        <a :href="downUrl" class="btn blue btn-export">
                            <span>
                                <i class="icon icon-export"></i>导出
                            </span>
                        </a>
                    </ul>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="13%" label="项目名称">
                            <router-link :to="{path : '/call/cate',query : Object.assign({project_id:props.item.id,project_name:props.item.name,crumb_project_id:props.item.id,crumb_project_name:props.item.name},crumbs)}">{{props.item.name}}</router-link>
                        </td>
                        <td width="13%" label="客户名称" v-if="userType==1&&!client_id">
                            <router-link :to="{query : Object.assign({client_id:props.item.client_id,client_name:props.item.client_name,crumb_client_id:props.item.client_id,crumb_client_name:props.item.client_name},crumbs)}">{{props.item.client_name}}</router-link>
                        </td>
                        <td width="13%" label="所属代理" v-if="userType==1&&!agent_id&&!client_id">
                            <router-link :to="{query : {agent_id:props.item.agency_id,agent_name:props.item.agency_name,crumb_agent_id:props.item.agency_id,crumb_agent_name:props.item.agency_name}}">{{props.item.agency_name}}</router-link>
                        </td>
                        <td width="6%" label="外呼次数">{{props.item.call_times}}</td>
                        <td width="6%" label="拨通次数">{{props.item.effect_call_times}}</td>
                        <td width="6%" label="拨通率">{{props.item.effect_call_rate}}%</td>
                        <td width="6%" label="呼损次数">{{props.item.uneffect_call_times}}</td>
                        <td width="6%" label="呼损率">{{props.item.uneffect_call_rate}}%</td>
                        <td width="8%" label="通话时长">{{props.item.charge_time }}</td>
                        <td width="8%" label="平均通话">{{props.item.avg_time }}</td>
                        <td width="6%" label="挂机短信">{{props.item.message_num }}</td>
                        <td width="6%" label="参与坐席" v-if="userType!=4">{{props.item.seat_num}}</td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import indexFilter from './index_filter'
    import crumbs from './crumbs'
    import mtable from 'components/utils/table'

    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                list: [],
                head: [],
                userType: user.type,
                agent_id: '',
                agent_name: '',
                client_id: '',
                client_name: '',
                currentPage: 1,
                totalPage: 1
            }
        },
        computed: {
            downUrl() {
                let client_id = this.$route.query.client_id || this.$route.query.search_client_id || ''
                let agent_id = this.$route.query.agent_id || this.$route.query.search_agent_id || ''
                let category = 1
                if (this.$route.query.client_id) {
                    category = 3
                } else if (this.$route.query.agent_id) {
                    category = 2
                }
                return '/teltraffic/export?'
                    + 'category=' + category
                    + '&search_name=' + (this.$route.query.search_name || '')
                    + '&search_client_id=' + client_id
                    + '&search_agent_id=' + agent_id
                    + '&search_start_time=' + (this.$route.query.startTime || '')
                    + '&search_end_time=' + (this.$route.query.endTime || '')
            },
            crumbs() {
                let obj = {}
                if (this.$route.query.crumb_agent_id) {
                    obj.crumb_agent_id = this.$route.query.crumb_agent_id
                    obj.crumb_agent_name = this.$route.query.crumb_agent_name
                }
                if (this.$route.query.crumb_client_id) {
                    obj.crumb_client_id = this.$route.query.crumb_client_id
                    obj.crumb_client_name = this.$route.query.crumb_client_name
                }
                return obj
            }
        },
        watch: {
            $route() {
                this.render()
                this.heads()
            }
        },
        components: {
            pages,
            indexFilter,
            crumbs,
            mtable
        },
        created() {
            this.render()
            this.heads()
        },
        methods: {
            render() {
                this.client_id = this.$route.query.client_id
                let client_id = this.client_id || this.$route.query.search_client_id || ''
                this.agent_id = this.$route.query.agent_id
                let agent_id = this.agent_id || this.$route.query.search_agent_id || ''
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.agent_name = this.$route.query.agent_name
                this.client_name = this.$route.query.client_name
                this.$ajax({
                    url: API.call_list,
                    data: {
                        search_name: this.$route.query.search_name,
                        search_client_id: client_id,
                        search_agent_id: agent_id,
                        search_start_time: this.$route.query.startTime ? this.$route.query.startTime : '',
                        search_end_time: this.$route.query.endTime ? this.$route.query.endTime : '',
                        page: this.currentPage,
                    },
                    success: data => {
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
                let client_id = this.$route.query.client_id || this.$route.query.search_client_id || ''
                let agent_id = this.$route.query.agent_id || this.$route.query.search_agent_id || ''
                this.$ajax({
                    url: API.call_head,
                    data: {
                        category: 2,
                        search_name: this.$route.query.search_name,
                        search_client_id: client_id,
                        search_agent_id: agent_id,
                        search_start_time: this.$route.query.startTime ? this.$route.query.startTime : '',
                        search_end_time: this.$route.query.endTime ? this.$route.query.endTime : ''
                    },
                    success: data => {
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