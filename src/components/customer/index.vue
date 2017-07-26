<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{ agent_name ? agent_name + '的客户' : '客户管理' }}</div>
            <div class="data-property">
                <searchForm ref="searchForm" :userType="userType" @submit="search" />
                <dataSum :data="sum" :userType="userType" :list="list" @showNoTemplate="showNoTemplateDialog"></dataSum>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="15%" label="客户名称">
                            <router-link :to="'/customer/detail/'+ props.item.id">{{props.item.company}}</router-link>
                        </td>
                        <td width="6%" label="类型">{{props.item.type}}</td>
                        <td width="10%" label="创建日期" v-if="userType==2">{{props.item.created_at.substr(0,10)}}</td>
                        <td width="6%" label="状态">
                            {{props.item.role}}
                            <template v-if="props.item.audit_status==1">通过</template>
                            <template v-else-if="props.item.audit_status==2">未通过
                                <span class="notice" @mouseover="showReason" @mouseout="hideReason">
                                    <i class="icon tips"></i>
                                    <em>{{props.item.audit_advice}}</em>
                                </span>
                            </template>
                            <template v-else>待审核</template>
                        </td>
                        <td width="6%" label="挂机短信" v-if="userType==1">{{props.item.is_hang_up_message==0?'未开通':'已开通'}}</td>
                        <td width="5%" label="进行中项目" v-if="userType==1">{{props.item.audit_status==1?props.item.conduct_project:''}}</td>
                        <td width="5%" label="在用坐席" v-if="userType==1">{{props.item.audit_status==1?props.item.seat_num:''}}</td>
                        <td width="10%" label="余额" :class="{red:props.item.balance<1000}">
                            <template v-if="props.item.audit_status==1">
                                ¥{{props.item.balance}}
                                <span v-if="props.item.balance<1000" @mouseover="showReason" @mouseout="hideReason" class="notice">
                                    <i class="icon tips"></i>
                                    <em>请及时充值</em>
                                </span>
                            </template>
                        </td>
                        <td width="15%" label="操作">
                            <template v-if="userType==1">
                                <router-link v-if="props.item.audit_status==0" :to="'/customer/check/' + props.item.id">审核</router-link>
                                <a v-if="props.item.audit_status==1" href="javascript:void(0);" @click="showAddSeatDialog(props.item.id,props.item.company,props.item.seat_num,props.item.seat_price)">开坐席</a>
                                <a v-if="props.item.audit_status==1&&props.item.expire_seat_num>0" href="javascript:void(0);" @click="showActiveSeatDialog(props.item.id,props.item.company,props.item.seat_price)">激活坐席</a>
                                <a v-if="props.item.audit_status==1" href="javascript:void(0);" @click="showRechargeDialog(props.item.id,props.item.company,props.item.balance)">充值</a>
                                <a v-if="props.item.audit_status==1" href="javascript:void(0);" @click="showChangePriceDialog(props.item.id,props.item.seat_price,props.item.clue_price,props.item.tel_price,props.item.is_hang_up_message,props.item.hang_up_message_price)">调价</a>
                                <router-link v-if="props.item.audit_status==1" :to="'/customer/add/'+props.item.id">编辑</router-link>
                            </template>
                            <template v-else>
                                <router-link v-if="props.item.audit_status==2" :to="'/customer/add/' + props.item.id">重新申请</router-link>
                                <a v-if="props.item.audit_status==1" href="javascript:void(0);" @click="showEditDialog(props.item.id)">修改信息</a>
                                <a v-if="props.item.audit_status==1" href="javascript:void(0);" @click="showResetPassDialog(props.item.id,props.item.company)">重置密码</a>
                            </template>
                        </td>
                    </template>
                </mtable>
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
    import mtable from 'components/utils/table'

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
                    obj.is_hang_up_message = this.$route.query.hangup
                }
                this.$ajax({
                    url: api,
                    data: obj,
                    success: data => {
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
                this.$toast('修改信息成功', () => {
                    window.location.reload()
                })
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
            showChangePriceDialog(id, seat_price, clue_price, call_price, sms, sms_price) {
                this.$refs.changePriceDialog.$emit('show', id, seat_price, clue_price, call_price, sms, sms_price)
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
            noTemplateListDialog,
            mtable
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('HIDE_LAYER')
            next()
        }
    }

</script>