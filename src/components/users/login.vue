<style lang="less">
    @import '../../assets/less/login.less';
</style>
<template>
    <div @keyup.enter="submit">
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
        data: () => {
            return {
                logo: logo,
                username: '',
                password: '',
                error: ''
            }
        },
        components: {
            mfooter
        },
        methods: {
            submit: function () {
                if (!this.username) {
                    this.error = "请输入您的用户名!"
                    return false
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
                            if (data.data.modify_status) {
                                vm.$router.replace('/')
                            }else{
                                vm.$router.push('/initpass')
                            }
                        } else {
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