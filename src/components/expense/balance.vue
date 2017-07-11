<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">余额管理</div>
            <div class="money-sum">
                <span class="name">余额</span><span class="num">&yen;<em>{{customerInfo['balance']}}</em></span>
                <p class="notice" v-if="alarm" style="max-width: 500px;"><i class="icon"></i>您的余额不足，请尽快联系相关人员进行充值，以免影响您的正常使用</p>
            </div>
            <div class="tag-nav">
                <router-link to="/expense/balance?type=in" :class="type=='in'?'active':''">充值记录</router-link>
                <router-link to="/expense/balance?type=out" :class="type=='out'?'active':''">消费记录</router-link>
            </div>
            <div class="data-warp">
                <div class="cutover">
                    <div class="data-table cutover-tab01" v-if="type=='in'">
                        <dataTable ref="table" :list="list" :type="type" v-if="list.length>0"></dataTable>
                        <p class="no-data" v-else>暂无数据</p>
                    </div>
                    <div class="data-table cutover-tab02" v-if="type=='out'">
                        <dataTable ref="table" :list="list" :type="type" v-if="list.length>0"></dataTable>
                        <p class="no-data" v-else>暂无数据</p>
                    </div>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
    </div>
</template>


<script>
    import {mAjax, dateFormat} from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import mselect from 'components/utils/select'
    import datepicker from 'vuejs-datepicker'
    import dataTable from './bTable'

    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                userType: user.type,
                list: [],
                currentPage: 1,
                totalPage: 1,
                type: 'in',
                customerInfo: '',
                alarm: false,
                url: API.expense_balance_in
            }
        },
        watch: {
            $route: function () {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.type = this.$route.query.type ? this.$route.query.type : "in"
                if (this.type == 'in') {
                    this.url = API.expense_balance_in
                } else if (this.type == 'out') {
                    this.type = 'out'
                    this.url = API.expense_balance_out
                }
                this.refresh()
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
                mAjax(this, {
                    url: _this.url,
                    data: {
                        nums: 10,
                        page: _this.currentPage,
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.list = data.data.data
                            _this.totalPage = Math.ceil(data.data.total / data.data.per_page)
                        } else {
                            _this.$toast(data.message)
                        }
                    }
                })
            },
            //客户详情
            getCustomerInfo: function () {
                let _this = this
                mAjax(this, {
                    url: API.customer_info,
                    data: {},
                    success: (data) => {
                        if (data.code == 200) {
                            _this.customerInfo = data.data
                        } else {
                            _this.$toast(data.message)
                        }
                    }
                })
            },
            //客户余额报警
            getCustomerAlert: function () {
                let _this = this
                mAjax(this, {
                    url: API.customer_alarm,
                    data: {},
                    success: (data) => {
                        if (data.code == 200) {
                            _this.alarm = data.data.warning
                        } else {
                            _this.$toast(data.message)
                        }
                    }
                })
            },
            jump(num) {
                let obj = Object.assign({}, this.$route.query, {page: num})
                this.$router.replace({
                    name: this.$route.name,
                    query: obj
                })
            }
        },
        created: function () {
            this.currentPage = this.$route.query.page ? this.$route.query.page : 1
            this.type = this.$route.query.type ? this.$route.query.type : 'in'
            if (this.type == 'in') {
                this.url = API.expense_balance_in
            } else if (this.type == 'out') {
                this.url = API.expense_balance_out
            }
            this.getCustomerInfo()
            this.getCustomerAlert()
            this.refresh()
        }
    }

</script>
