<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{agent_name?agent_name+'的客户':'客户管理'}}</div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">客户名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="search_name" type="text">
                            </div>
                        </li>
                        <li v-if="!agent_id&&userType==1">
                            <label class="name">所属代理</label>
                            <mselect ref="agentSelect" :api="api.agentSelect" :id="search_agent"></mselect>
                        </li>
                        <li>
                            <label class="name">客户类型</label>
                            <mselect ref="typeSelect" :api="api.typeSelect" :id="search_customer"></mselect>
                        </li>
                        <li>
                            <label class="name">客户状态</label>
                            <mselect ref="statusSelect" :initlist="api.statusSelect" :id="search_status"></mselect>
                        </li>
                        <li>
                            <button class="btn blue" type="button" @click="search()">
                                <span>
                                    <i class="icon search"></i>查询
                                </span>
                            </button>
                        </li>
                    </ul>
                </form>
                <div class="data-export">
                    <ul v-if="userType==1">
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
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>客户名称</th>
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
                                    <router-link v-if="item.audit_status==2" :to="'/customer/check/' + item.id">审核</router-link>
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
    import editDialog from './dialog/changeInfo'
    import resetPassDialog from 'components/dialog/resetpass'
    import addSeatDialog from './dialog/addSeat'
    import rechargeDialog from './dialog/recharge'
    import mselect from 'components/utils/select'
    let user = JSON.parse(localStorage.getItem('user'))
    export default {
        data: function () {
            return {
                list: [],
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                sum: {
                    customer: '',
                    project: '',
                    seat: ''
                },
                agent_id: '',
                agent_name: '',
                search_name: '',
                search_customer: '',
                search_agent: '',
                search_status: '',
                api: {
                    agentSelect: API.angent_list_all,
                    typeSelect: API.customer_type_list,
                    statusSelect: {
                        "0": "待审核",
                        "1": "通过",
                        "2": "未通过"
                    }
                }
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
            mselect,
            resetPassDialog,
            addSeatDialog,
            rechargeDialog
        },
        methods: {
            init() {
                this.search_name = this.$route.query.search_name
                this.search_customer = this.$route.query.search_customer
                this.search_agent = this.$route.query.search_agent
                this.search_status = this.$route.query.search_status
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.agent_id = this.$route.query.agent_id
                this.agent_name = this.$route.query.agent_name
                this.refresh()
            },
            refresh() {
                let _this = this
                let api = this.userType == 1 ? API.customer_list_by_operate : API.customer_list
                mAjax(this, {
                    url: api,
                    data: {
                        page: _this.currentPage,
                        company: _this.search_name,
                        type: _this.search_customer,
                        audit_status: _this.search_status,
                        superior_id: _this.agent_id ? _this.agent_id : _this.search_agent
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
                                _this.totalPage = Math.ceil(list.customer.total / list.customer.per_page)
                            } else {
                                _this.list = list.data
                                _this.totalPage = Math.ceil(list.total / list.per_page)
                            }
                        } else {
                            _this.list = ''
                            _this.totalPage = 1
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
                let search_agent = this.$refs.agentSelect ? this.$refs.agentSelect.selected.id : ''
                let search_customer = this.$refs.typeSelect ? this.$refs.typeSelect.selected.id : ''
                let search_status = this.$refs.statusSelect ? this.$refs.statusSelect.selected.id : ''
                let search_name = this.search_name
                let query = Object.assign({}, this.$route.query, {
                    search_name: search_name,
                    search_customer: search_customer,
                    search_agent: search_agent,
                    search_status: search_status,
                    page: 1
                })
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
            showReason(evt){
                evt.currentTarget.querySelector('em').style.display = 'block'
            },
            hideReason(evt){
                evt.currentTarget.querySelector('em').style.display = 'none'
            }
        },
        created: function () {
            this.init()
        }
    }

</script>