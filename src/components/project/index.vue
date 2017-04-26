<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp" v-if="userType==4">我的项目</div>
            <div class="title-warp" v-else>{{ customer_name ? customer_name + '的项目' : (agent_name?agent_name + '的项目':'项目管理') }}</div>
            <div class="data-property">
                <searchForm :userType="userType" @submit="search"></searchForm>
                <dataSum v-if="userType==1&&list.length>0" :data="sum"></dataSum>
                <seatData v-if="userType==3" @getSeatNum="setMySeat"></seatData>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th width="10%">项目名称</th>
                                <th width="10%" v-if="!customer_id&&userType==1">客户名称</th>
                                <th width="10%" v-if="!agent_id&&!customer_id&&userType==1">所属代理</th>
                                <th width="5%">类型</th>
                                <th width="10%">创建日期</th>
                                <th width="5%">状态</th>
                                <th width="5%">线索量</th>
                                <th width="5%">剩余线索</th>
                                <th width="5%">拨通线索</th>
                                <th width="5%">有效率</th>
                                <th width="7%">通话时长</th>
                                <th width="7%">剩余时间</th>
                                <th width="6%" v-if="userType!=4">项目坐席</th>
                                <th width="10%">操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>
                                    <span v-if="userType==4">{{item.name}}</span>
                                    <router-link :to="'/project/detail/'+item.id" v-else>{{item.name}}</router-link>
                                </td>
                                <td v-if="!customer_id&&userType==1">
                                    <router-link :to="{query:{customer_id:item.client_id,customer_name:item.client_name}}">{{item.client_name}}</router-link>
                                </td>
                                <td v-if="!agent_id&&!customer_id&&userType==1">
                                    <router-link :to="{query:{agent_id:item.agency_id,agent_name:item.agency}}">{{item.agency}}</router-link>
                                </td>
                                <td>{{item.project_type}}</td>
                                <td>{{item.created_at.substr(0,10)}}</td>
                                <td :style="{color:item.audit_status==-1?'red':''}">{{item.project_status}}
                                    <span v-if="item.audit_status==-3" @mouseover="showReason" @mouseout="hideReason" class="notice">
                                        <i class="icon tips"></i><em>{{item.audit_reason}}</em>
                                    </span>
                                </td>
                                <td>{{item.status==1||item.status==3||item.status==2 ? item.clue_num:'--'}}</td>
                                <td>{{item.clue_odd_num?item.clue_odd_num:'--'}}</td>
                                <td>{{item.clue_connect_num?item.clue_connect_num:'--'}}</td>
                                <td>{{item.clue_valid_percent?item.clue_valid_percent + '%':'--'}}</td>
                                <td>{{item.call_time&&(item.status==1||item.status==3) ? item.call_time:'--'}}</td>
                                <td>{{item.odd_time?item.odd_time:'--'}}</td>
                                <td v-if="userType!=4">{{item.project_seat_num?item.project_seat_num:'--'}}</td>
                                <td v-if="userType==1">
                                    <router-link v-if="item.audit_status==-1" :to="'/project/detail/' + item.id">审核</router-link>
                                    <a v-if="item.status==1" href="javascript:void(0);" @click="stop(item.id)">暂停</a>
                                    <a v-if="item.status==2" href="javascript:void(0);" @click="start(item.id)">开启</a>
                                </td>
                                <td v-else-if="userType==4">
                                    <router-link v-if="item.status==1" :to="'/project/call/?id='+ item.id +'&projectName=' + item.name ">外呼</router-link>
                                    <router-link v-else :to="'/project/call/?id='+ item.id +'&projectName=' + item.name + '&clue_status=1&end=1'">查看</router-link>
                                </td>
                                <td v-else>
                                    <router-link v-if="item.audit_status==-3" :to="'/project/add/' + item.id">重新申请</router-link>
                                    <a v-if="item.status==1&&myseatNum>0" href="javascript:void(0);" @click="assignSeat(item.id,item.name)">分配坐席</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
        <confirm ref="confirm"></confirm>
        <alert ref="alert"></alert>
        <chooseSeatDialog ref="chooseSeatDialog"></chooseSeatDialog>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import confirm from 'components/dialog/confirm'
    import alert from 'components/dialog/alert'
    import chooseSeatDialog from './dialog/chooseSeat'
    import searchForm from './searchForm'
    import dataSum from './dataSum'
    import seatData from './seat'

    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                list: [],
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                agent_id: '',
                agent_name: '',
                customer_id: '',
                customer_name: '',
                sum: {},
                myseatNum:0
            }
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.agent_id = this.$route.query.agent_id
                this.agent_name = this.$route.query.agent_name
                this.customer_id = this.$route.query.customer_id
                this.customer_name = this.$route.query.customer_name
                this.refresh()
            },
            refresh() {
                let projectName = this.$route.query.projectName
                let customerId = this.$route.query.customerId
                let agentId = this.$route.query.agentId
                let statusId = this.$route.query.statusId
                let startTime = this.$route.query.startTime
                let endTime = this.$route.query.endTime
                mAjax(this, {
                    url: API.project_list,
                    data: {
                        nums: 10,
                        page: this.currentPage,
                        search_project_name: projectName ? projectName : '',
                        search_client_id: this.customer_id ? this.customer_id : customerId,
                        search_agency_id: this.agent_id ? this.agent_id : agentId,
                        search_project_status: statusId,
                        search_project_begin_time: startTime ? startTime : '',
                        search_project_end_time: endTime ? endTime : ''
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            this.list = data.data.data
                            this.sum = data.data.count
                            this.totalPage = Math.ceil(data.data.page.total / 10)
                        } else {
                            this.$refs.alert.$emit('show', data.message)
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
            stop(id) {
                let _this = this
                this.$refs.confirm.$emit('show', '是否要暂停该项目', function () {
                    mAjax(_this, {
                        url: API.project_stop,
                        data: {
                            id: id
                        },
                        success: data => {
                            if (data.code == 200)
                                _this.$refs.alert.$emit('show', '已成功暂停', function () {
                                    _this.refresh()
                                })
                            else
                                _this.$store.commit('SHOW_TOAST', data.message)
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
                            if (data.code == 200)
                                _this.$refs.alert.$emit('show', '已成功开启', function () {
                                    _this.refresh()
                                })
                            else
                                _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    })
                })
            },
            assignSeat(id, name) {
                this.$refs.chooseSeatDialog.$emit('show', id, name)
            },
            showReason(evt) {
                evt.currentTarget.querySelector('em').style.display = 'block'
            },
            hideReason(evt) {
                evt.currentTarget.querySelector('em').style.display = 'none'
            },
            setMySeat(num){
                this.myseatNum = num
            }
        },
        created() {
            this.init()
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        components: {
            pages,
            confirm,
            alert,
            chooseSeatDialog,
            searchForm,
            dataSum,
            seatData
        }
    }

</script>