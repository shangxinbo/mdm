<template>
    <div class="header">
        <slot></slot>
        <ul class="header-content">
            <li @click.stop="slideDown" class="user-name" :class="{'li-hover':show}">
                <i class="icon login-icon"></i>
                <span v-if="type!=3" class="name">{{type|typeText}}</span>
                <div class="quit" @click.stop>
                    <p :title="user">{{user.length>9? user.substr(0,6)+'…':user}}</p>
                    <router-link to="/agent/index" class="my" v-if="type==1&&yunying_role[5]">
                        <i class="icon icon05"></i>
                        <span>代理管理</span>
                    </router-link>
                    <router-link to="/user/cusmy" class="my" v-if="type==3">
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
                    <a :href="downloadApi + '?type=' + type" class="edit" v-if="type!=0" @click.stop="slideUp()">
                        <i class="icon icon07"></i>
                        <span>操作手册</span>
                    </a>
                    <a href="javascript:void(0)" class="edit" v-if="type==4" @click.stop="showCallSet()">
                        <i class="icon icon06"></i>
                        <span>通话设置</span>
                    </a>
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
    import API from 'src/services/api'
    import Vue from 'vue'
    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                username: user.user_name,
                user: user.user,
                show: false,
                type: user.type,
                downloadApi: API.doc_download
            }
        },
        computed: {
            yunying_role() {
                return this.$store.state.yunying_role
            }
        },
        filters: {
            typeText(val) {
                switch (val) {
                    case '0': return '管理员'
                    case '1': return '运营'
                    case '2': return '代理'
                    case '4': return '坐席'
                    default: return ''
                }
            }
        },
        methods: {
            slideDown() {
                this.show = true
            },
            slideUp() {
                this.show = false
            },
            logout() {
                this.show = false

                this.$ajax({
                    url: API.logout,
                    success: data => {
                        localStorage.removeItem('user')
                        sessionStorage.clear()
                        window.location.reload()
                    },
                    error: err => {
                        this.error = err
                    }
                })
            },
            showChangeMyPassDialog() {
                this.slideUp()
                this.$store.commit('SHOW_CHANGEPASS')
            },
            showCallSet() {
                this.slideUp()
                this.$store.commit('SHOW_CALL_SET')
            }
        },
        created() {
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