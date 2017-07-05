<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{ agent_name ? agent_name + '的客户' : '客户管理' }}</div>
            <div class="data-property">
                <searchForm ref="searchForm" :userType="userType" @submit="search" />
                <dataSum :data="sum" :userType="userType" :list="list" @showNoTemplate="showNoTemplateDialog"></dataSum>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th width="15%">客户名称</th>
                                <th width="10%">类型</th>
                                <th width="10%" v-if="userType==2">创建日期</th>
                                <th width="10%">状态</th>
                                <th width="10%" v-if="userType==1">挂机短信</th>
                                <th width="5%" v-if="userType==1">进行中项目</th>
                                <th width="5%" v-if="userType==1">在用坐席</th>
                                <th width="10%">余额</th>
                                <th width="15%">操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>
                                    <router-link :to="'/customer/detail/'+ item.id">{{item.company}}</router-link>
                                </td>
                                <td>{{item.type}}</td>
                                <td v-if="userType==2">{{item.created_at.substr(0,10)}}</td>
                                <td v-if="item.audit_status==1">通过</td>
                                <td v-else-if="item.audit_status==2">未通过
                                    <span class="notice" @mouseover="showReason" @mouseout="hideReason">
                                        <i class="icon tips"></i>
                                        <em>{{item.audit_advice}}</em>
                                    </span>
                                </td>
                                <td v-else>待审核</td>
                                <td v-if="userType==1">{{item.is_hang_message_up==0?'未开通':'已开通'}}</td>
                                <td v-if="userType==1">{{item.audit_status==1?item.conduct_project:''}}</td>
                                <td v-if="userType==1">{{item.audit_status==1?item.seat_num:''}}</td>
                                <td v-if="item.audit_status==1" :class="{red:item.balance<1000}">¥{{item.balance}}
                                    <span v-if="item.balance<1000" @mouseover="showReason" @mouseout="hideReason" class="notice">
                                        <i class="icon tips"></i>
                                        <em>请及时充值</em>
                                    </span>
                                </td>
                                <td v-else></td>
                                <td v-if="userType==1">
                                    <router-link v-if="item.audit_status==0" :to="'/customer/check/' + item.id">审核</router-link>
                                    <a v-if="item.audit_status==1" href="javascript:void(0);" @click="showAddSeatDialog(item.id,item.company,item.seat_num,item.seat_price)">开坐席</a>
                                    <a v-if="item.audit_status==1&&item.expire_seat_num>0" href="javascript:void(0);" @click="showActiveSeatDialog(item.id,item.company,item.seat_price)">激活坐席</a>
                                    <a v-if="item.audit_status==1" href="javascript:void(0);" @click="showRechargeDialog(item.id,item.company,item.balance)">充值</a>
                                    <a v-if="item.audit_status==1" href="javascript:void(0);" @click="showChangePriceDialog(item.id,item.company,item.balance,item.seat_price,item.clue_price,item.tel_price)">调价</a>
                                    <router-link v-if="item.audit_status==1" :to="'/customer/add/'+item.id">编辑</router-link>
                                </td>
                                <td v-else>
                                    <router-link v-if="item.audit_status==2" :to="'/customer/add/' + item.id">重新申请</router-link>
                                    <a v-if="item.audit_status==1" href="javascript:void(0);" @click="showEditDialog(item.id)">修改信息</a>
                                    <a v-if="item.audit_status==1" href="javascript:void(0);" @click="showResetPassDialog(item.id,item.company)">重置密码</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
        <editDialog ref="editDialog" @success="editOver"></editDialog>
        <resetPassDialog ref="resetPassDialog"></resetPassDialog>
        <addSeatDialog ref="addSeatDialog"></addSeatDialog>
        <activeSeatDialog ref="activeSeatDialog"></activeSeatDialog>
        <rechargeDialog ref="rechargeDialog"></rechargeDialog>
        <changePriceDialog ref="changePriceDialog"></changePriceDialog>
        <noTemplateListDialog ref="noTemplateListDialog"></noTemplateListDialog>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import editDialog from './dialog/changeInfo'
    import resetPassDialog from 'components/dialog/resetpass'
    import addSeatDialog from './dialog/addSeat'
    import activeSeatDialog from './dialog/activeSeat'
    import rechargeDialog from './dialog/recharge'
    import changePriceDialog from './dialog/changePrice'
    import noTemplateListDialog from './dialog/notmplist'
    import searchForm from './searchForm'
    import dataSum from './dataSum'

    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                list: [],
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                sum: {},
                agent_id: '',
                agent_name: ''
            }
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.agent_id = this.$route.query.agent_id
                this.agent_name = this.$route.query.agent_name
                this.refresh()
            },
            refresh() {
                let api = this.userType == 1 ? API.customer_list_by_operate : API.customer_list
                let obj = {
                    page: this.currentPage,
                    company: this.$route.query.customerName,
                    type: this.$route.query.typeId,
                    audit_status: this.$route.query.statusId,
                    superior_id: this.agent_id ? this.agent_id : this.$route.query.agentId,
                    created_at_start: this.$route.query.startTime ? this.$route.query.startTime : '',
                    created_at_end: this.$route.query.endTime ? this.$route.query.endTime : ''
                }
                if (this.$route.query.hangup) {
                    obj.is_hang_up_messge = this.$route.query.hangup
                }
                mAjax(this, {
                    url: api,
                    data: obj,
                    success: (data) => {
                        if (data.code == 200) {
                            let list = data.data
                            if (this.userType == 1) {
                                this.sum = {
                                    customer: list.customer_num,
                                    project: list.conduct_project,
                                    seat: list.seat_num
                                }
                                this.list = list.customer.data
                                this.totalPage = Math.ceil(list.customer.total / list.customer.per_page)
                            } else {
                                this.list = list.data
                                this.totalPage = Math.ceil(list.total / list.per_page)
                            }
                        } else {
                            this.list = ''
                            this.totalPage = 1
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
            },
            showEditDialog(id) {
                this.$refs.editDialog.$emit('show', id)
            },
            editOver() {
                this.$store.commit('SHOW_TOAST', '修改信息成功')
            },
            showResetPassDialog(id, user) {
                this.$refs.resetPassDialog.$emit('show', id, user)
            },
            showAddSeatDialog(id, company, seat, price) {
                this.$refs.addSeatDialog.$emit('show', id, company, seat, price)
            },
            showActiveSeatDialog(id, company, price) {
                this.$refs.activeSeatDialog.$emit('show', id, company, price)
            },
            showRechargeDialog(id, company, balance) {
                this.$refs.rechargeDialog.$emit('show', id, company, balance)
            },
            showChangePriceDialog(id, company, balance, seat_price, clue_price, call_price) {
                this.$refs.changePriceDialog.$emit('show', id, company, balance, seat_price, clue_price, call_price)
            },
            showNoTemplateDialog() {
                this.$refs.noTemplateListDialog.$emit('show')
            },
            showReason(evt) {
                evt.currentTarget.querySelector('em').style.display = 'block'
            },
            hideReason(evt) {
                evt.currentTarget.querySelector('em').style.display = 'none'
            }
        },
        created() {
            this.init()
        },
        watch: {
            $route: function (newVal, oldVal) {
                this.init()
            }
        },
        components: {
            pages,
            editDialog,
            searchForm,
            dataSum,
            resetPassDialog,
            addSeatDialog,
            activeSeatDialog,
            rechargeDialog,
            changePriceDialog,
            noTemplateListDialog
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('HIDE_LAYER')
            next()
        }
    }

</script>