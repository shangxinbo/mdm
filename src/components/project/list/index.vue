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
                <mtable :list="list">
                    <template scope="props">
                        <td width="10%" label="项目名称">
                            <span v-if="userType==4">{{props.item.name}}</span>
                            <router-link :to="'/project/detail/'+props.item.id" v-else>{{props.item.name}}</router-link>
                        </td>
                        <td width="10%" label="客户名称" v-if="!customer_id&&userType==1">
                            <router-link :to="{query:{customer_id:props.item.client_id,customer_name:props.item.client_name}}">{{props.item.client_name}}</router-link>
                        </td>
                        <td width="5%" label="类型">{{props.item.project_type}}</td>
                        <td width="5%" label="状态" :style="{color:props.item.audit_status==-1?'red':''}">
                            {{props.item.project_status}}
                            <span v-if="props.item.audit_status==-3" @mouseover="showReason" @mouseout="hideReason" class="notice">
                                <i class="icon tips"></i>
                                <em>{{props.item.audit_reason}}</em>
                            </span>
                        </td>
                        <td width="5%" label="资源总量">{{props.item.status==1||props.item.status==3||props.item.status==2 ? props.item.clue_num:'--'}}</td>
                        <td width="5%" label="未分配">{{props.item.undistributed}}</td>
                        <td width="5%" label="未拨打">{{props.item.clue_odd_num?props.item.clue_odd_num:'--'}}</td>
                        <td width="5%" label="已拨通">{{props.item.clue_connect_num?props.item.clue_connect_num:'--'}}</td>
                        <td width="5%" label="拨通率">{{props.item.clue_valid_percent?props.item.clue_valid_percent + '%':'--'}}</td>
                        <td width="7%" label="通话时长">{{props.item.call_time&&(props.item.status==1||props.item.status==3) ? props.item.call_time:'--'}}</td>
                        <td width="7%" label="剩余时间">{{props.item.odd_time?props.item.odd_time:'--'}}</td>
                        <td width="6%" label="项目坐席" v-if="userType!=4">{{props.item.project_seat_num?props.item.project_seat_num:'--'}}</td>
                        <td width="6%" label="挂机短信" v-if="userType!=4">
                            <router-link v-if="userType==1" :to="{path:'/project/sms/list',query:{project:props.item.id,client:props.item.client_id}}">{{props.item.hangUpSms}}</router-link>
                            <span v-else>{{props.item.hangUpSms}}</span>
                        </td>
                        <td width="6%" label="留资" v-if="userType==1">
                            <router-link :to="{path:'/project/leftinfo',query:{project:props.item.id}}">{{props.item.leftInfo}}</router-link>
                        </td>
                        <td width="10%" label="操作">
                            <template v-if="userType==1">
                                <router-link v-if="props.item.audit_status==-1" :to="'/project/detail/' + props.item.id">审核</router-link>
                                <a v-if="props.item.status==1&&props.item.audit_status==-2" href="javascript:void(0);" @click="stop(props.item.id)">暂停</a>
                                <a v-if="props.item.status==2" href="javascript:void(0);" @click="start(props.item.id)">开启</a>
                                <a v-if="props.item.status==1&&props.item.audit_status==-2&&props.item.client_is_hang_up_message==1&&props.item.is_hang_up_message==0" href="javascript:void(0);" @click="useSms(props.item.id,props.item.name)">使用挂机短信</a>
                            </template>
                            <template v-else-if="userType==4">
                                <router-link v-if="props.item.status==1" :to="{path:'/project/call/nodial',query:{project_id:props.item.id,projectName:props.item.name,sms:props.item.client_is_hang_up_message&&props.item.is_hang_up_message}}">外呼</router-link>
                                <router-link v-else :to="{path:'/project/call/enddial',query:{project_id:props.item.id,projectName:props.item.name,end:1,sms:props.item.client_is_hang_up_message==1&&props.item.is_hang_up_message==1}}">查看</router-link>
                            </template>
                            <template v-else>
                                <router-link v-if="props.item.audit_status==-3" :to="'/project/add/' + props.item.id">重新申请</router-link>
                                <a v-if="props.item.status==1&&myseatNum>0&&props.item.clue_odd_num>0" href="javascript:void(0);" @click="assignSeat(props.item.id,props.item.name,props.item.undistributed)">分配线索</a>
                                <a v-if="props.item.status==1&&myseatNum>0&&props.item.have_nodial_clues" href="javascript:void(0);" @click="recoverClues(props.item.id)">回收线索</a>
                            </template>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
        <saveByOptional ref="optSaveDialog" @success="saveSuccess"></saveByOptional>
        <chooseSeatDialog ref="chooseSeatDialog"></chooseSeatDialog>
        <recoveryCluesDialog ref="recoveryCluesDialog"></recoveryCluesDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import chooseSeatDialog from '../dialog/chooseSeat'
    import recoveryCluesDialog from '../dialog/recovery'
    import searchForm from './searchForm'
    import dataSum from './dataSum'
    import seatData from './seat'
    import saveByOptional from '../create/save_optional'
    import mtable from 'components/utils/table'

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
                myseatNum: 0
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
                this.$ajax({
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
                            if (data.data.data.length > 0) {
                                sessionStorage.setItem('client_id', data.data.data[0].client_id) //给坐席备份下客户id
                            }
                        } else {
                            this.$toast(data.message)
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
                this.$confirm('是否要暂停该项目', () => {
                    this.$ajax({
                        url: API.project_stop,
                        data: {
                            id: id
                        },
                        success: data => {
                            if (data.code == 200)
                                this.$toast('已成功暂停', () => this.refresh())
                            else
                                this.$toast(data.message)
                        }
                    })
                })
            },
            start(id) {
                this.$confirm('是否要开启该项目', () => {
                    this.$ajax({
                        url: API.project_start,
                        data: {
                            id: id
                        },
                        success: data => {
                            if (data.code == 200)
                                this.$toast('已成功开启', () => this.refresh())
                            else
                                this.$toast(data.message)
                        }
                    })
                })
            },
            useSms(id, name) {
                this.$confirm(`确定${name}要使用挂机短信?`, () => {
                    this.$ajax({
                        url: API.project_set_sms,
                        data: {
                            project_id: id
                        },
                        success: data => {
                            if (data.code == 200) {
                                this.$toast('开启成功', () => window.location.reload())
                            } else {
                                this.$toast(data.message)
                            }
                        }
                    })
                })
            },
            assignSeat(id, name, clue) {
                this.$refs.chooseSeatDialog.$emit('show', id, name, clue)
            },
            recoverClues(id) {
                this.$refs.recoveryCluesDialog.$emit('show', id)
            },
            showReason(evt) {
                evt.currentTarget.querySelector('em').style.display = 'block'
            },
            hideReason(evt) {
                evt.currentTarget.querySelector('em').style.display = 'none'
            },
            setMySeat(num) {
                this.myseatNum = num
            },
            resend(id) {
                this.$refs.optSaveDialog.$emit('show', id)
            },
            saveSuccess() {
                this.$toast('项目已经提交审核', () => {
                    window.location.reload()
                })
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
            chooseSeatDialog,
            searchForm,
            dataSum,
            seatData,
            saveByOptional,
            recoveryCluesDialog,
            mtable
        }
    }

</script>