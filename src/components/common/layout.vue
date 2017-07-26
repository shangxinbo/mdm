<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div>
        <mheader></mheader>
        <mnav></mnav>
        <router-view></router-view>
        <mfooter></mfooter>
        <changeMyPass></changeMyPass>
        <callSet></callSet>
        <balanceAlert v-if="userType==3"></balanceAlert>
        <div id="shadowLayer" v-if="layer"></div>
        <alert ref="alert"></alert>
        <confirm ref="confirm"></confirm>
        <toast ref="toast"></toast>
    </div>
</template>
<script>
    import Vue from 'vue'
    import mheader from 'components/common/header.vue'
    import mfooter from 'components/common/footer.vue'
    import mnav from 'components/common/nav.vue'
    import alert from 'components/utils/alert'
    import confirm from 'components/utils/confirm'
    import toast from 'components/utils/toast'
    import changeMyPass from 'components/dialog/changeMyPass'
    import balanceAlert from 'components/customer/dialog/balanceAlert'
    import callSet from 'components/dialog/callSet'
    import API from 'src/services/api'
    import { getCookie } from 'src/services/functions'

    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                userType: user.type
            }
        },
        computed: {
            layer() {
                return this.$store.state.showLayer
            }
        },
        components: {
            mheader,
            mfooter,
            mnav,
            changeMyPass,
            balanceAlert,
            callSet,
            alert,
            confirm,
            toast
        },
        created() {

            let _this = this

            Vue.prototype.$alert = (msg, callback) => {
                _this.$refs.alert.show(msg, callback)
            }
            Vue.prototype.$confirm = (msg, callback) => {
                _this.$refs.confirm.show(msg, callback)
            }
            Vue.prototype.$toast = (msg, callback, timer) => {
                _this.$refs.toast.show(msg, callback, timer)
            }

            if (this.userType == 1) {
                let user = JSON.parse(localStorage.getItem('user'))
                this.$ajax({
                    url: API.get_operate_info,
                    data: {
                        id: user.id
                    },
                    success: data => {
                        if (data.data.rule) {
                            let arr = data.data.rule.split(',')
                            user.rule = data.data.rule
                            localStorage.setItem('user', JSON.stringify(user))
                            this.$store.commit('CHANGE_POWER', arr)
                        }
                    }
                })
            }

            if (this.userType == 4) {
                this.$ajax({
                    url: API.get_seat_sign,
                    success: data => {
                        let info = data.data
                        this.$store.commit('RESET_CALLINFO', info)
                    },
                    error: err => {
                        this.error = err.message
                    }
                })

                this.$store.commit('SET_TEL_PREFIX', null)

            }
        }
    }

</script>