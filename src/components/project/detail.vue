<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{detail.name}}</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text data-view">
                        <li>
                            <label class="name">客户名称</label>
                            <div class="input-warp">
                                <p class="text">{{detail.client_name}}</p>
                            </div>
                        </li>
                        <li>
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
                        <li class="both" v-if="detail.status==-1">
                            <label class="name">未通过原因</label>
                            <div class="input-warp">
                                <p class="text red">{{detail.audit_reason}}</p>
                            </div>
                        </li>
                        <template v-if="detail.status==1||detail.status==2||detail.status==3">
                            <li class="both">
                                <label class="name">线索量</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.clue_num}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">剩余线索</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.clue_odd_num}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">拨通线索</label>
                                <div class="input-warp">
                                    <p class="text">{{detail.clue_connect_num}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">有效率</label>
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
                        </template>
                    </ul>
                </form>
                <div class="btn-warp" v-if="detail.status==-3">
                    <a class="btn blue" href="javascript:void(0);" @click="accept(detail.id)">通过</a>
                    <a class="btn red" href="javascript:void(0);" @click="refuse(detail.id)">拒绝</a>
                </div>
            </div>
        </div>
        <alert ref="alert"></alert>
        <confirm ref="confirm"></confirm>
        <refuseDialog ref="refuseDialog"></refuseDialog>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import confirm from 'components/dialog/confirm'
    import alert from 'components/dialog/alert'
    import refuseDialog from './dialog/refuse'
    export default {
        data: function () {
            return {
                detail: {
                    id: '',
                    status: 1,
                    name: '',
                    client_name: '',
                    agency: '',
                    project_type: '',
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
            confirm,
            alert,
            refuseDialog
        },
        methods: {
            accept(id) {
                let _this = this
                this.$refs.confirm.$emit('show', '确定要审核通过该项目？', function () {
                    mAjax(this, {
                        url: API.preject_audit,
                        data: {
                            id: id,
                            audit_result: 1
                        },
                        success: data => {
                            if (data.code == 200) {
                                _this.$refs.alert.$emit('show', '已完成审核', function () {
                                    _this.$router.replace('/project/index')
                                })
                            }
                        }
                    })
                })
            },
            refuse(id) {
                this.$refs.refuseDialog.$emit('show',id)
            }
        },
        created: function () {
            let id = this.$route.params.id
            mAjax(this, {
                url: API.project_detail,
                data: {
                    id: id
                },
                success: data => {
                    if (data.code == 200) {
                        this.detail = data.data
                    }
                }
            })
        }
    }

</script>