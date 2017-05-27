<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div>
        <mheader></mheader>
        <mnav></mnav>
        <router-view></router-view>
        <mfooter></mfooter>
        <toast></toast>
        <changeMyPass></changeMyPass>
        <callSet></callSet>
        <alert ref="alert"></alert>
        <balanceAlert v-if="userType==3"></balanceAlert>
        <div id="shadowLayer" v-if="layer"></div>
    </div>
</template>
<script>
    import mheader from 'components/common/header.vue'
    import mfooter from 'components/common/footer.vue'
    import mnav from 'components/common/nav.vue'
    import toast from 'components/dialog/toast'
    import alert from 'components/dialog/alert'
    import confirm from 'components/dialog/confirm'
    import changeMyPass from 'components/dialog/changeMyPass'
    import balanceAlert from 'components/customer/dialog/balanceAlert'
    import callSet from 'components/dialog/callSet'
    import API from 'src/services/api'
    import { mAjax } from 'src/services/functions'

    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                userType: user.type
            }
        },
        computed: {
            layer: function () {
                return this.$store.state.showLayer
            }
        },
        components: {
            mheader,
            mfooter,
            mnav,
            toast,
            alert,
            changeMyPass,
            balanceAlert,
            callSet
        },
        created: function () {
            let _this = this
            //坐席登录外呼中心 start
            if (this.userType == 4) {
                mAjax(_this, {
                    url: API.get_seat_sign,
                    success: data => {
                        let info = data.data
                        _this.$store.commit('RESET_CALLINFO', info)
                        window.mycomm_agent.on_login_s = function (evt) {
                            //_this.$store.commit('RESET_CALLINFO', info)
                        }
                        window.mycomm_agent.on_login_f = function (evt) {
                            let msg = '服务暂不可用，请联系管理员'
                            switch(evt.params.err_num){
                            case 404: 
                                msg = 'IP电话/软电话/分机没有注册，请根据IP电话机内置说明书进行配置，如有疑问请联系管理员'
                                break
                            case 409: 
                                msg = '该分机已经被其他坐席使用，请联系管理员'
                                break
                            case 503: 
                                msg = '服务暂不可用，请联系管理员'
                                break
                            default:
                                msg = '服务暂不可用，请联系管理员'
                            }
                            _this.$refs.alert.$emit('show', msg)
                        }
                        
                        window.mycomm_agent.set_wrap_up_time(0)
                        window.mycomm_agent.login(info.cti_server, info.agent_id.toString(), info.password, info.queue, info.is_leader, info.org_id, info.agent_name, info.work_id.toString(), info.agent_type)
                    },
                    error: err => {
                        _this.error = err.message
                    }
                })
            }
            //坐席登录外呼中心 end
        }
    }

</script>