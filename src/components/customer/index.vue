<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{agent.name?agent.name+'的客户':'客户管理'}}</div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">客户名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="user" type="text">
                            </div>
                        </li>
                        <agentSelect ref="agentSelect" v-if="!agent.id"></agentSelect>
                        <typeSelect ref="typeSelect"></typeSelect>
                        <statusSelect ref="statusSelect"></statusSelect>
                        <li>
                            <button class="btn blue" type="button" @click="jump(1)">
                                <span>
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                    </ul>
                </form>
                <div class="data-export">
                    <ul v-if="authType==1">
                        <li>
                            <span class="t">客户数</span>
                            <span class="num">{{sum.customer}}</span>
                        </li>
                        <li>
                            <span class="t">进行中项目</span>
                            <span class="num">{{sum.project}}</span>
                        </li>
                        <li>
                            <span class="t">在用坐席</span>
                            <span class="num">{{sum.seat}}</span>
                        </li>
                    </ul>
                    <router-link v-else to="/customer/add" class="btn blue btn-export">
                        <span>
                            <i class="icon add"></i>新建客户
                        </span>
                    </router-link>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>客户名称</th>
                                <th v-if="authType==1&&!agent.id">所属代理</th>
                                <th>类型</th>
                                <th>创建日期</th>
                                <th>状态</th>
                                <th v-if="authType==1">进行中的项目</th>
                                <th v-if="authType==1">现有坐席</th>
                                <th>余额</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>
                                    <a href="#">{{item.company}}</a>
                                </td>
                                <td v-if="authType==1&&!agent.id">
                                    <a href="javascript:void(0);" @click="chooseAgent(item.superior_id,item.agent_name)">{{item.agent_name}}</a>
                                </td>
                                <td>{{item.type}}</td>
                                <td>{{item.created_at}}</td>
                                <td v-if="item.audit_status==1">通过</td>
                                <td v-else-if="item.audit_status==2" class="red">未通过</td>
                                <td v-else>待审核</td>
                                <td v-if="authType==1">{{item.conduct_project}}</td>
                                <td v-if="authType==1">{{item.seat_num}}</td>
                                <td>¥{{item.balance}}</td>
                                <td v-if="authType==1">
                                    <router-link v-if="item.audit_status==2" :to="'/customer/add/' + item.id">审核</router-link>
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
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
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
    import typeSelect from './typeSelect'
    import statusSelect from './statusSelect'
    import agentSelect from './agentSelect'
    import editDialog from './dialog/changeInfo'
    import resetPassDialog from 'components/dialog/resetpass'
    import addSeatDialog from './dialog/addSeat'
    import rechargeDialog from './dialog/recharge'
    let user = JSON.parse(localStorage.getItem('user'))
    export default {
        data: function () {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1,
                user: '',
                sum: {
                    customer: '',
                    project: '',
                    seat: ''
                },
                authType: user.type,
                agent: {
                    id: '',
                    name: ''
                }
            }
        },
        computed: {
            type: function () {
                return this.$refs.typeSelect ? this.$refs.typeSelect.type.id : ''
            },
            status: function () {
                return this.$refs.statusSelect ? this.$refs.statusSelect.selected.id : ''
            }
        },
        components: {
            pages,
            typeSelect,
            statusSelect,
            agentSelect,
            editDialog,
            resetPassDialog,
            addSeatDialog,
            rechargeDialog
        },
        methods: {
            refresh() {
                let _this = this
                let page = this.$route.params.page
                let api = user.type == 1 ? API.customer_list_by_operate : API.customer_list
                page = page ? page : 1
                mAjax(this, {
                    url: api,
                    data: {
                        page: page,
                        company: _this.user,
                        type: _this.type,
                        audit_status: _this.status
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            let list = data.data
                            if (user.type == 1) {
                                _this.sum = {
                                    customer: list.customer_num,
                                    project: list.conduct_project,
                                    seat: list.seat_num
                                }
                                _this.list = list.customer.data
                            } else {
                                _this.list = list.data
                            }

                            _this.totalPage = Math.ceil(_this.list.total / _this.list.per_page)
                            _this.currentPage = page
                        } else {
                            _this.list = ''
                        }
                    }
                })
            },
            jump(num) {
                this.$router.replace('/customer/index/' + num)
                this.refresh()
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
            chooseAgent(id,name){
                console.log(id)
                this.agent = {
                    id:id,
                    name:name
                }
                this.refresh()
            }
        },
        created: function () {
            this.refresh()
        }
    }

</script>