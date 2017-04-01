<template>
    <div>
        <mheader></mheader>
        <mnav></mnav>
        <router-view></router-view>
        <mfooter></mfooter>
        <toast></toast>
        <div id="shadowLayer" v-if="layer"></div>
    </div>
</template>
<script>
    import mheader from 'components/common/header.vue'
    import mfooter from 'components/common/footer.vue'
    import mnav from 'components/common/nav.vue'
    import toast from 'components/dialog/toast'
    export default {
        computed:{
            layer:function(){
                return this.$store.state.showLayer
            }
        },
        components:{
            mheader,
            mfooter,
            mnav,
            toast
        }
    }
</script>