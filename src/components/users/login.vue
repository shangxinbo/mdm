<style lang="less">
    @import '../../assets/less/login.less';
</style>
<template>
    <div>
        <div class="login-img"></div>
        <div class="login-warp">
            <div class="login-panel">
                <h1>
                    <img :src="logo" />
                </h1>
                <div class="login-from">
                    <ul>
                        <li class="in">
                            <span>账号</span>
                            <input class="login-text" type="text" autocomplete="off" v-model="username" />
                        </li>
                        <li class="in">
                            <span>密码</span>
                            <input class="login-text" type="password" autocomplete="off" v-model="password" />
                        </li>
                        <li class="error" v-show="error">
                            <p class="error">{{error}}</p>
                        </li>
                        <li class="button">
                            <button type="button" @click="submit">登录</button>
                        </li>
                    </ul>
                </div>
            </div>
            <mfooter></mfooter>
        </div>
    </div>
</template>
<script>
    import logo from 'assets/img/logo-login.png'
    import mfooter from 'components/common/footer.vue'
    import API from 'src/services/api'
    import { mAjax } from 'src/services/functions'
    export default {
        data:() =>{
            return {
                logo : logo,
                username: '',
                password: '',
                error: ''
            } 
        },
        components:{
            mfooter
        },
        methods: {
            submit: function () {
                let reg = /^[a-zA-z0-9]{6,16}$/
                if (!this.username) {
                    this.error = "请输入您的用户名!"
                    return false
                } else {
                    if (!reg.test(this.username)) {
                        this.error = '用户名需是大小写英文字符和数字6~16位组成'
                        return false
                    }
                }
                if (!this.password) {
                    this.error = "请输入您的密码!"
                    return false
                }
                let vm = this
                mAjax(vm, {
                    url: API.login,
                    data: {
                        username: vm.username,
                        password: vm.password
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            this.error = ''
                            localStorage.setItem('user', JSON.stringify(data.data))
                            vm.$router.push('/')
                                
                        }else{
                            vm.error = data.message
                        }
                    },
                    error: function (err) {
                        vm.error = err
                    }
                })
            }
        }
    }
</script>