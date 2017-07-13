<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{render.projectName}}拨打详情</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text seat-text">
                        <li class="li-fl">
                            <div class="fl-in">
                                <label class="name">拨打资源</label>
                                <div class="input-warp">
                                    <p class="text">{{render.tel}}</p>
                                </div>
                            </div>
                            <div class="fl-in">
                                <label class="name">归属地</label>
                                <div class="input-warp">
                                    <p class="text">{{render.city}}</p>
                                </div>
                            </div>
                            <div class="fl-in">
                                <a class="btn blue" @click="dial">
                                    <span>
                                        <i class="icon phone"></i>拨打</span>
                                </a>
                            </div>
                            <div class="fl-in">
                                <a class="btn-sms" href="javascript:void(0);" @click="sms">
                                    <span>
                                        <i class="icon sms"></i>发短信</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <div class="data-export">
                        <ul>
                            <li>
                                <span class="t">已拨打次数</span>
                                <span class="num">{{render.call_num}}</span>
                            </li>
                            <li>
                                <span class="t">称呼</span>
                                <span class="num">{{render.call}}{{render.sex=='男'?'先生':'女士'}}</span>
                            </li>
                        </ul>
                    </div>
                    <clueHistory></clueHistory>
                </div>
            </div>
        </div>
        <smsDialog ref="smsDialog"></smsDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import clueHistory from './clueHistory'
    import smsDialog from '../dialog/sms'
    export default {
        data() {
            return {
                clue_id: '',
                render: {
                    projectId: '',
                    projectName: '',
                    tel: '',
                    city: '',
                    call: '',
                    sex: '',
                    call_num: ''
                }
            }
        },
        created() {
            this.clue_id = this.$route.query.id
            this.render = {
                projectId: this.$route.query.projectId,
                projectName: this.$route.query.projectName,
                tel: this.$route.query.tel,
                city: this.$route.query.city,
                call: this.$route.query.call,
                sex: this.$route.query.sex,
                call_num: this.$route.query.call_num
            }
        },
        methods: {
            sms() {
                let id = this.clue_id
                this.$refs.smsDialog.$emit('show', id)
            },
            dial() {
                let query = Object.assign({}, this.$route.query)
                this.$router.push({
                    path: '/project/dial',
                    query: query
                })
            }
        },
        components: {
            clueHistory,
            smsDialog
        }
    }

</script>