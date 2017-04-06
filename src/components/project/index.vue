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
                        <li>
                            <label class="name">客户名称</label>
                            <mselect ref="customerSelect" :api="api.customerList"></mselect>
                        </li>
                        <li>
                            <label class="name">所属代理</label>
                            <mselect ref="agentSelect" :api="api.agentList"></mselect>
                        </li>
                        <li>
                            <label class="name">项目状态</label>
                            <mselect ref="statusSelect" :api="api.statusList"></mselect>
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
                            <button class="btn blue" type="button" @click="jump(1)">
                                <span>
                                    <i class="icon search"></i>查询
                                </span>
                            </button>
                        </li>
                    </ul>
                </form>
                <div class="data-export">
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
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <dataTable ref="table" :list="list" v-if="list.length>0"></dataTable>
                    <p v-else>暂无数据</p>
                </div>
                <pages :total="page.total" :current="page.current" @jump='jump'></pages>
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
    import dataTable from './table'
    export default {
        data: function () {
            return {
                list: [],
                page:{
                    current:1,
                    total:1
                },
                search_name: '',
                start_time: '',
                end_time: '',
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
        components: {
            pages,
            mselect,
            datepicker,
            dataTable
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
                            _this.sum = data.data.count
                            _this.page.total = Math.ceil(data.data.page.total / 10)
                            _this.page.current = page
                        } else {
                            _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    }
                })
            },
            jump(num) {
                this.$router.replace('/project/index/' + num)
                this.refresh()
            }
        },
        created: function () {
            this.refresh()
        }
    }

</script>