<template>
    <div class="header">
        <ul class="header-content">
            <li @click.stop="slideDown" :class="{'li-hover':show}">
                <i class="icon login-icon"></i>
                <div class="quit" @click.stop>
                    <p :title="username">{{username.length>9? username.substr(0,6)+'…':username}}</p>
                    <router-link to="/agent/index" class="my" v-if="type==1">
                        <i class="icon icon05"></i>
                        <span>代理管理</span>
                    </router-link>
                    <router-link to="/user/myself" class="my" v-if="type==3">
                        <i class="icon icon03"></i>
                        <span>我的账号</span>
                    </router-link>
                    <router-link to="/user/myinfo" class="my" v-if="type==2">
                        <i class="icon icon03"></i>
                        <span>我的账号</span>
                    </router-link>
                    <router-link to="/user/myseat" class="my" v-if="type==3">
                        <i class="icon icon04"></i>
                        <span>我的坐席</span>
                    </router-link>
                    <a href="javascript:void(0);" @click.stop="showChangeMyPassDialog()" class="edit">
                        <i class="icon icon01"></i>
                        <span>修改密码</span>
                    </a>
                    <a href="javascript:void(0)" @click="logout">
                        <i class="icon icon02"></i>
                        <span>退 出</span>
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import Vue from 'vue'
    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                username: user.user_name,
                show: false,
                type: user.type
            }
        },
        methods: {
            slideDown: function () {
                this.show = true
            },
            slideUp: function () {
                this.show = false
            },
            logout: function () {
                this.show = false
                let _this = this
                mAjax(this, {
                    url: API.logout,
                    success: function (data) {
                        localStorage.removeItem('user')
                        _this.$router.push('/login')
                    },
                    error: function (err) {
                        _this.error = err
                    }
                })
            },
            showChangeMyPassDialog() {
                this.slideUp()
                this.$store.commit('SHOW_CHANGEPASS')
            }
        },
        created: function () {
            let _this = this
            Vue.nextTick(function () {
                document.addEventListener('click', function () {
                    _this.slideUp()
                })
            })
            this.$router.afterEach(route => {
                _this.slideUp()
            })
        }
    }

</script>