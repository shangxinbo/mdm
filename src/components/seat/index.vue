<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">我的项目</div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">项目名称</label>
                            <div class="input-warp">
                                <input v-model="search_name" class="text" type="text">
                            </div>
                        </li>
                        <li>
                            <label class="name"> 项目状态</label>
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
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                    </ul>

                </form>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <!--<p class="no-data">暂无数据</p>-->
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                             <tr>
                                <th>项目名称</th>
                                <th>类型</th>
                                <th>创建日期</th>
                                <th>状态</th>
                                <th>线索量</th>
                                <th>剩余线索</th>
                                <th>拨通线索</th>
                                <th>有效率</th>
                                <th>通话时长</th>
                                <th>剩余时间</th>
                                <th>项目坐席</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>{{item.name}}</td>
                                <td>{{item.project_type}}</td>
                                <td>{{item.created_at}}</td>
                                <td>{{item.project_status}}</td>
                                <td>{{item.clue_num}}</td>
                                <td>{{item.clue_odd_num}}</td>
                                <td>{{item.clue_connect_num}}</td>
                                <td>{{item.clue_valid_percent}}%</td>
                                <td>{{item.call_time}}</td>
                                <td>{{item.odd_time}}</td>
                                <td>{{item.project_seat_num}}</td>
                                <td>
                                    <router-link :to="'/seat/outbound/' + item.id">去外呼</router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <div class="page">
                     <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
                </div>
            </div>
        </div>
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
                userType: user.type,
                start_time: '',
                end_time: '',
                currentPage: 1,
                totalPage: 1,
                search_name: '',
                search_status: '',
                search_start_time: '',
                search_end_time: '',
                datepicker_disabled: {
                    to: new Date(2017, 0, 1),
                    from: new Date()
                },
                api: {
                    statusList: API.seat_status
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
                this.search_name = this.$route.query.search_name
                this.search_status = this.$route.query.search_status
                this.search_start_time = this.$route.query.search_start_time
                this.search_end_time = this.$route.query.search_end_time
                this.start_time = this.$route.query.search_start_time
                this.end_time = this.$route.query.search_end_time
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.refresh()
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
            refresh: function () {
                let _this = this
                mAjax(this, {
                    url: API.project_list,
                    data: {
                        nums: 10,
                        page: _this.currentPage,
                        search_project_name: _this.search_name,
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
                let search_status = this.$refs.statusSelect ? this.$refs.statusSelect.selected.id : ''
                let start_time = typeof(this.start_time)=='string' ? this.start_time : dateFormat(this.start_time)
                let end_time = typeof(this.end_time)=='string' ? this.end_time : dateFormat(this.end_time)
                let query = Object.assign({}, this.$route.query, {
                    search_name: this.search_name,
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
            assignSeat(id,name){
                this.$refs.chooseSeatDialog.$emit('show',id,name)
            }
        },
        created: function () {
            this.refresh()
        }
    }

</script>