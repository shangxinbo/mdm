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
    let user = JSON.parse(localStorage.getItem('user'))
    export default {
        data: function () {
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
            if (user.type == 4) {
                mAjax(_this, {
                    url: API.get_seat_sign,
                    success: data => {
                        let info = data.data
                        window.mycomm_agent.on_login_s = function (evt) {
                            _this.$store.commit('RESET_CALLINFO', info)
                        }
                        window.mycomm_agent.on_login_f = function (evt) {
                            _this.$refs.alert.$emit('show', '登录外呼平台异常，外呼功能咱不能使用')
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