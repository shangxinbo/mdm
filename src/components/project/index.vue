<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">项目管理</div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">项目名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="search_name" type="text">
                            </div>
                        </li>
                        <customerSelect ref="customerSelect"></customerSelect>
                        <agentSelect ref="agentSelect"></agentSelect>
                        <statusSelect ref="statusSelect"></statusSelect>
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
                            <button class="btn blue" type="button" @click="jump(1)">
                                <span>
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                    </ul>
                </form>
                <div class="data-export">
                    <ul>
                        <li>
                            <span class="t">项目数</span>
                            <span class="num">{{sum.project_all}}</span>
                        </li>
                        <li>
                            <span class="t">进行中项目</span>
                            <span class="num">{{sum.project_run}}</span>
                        </li>
                        <li>
                            <span class="t">线索量</span>
                            <span class="num">{{sum.clue_num}}</span>
                        </li>
                        <li>
                            <span class="t">剩余线索</span>
                            <span class="num">{{sum.clue_last}}</span>
                        </li>
                        <li>
                            <span class="t">拨通线索</span>
                            <span class="num">{{sum.clue_catch}}</span>
                        </li>
                        <li>
                            <span class="t">有效率</span>
                            <span class="num">{{sum.rate}}%</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>项目名称</th>
                                <th>客户名称</th>
                                <th>所属代理</th>
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
                                <td>
                                    <a href="#">{{item.name}}</a>
                                </td>
                                <td>
                                    <a href="operate-project-client.html">{{item.client_name}}</a>
                                </td>
                                <td>
                                    <a href="operate-project-agent.html">{{item.agency}}</a>
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
                                <td>{{item.project_seat_num}}</td>
                                <td>
                                    <a href="operate-project-examine.html">审核</a>
                                    <a href="javascript:void(0);" @click="stop(item.id)">暂停</a>
                                    <a href="javascript:void(0);" @click="start(item.id)">开启</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
        <confirm ref="confirm"></confirm>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import customerSelect from './customerSelect'
    import agentSelect from 'components/customer/agentSelect'
    import statusSelect from './statusSelect'
    import datepicker from 'vuejs-datepicker'
    import confirm from 'components/dialog/confirm'
    export default {
        data: function () {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1,
                search_name: '',
                start_time: '',
                end_time: '',
                datepicker_disabled: {
                    to: new Date(2017, 0, 1),
                    from: new Date()
                },
                sum: {
                    project_all: '',
                    project_run: '',
                    clue_num: '',
                    clue_last: '',
                    clue_catch: '',
                    rate: ''
                }
            }
        },
        components: {
            pages,
            customerSelect,
            agentSelect,
            statusSelect,
            datepicker,
            confirm
        },
        methods: {
            refresh: function () {
                let _this = this
                let page = this.$route.params.page
                page = page ? page : 1

                let search_customer = this.$refs.customerSelect ? this.$refs.customerSelect.selected.id : ''
                let search_agent = this.$refs.agentSelect ? this.$refs.agentSelect.selected.id : ''
                let search_status = this.$refs.statusSelect ? this.$refs.statusSelect.selected.id : ''

                mAjax(this, {
                    url: API.project_list,
                    data: {
                        page: page,
                        nums: 10,
                        search_project_name: _this.search_name,
                        search_client_id: search_customer,
                        search_agency_id: search_agent,
                        search_project_status: search_status,
                        search_project_begin_time: dateFormat(_this.start_time),
                        search_project_end_time: dateFormat(_this.end_time)
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.list = data.data.data
                            _this.sum = {
                                project_all: data.data.count.projectNumTotal,
                                project_run: data.data.count.projectStatusIngTotal,
                                clue_num: data.data.count.clueNumTotal,
                                clue_last: data.data.count.oddNumTotal,
                                clue_catch: data.data.count.connectNumTotal,
                                rate: data.data.count.clueValidPercent
                            }
                            _this.totalPage = Math.ceil(data.data.page.total / 10)
                            _this.currentPage = page
                        } else {
                            _this.$refs.alert.$emit('show', data.message)
                        }
                    }
                })
            },
            jump(num) {
                this.$router.replace('/project/index/' + num)
                this.refresh()
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
                            //TODO toast 
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
                            //TODO toast 
                        }
                    })
                })
            }
        },
        created: function () {
            this.refresh()
        }
    }

</script>