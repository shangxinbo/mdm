<template>
    <div class="warp" style="width:100%;padding:0">
        <div class="main">
            <div class="data-errors">
                <div class="data-error">
                    <p class="num">
                        <span>{{code}}</span>
                    </p>
                    <p class="tips">{{msg}}</p>
                </div>
                <p class="bg">
                    <img :src="bg">
                </p>
                <div class="data-search">
                    <router-link to="/">
                        <button class="btn green" type="button">返回首页</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import bg from 'assets/img/error-bg.jpg'
    export default {
        data: function () {
            return {
                bg: bg
            }
        },
        computed: {
            code: function () {
                let code = this.$route.query.code
                return code ? code : 500
            },
            msg: function () {
                let msg = this.$route.query.msg
                switch (this.code) {
                    case '404':
                        return '页面未找到'
                    case '403':
                        return '您的访问不被允许'
                    case '500':
                        return '程序未知错误'
                    default:
                        return msg ? msg : ''
                }
            }
        }
    }

</script>