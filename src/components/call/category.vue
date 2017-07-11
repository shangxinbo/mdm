<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <crumbs></crumbs>
            <div class="title-warp">{{project_name}}的话务</div>
            <div class="data-property">
                <categoryFilter @submit="search"></categoryFilter>
                <div class="data-export" v-if="list.length>0">
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
                            <span class="num">{{head.effect_call_rate}}%</span>
                        </li>

                        <li>
                            <span class="t">通话时长</span>
                            <span class="num">{{head.charge_time }}</span>
                        </li>
                        <li>
                            <span class="t">平均通话</span>
                            <span class="num">{{head.avg_time}}</span>
                        </li>
                    </ul>
                    <a :href="'/teltraffic/categoryExport?search_project_id='+project_id+'&search_start_time='+startTime+'&search_end_time='+endTime + '&category=1'"
                        class="btn blue btn-export">
                        <span>
                            <i class="icon icon-export"></i>导出</span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>参与坐席</th>
                                <th>外呼次数</th>
                                <th>拨通次数</th>
                                <th>拨通率</th>
                                <th>呼损次数</th>
                                <th>呼损率</th>
                                <th>通话时长</th>
                                <th>平均通话</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td v-if="userType!=4">
                                    <router-link :to="{path:'/call/seat',query:Object.assign({project_id:project_id,seat_id:item.seat_id,seat_name:item.name,crumb_seat_id:item.seat_id,crumb_seat_name:item.name},crumbs)}">{{item.name}}</router-link>
                                </td>
                                <td v-else>{{item.name}}</td>
                                <td>{{item.call_times}}</td>
                                <td>{{item.effect_call_times}}</td>
                                <td>{{item.effect_call_rate}}%</td>
                                <td>{{item.uneffect_call_times}}</td>
                                <td>{{item.uneffect_call_rate}}%</td>
                                <td>{{item.charge_time }}</td>
                                <td>{{item.avg_time}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import categoryFilter from './category_filter'
    import crumbs from './crumbs'

    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                list: [],
                head: [],
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                project_name: '',
                project_id: '',
                startTime: '',
                endTime: ''
            }
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        components: {
            pages,
            categoryFilter,
            crumbs
        },
        computed: {
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
                if (this.$route.query.crumb_project_id) {
                    obj.crumb_project_id = this.$route.query.crumb_project_id
                    obj.crumb_project_name = this.$route.query.crumb_project_name
                }
                return obj
            }
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.project_name = this.$route.query.project_name ? this.$route.query.project_name : ''
                this.project_id = this.$route.query.project_id ? this.$route.query.project_id : ''
                this.endTime = this.$route.query.endTime ? this.$route.query.endTime : ''
                this.startTime = this.$route.query.startTime ? this.$route.query.startTime : ''
                this.refresh()
                this.heads()
            },
            refresh() {
                let _this = this
                mAjax(this, {
                    url: API.call_cate,
                    data: {
                        search_project_id: _this.project_id,
                        search_start_time: this.startTime,
                        search_end_time: this.endTime,
                        category: 1,
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
            heads() {
                let _this = this
                mAjax(this, {
                    url: API.call_head,
                    data: {
                        category: 1,
                        search_project_id: _this.project_id,
                        search_start_time: _this.startTime,
                        search_end_time: _this.endTime
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
        },
        created() {
            this.init()
            let _this = this
            document.onkeyup = function (evt) {
                if (evt.keyCode == 13)
                    _this.search()
            }
        }
    }

</script>