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

                                //坐席登录外呼中心
                                if (data.data.type == 4) {
                                    mAjax(vm, {
                                        url: API.get_seat_sign,
                                        success: data => {
                                            let info = data.data
                                            window.mycomm_agent.on_login_s = function (evt) {
                                                console.log(info)
                                                vm.$store.commit('RESET_CALLINFO', info)
                                            }
                                            window.mycomm_agent.on_login_f = function (evt) {
                                                vm.$store.commit('SHOW_TOAST', '登录外呼平台异常：' + evt.params.err_desc)
                                            }
                                            window.mycomm_agent.login(info.cti_server, info.agent_id.toString(), info.password, info.queue, info.is_leader, info.org_id, info.agent_name, info.work_id.toString(), info.agent_type)
                                        },
                                        error: err => {
                                            vm.error = data.message
                                        }
                                    })
                                }
                            } else {
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