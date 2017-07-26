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
                    <a :href="'/teltraffic/categoryExport?search_project_id='+project_id+'&search_start_time='+startTime+'&search_end_time='+endTime"
                        class="btn blue btn-export">
                        <span>
                            <i class="icon icon-export"></i>导出</span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="10%" label="参与坐席">
                            <template v-if="userType!=4">
                                <router-link :to="{path:'/call/seat',query:{project_id:project_id,seat_id:props.item.seat_id,seat_name:props.item.name,crumb_seat_id:props.item.seat_id,crumb_seat_name:props.item.name}}">{{props.item.name}}</router-link>
                            </template>
                            <template v-else>{{props.item.name}}</template>
                        </td>
                        <td width="10%" label="外呼次数">{{props.item.call_times}}</td>
                        <td width="10%" label="拨通次数">{{props.item.effect_call_times}}</td>
                        <td width="10%" label="拨通率">{{props.item.effect_call_rate}}%</td>
                        <td width="10%" label="呼损次数">{{props.item.uneffect_call_times}}</td>
                        <td width="10%" label="呼损率">{{props.item.uneffect_call_rate}}%</td>
                        <td width="20%" label="通话时长">{{props.item.charge_time}}</td>
                        <td width="10%" label="平均通话">{{props.item.avg_time}}</td>
                        <td width="10%" label="挂机短信">{{props.item.message_num}}</td>
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
    import categoryFilter from './category_filter'
    import crumbs from './crumbs'
    import mtable from 'components/utils/table'

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
            $route() {
                this.init()
            }
        },
        components: {
            pages,
            categoryFilter,
            mtable,
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
                this.project_name = this.$route.query.project_name || ''
                this.project_id = this.$route.query.project_id || ''
                this.endTime = this.$route.query.endTime || ''
                this.startTime = this.$route.query.startTime || ''
                this.refresh()
                this.heads()
            },
            refresh() {
                this.$ajax({
                    url: API.call_cate,
                    data: {
                        search_project_id: this.project_id,
                        search_start_time: this.startTime,
                        search_end_time: this.endTime,
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
                this.$ajax({
                    url: API.call_head,
                    data: {
                        category: 1,
                        search_project_id: this.project_id,
                        search_start_time: this.startTime,
                        search_end_time: this.endTime
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