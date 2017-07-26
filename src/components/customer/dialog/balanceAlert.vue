<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <div class="dialog-body">
            <div class="pop-default nop10">
                <p class="title">
                    <span>
                        <i class="icon tips"></i>您的余额不足，请尽快联系相关人员进行充值,以免影响您的正常使用</span>
                </p>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="btn blue" type="button" @click="close">关闭</button>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    export default {
        data() {
            return {
                style: 'none'
            }
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            }
        },
        created() {
            let balanceAlert = sessionStorage.getItem('balanceAlert')
            if (!balanceAlert) {
                this.$ajax({
                    url: API.customer_alarm,
                    success: data => {
                        if (data.code == 200) {
                            if (data.data.warning) {
                                this.style = 'block'
                                this.$store.commit('SHOW_LAYER')
                                sessionStorage.setItem('balanceAlert', true)
                            }
                        }
                    }
                })
            }
        }
    }

</script>