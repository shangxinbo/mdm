<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{detail.name}}</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text data-view">
                        <li v-if="userType!=3">
                            <label class="name">客户名称</label>
                            <div class="input-warp">
                                <p class="text">{{detail.client_name}}</p>
                            </div>
                        </li>
                        <li v-if="userType!=3">
                            <label class="name">所属代理</label>
                            <div class="input-warp">
                                <p class="text">{{detail.agency}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">项目类型</label>
                            <div class="input-warp">
                                <p class="text">{{detail.project_type}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">人群地域</label>
                            <div class="input-warp">
                                <p class="text">{{detail.region}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">预计线索量</label>
                            <div class="input-warp">
                                <p class="text">{{detail.expect_clue_num}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">预计开始时间</label>
                            <div class="input-warp">
                                <p class="text">{{detail.expect_begin_date}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">详细描述</label>
                            <div class="input-warp">
                                <p class="text">{{detail.desc}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">使用挂机短信</label>
                            <div class="input-warp">
                                <p class="text">{{detail.is_hang_up_message==1?'使用':'不使用'}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">项目创建时间</label>
                            <div class="input-warp">
                                <p class="text">{{detail.created_at}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">项目状态</label>
                            <div class="input-warp">
                                <p class="text">{{detail.project_status}}</p>
                            </div>
                        </li>
                        <li class="both" v-if="detail.audit_status==-3">
                            <label class="name">未通过原因</label>
                            <div class="input-warp">
                                <p class="text red">{{detail.audit_reason}}</p>
                            </div>
                        </li>
                        <template v-if="detail.status==1&&detail.audit_status==-2">
                            <li class="both">
                                <label class="name">资源总量</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.clue_num}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">未拨打</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.clue_odd_num}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">已拨通</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.clue_connect_num}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">拨通率</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.clue_valid_percent}}%</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">通话时长</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.call_time}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">剩余时间</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.odd_time}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">项目坐席</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.project_seat_num}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">挂机短信</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.hang_up_message_num}}</p>
                                </div>
                            </li>
                        </template>
                        <li v-if="detail.audit_status==2&&userType==3">
                            <div class="input-warp">
                                <a class="btn blue" href="client-afresh.html">重新申请</a>
                            </div>
                        </li>
                    </ul>
                </form>
                <div class="btn-warp" v-if="detail.audit_status==-1&&userType==1">
                    <a class="btn blue" href="javascript:void(0);" @click="accept(detail.id)">通过</a>
                    <a class="btn red" href="javascript:void(0);" @click="refuse(detail.id)">拒绝</a>
                </div>
                <div class="btn-warp" v-if="detail.audit_status==1&&userType==3">
                    <button class="btn blue" type="button" @click="assignSeat(detail.id,detail.name)">分配坐席</button>
                </div>

            </div>
        </div>
        <refuseDialog ref="refuseDialog"></refuseDialog>
        <chooseSeatDialog ref="chooseSeatDialog"></chooseSeatDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import refuseDialog from './dialog/refuse'
    import chooseSeatDialog from './dialog/chooseSeat'

    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                userType: user.type,
                detail: {
                    id: '',
                    audit_status: 1,
                    name: '',
                    client_name: '',
                    project_type: '',
                    agency: '',
                    region: '',
                    expect_clue_num: '',
                    expect_begin_date: '',
                    desc: '',
                    created_at: '',
                    project_status: '',
                    audit_reason: '',
                    clue_num: '',
                    clue_odd_num: '',
                    clue_connect_num: '',
                    clue_valid_percent: '',
                    call_time: '',
                    odd_time: '',
                    project_seat_num: ''
                }
            }
        },
        components: {
            refuseDialog,
            chooseSeatDialog
        },
        methods: {
            accept(id) {
                this.$confirm('确定要审核通过该项目？', () => {
                    this.$ajax({
                        url: API.preject_audit,
                        data: {
                            id: id,
                            audit_result: -2
                        },
                        success: data => {
                            if (data.code == 200) {
                                this.$toast('已完成审核', () => {
                                    this.$router.replace('/project/index')
                                })
                            } else {
                                this.$toast(data.message)
                            }
                        }
                    })
                })
            },
            refuse(id) {
                this.$refs.refuseDialog.$emit('show', id)
            },
            assignSeat(id, name) {
                this.$refs.chooseSeatDialog.$emit('show', id, name)
            }
        },
        created() {
            let id = this.$route.params.id
            this.$ajax({
                url: API.project_detail,
                data: {
                    id: id
                },
                success: data => {
                    if (data.code == 200) {
                        this.detail = data.data
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
        }
    }

</script>