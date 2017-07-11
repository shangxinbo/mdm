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
    </div>
</template>
<script>
    import mheader from 'components/common/header.vue'
    import mfooter from 'components/common/footer.vue'
    import mnav from 'components/common/nav.vue'
    import changeMyPass from 'components/dialog/changeMyPass'
    import balanceAlert from 'components/customer/dialog/balanceAlert'
    import callSet from 'components/dialog/callSet'
    import API from 'src/services/api'
    import { mAjax, getCookie } from 'src/services/functions'

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
            callSet
        },
        created() {
            
            if (this.userType == 1) {
                let user = JSON.parse(localStorage.getItem('user'))
                mAjax(this, {
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
                mAjax(this, {
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