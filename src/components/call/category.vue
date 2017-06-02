<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{project_name的话务')}}
            </div>
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
                    <a :href="'/teltraffic/categoryExport' + '?search_project_id='+search_project_id+'&search_start_time='+search_start_time+'&search_end_time='+search_end_time + '&category='+category" class="btn blue btn-export"><span><i class="icon icon-export"></i>导出</span></a>
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
                                <td>{{item.name}}</td>
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
    import categoryFilter from './category_filter'
    import confirm from 'components/dialog/confirm'
    import alert from 'components/dialog/alert'

    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                list: [],
                head :[],
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                client_name : '',
                agent_name : '',
                project_name : '',
                search_start_time : '',
                search_end_time : '',
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
            categoryFilter,
            confirm,
            alert,
        },
        methods: {
            init : function() {
                this.search_name = this.$route.query.search_name?this.$route.query.search_name:''
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.search_agent_id = this.$route.query.search_agent_id===undefined ?'': this.$route.query.search_agent_id
                this.agent_name = this.$route.query.agent_name ? this.$route.query.agent_name : ''
                this.search_client_id = this.$route.query.search_client_id===undefined ?'': this.$route.query.search_client_id
                this.client_name = this.$route.query.client_name ? this.$route.query.client_name : ''
                this.project_name = this.$route.query.project_name ? this.$route.query.project_name : ''
                this.search_project_id = this.$route.query.search_project_id ? this.$route.query.search_project_id : ''
                this.search_end_time = this.$route.query.search_end_time ? this.$route.query.search_end_time : ''
                this.search_start_time = this.$route.query.search_start_time ? this.$route.query.search_start_time : ''
                this.category = this.userType == 3 ? 1 :(this.search_agent_id ? 2:3)
                this.refresh()
                this.heads()
            },
            refresh: function () {
                let _this = this
                let start_time = typeof (this.search_start_time) == 'string' ? this.search_start_time : dateFormat(this.search_start_time)
                let end_time = typeof (this.search_end_time) == 'string' ? this.search_end_time : dateFormat(this.search_end_time)
                mAjax(this, {
                    url: API.call_cate,
                    data: {
                        search_name : _this.search_name ,
                        search_agent_id: _this.search_agent_id  ,
                        search_client_id : _this.search_client_id  ,
                        search_project_id : _this.search_project_id  ,
                        search_start_time: start_time,
                        search_end_time: end_time,
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
                let start_time = typeof (this.search_start_time) == 'string' ? this.search_start_time : dateFormat(this.search_start_time)
                let end_time = typeof (this.search_end_time) == 'string' ? this.search_end_time : dateFormat(this.search_end_time)
                mAjax(this, {
                    url: API.call_head,
                    data: {
                        category : _this.category,
                        search_name: _this.search_name ,
                        search_client_id: _this.search_client_id ,
                        search_agent_id: _this.search_agent_id ,
                        search_project_id : _this.search_project_id ,
                        search_start_time:start_time,
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
                let search_client_id = this.$refs.customerSelect ? this.$refs.customerSelect.selected.id : this.search_client_id
                let start_time = this.search_start_time
                let end_time = this.search_end_time
                let query = Object.assign({}, this.$route.query, {
                    search_name: this.search_name,
                    search_client_id: search_client_id,
                    search_agent_id: this.search_agent_id,
                    search_project_id : this.search_project_id,
                    search_start_time: start_time,
                    search_end_time: end_time,
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
            let _this = this
            document.onkeyup = function (evt) {
                if (evt.keyCode == 13)
                    _this.search()
            }
        }
    }

</script>
