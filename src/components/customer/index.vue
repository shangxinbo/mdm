<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{ agent_name ? agent_name + '的客户' : '客户管理' }}</div>
            <div class="data-property">
                <searchForm :userType="userType" @submit="search" />
                <dataSum :data="sum" :userType="userType" v-if="list.length>0"></dataSum>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th width="20%">客户名称</th>
                                <th v-if="userType==1&&!agent_id">所属代理</th>
                                <th>类型</th>
                                <th>创建日期</th>
                                <th>状态</th>
                                <th v-if="userType==1">进行中的项目</th>
                                <th v-if="userType==1">现有坐席</th>
                                <th>余额</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>
                                    <router-link :to="'/customer/detail/'+ item.id">{{item.company}}</router-link>
                                </td>
                                <td v-if="userType==1&&!agent_id">
                                    <router-link :to="{query:{agent_id:item.superior_id,agent_name:item.agent_name}}">{{item.agent_name}}</router-link>
                                </td>
                                <td>{{item.type}}</td>
                                <td>{{item.created_at}}</td>
                                <td v-if="item.audit_status==1">通过</td>
                                <td v-else-if="item.audit_status==2">未通过
                                    <span class="notice" @mouseover="showReason" @mouseout="hideReason">
                                        <i class="icon tips"></i>
                                        <em>{{item.audit_advice}}</em>
                                    </span>
                                </td>
                                <td v-else>待审核</td>
                                <td v-if="userType==1">{{item.conduct_project}}</td>
                                <td v-if="userType==1">{{item.seat_num}}</td>
                                <td>¥{{item.balance}}</td>
                                <td v-if="userType==1">
                                    <router-link v-if="item.audit_status==0" :to="'/customer/check/' + item.id">审核</router-link>
                                    <a v-if="item.audit_status==1" href="javascript:void(0);" @click="showAddSeatDialog(item.id,item.company,item.seat_num)">开通坐席</a>
                                    <a v-if="item.audit_status==1" href="javascript:void(0);" @click="showRechargeDialog(item.id,item.company,item.balance)">充值</a>
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
        <editDialog ref="editDialog"></editDialog>
        <resetPassDialog ref="resetPassDialog"></resetPassDialog>
        <addSeatDialog ref="addSeatDialog"></addSeatDialog>
        <rechargeDialog ref="rechargeDialog"></rechargeDialog>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import editDialog from './dialog/changeInfo'
    import resetPassDialog from 'components/dialog/resetpass'
    import addSeatDialog from './dialog/addSeat'
    import rechargeDialog from './dialog/recharge'
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
                mAjax(this, {
                    url: api,
                    data: {
                        page: this.currentPage,
                        company: this.$route.query.customerName,
                        type: this.$route.query.typeId,
                        audit_status: this.$route.query.statusId,
                        superior_id: this.agent_id ? this.agent_id : this.$route.query.agentId
                    },
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
            showResetPassDialog(id, user) {
                this.$refs.resetPassDialog.$emit('show', id, user)
            },
            showAddSeatDialog(id, company, seat) {
                this.$refs.addSeatDialog.$emit('show', id, company, seat)
            },
            showRechargeDialog(id, company, balance) {
                this.$refs.rechargeDialog.$emit('show', id, company, balance)
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
            let _this = this
            document.onkeyup = function (evt) {
                if (evt.keyCode == 13)
                    _this.search()
            }
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
            rechargeDialog
        },
    }

</script>