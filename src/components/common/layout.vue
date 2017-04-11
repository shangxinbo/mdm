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
    let user = JSON.parse(localStorage.getItem('user'))
    export default {
        data:function(){
            return {
                userType:user.type
            }
        },
        computed:{
            layer:function(){
                return this.$store.state.showLayer
            }
        },
        components:{
            mheader,
            mfooter,
            mnav,
            toast,
            changeMyPass,
            balanceAlert,
            callSet
        }
    }
</script>