<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-259px','margin-top':'-280px'}">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭" @click="close"></a>
        <div class="dialog-header">
            <h4>修改账号信息</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>账号</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" :value="user" disabled="disabled">
                    </div>
                </li>
                <li>
                    <label>代理名称</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="name">
                        <p v-show="username_error" class="error">{{name_error}}</p>
                    </div>
                </li>
                <li>
                    <label>联系人姓名</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="username">
                        <p v-show="username_error" class="error">{{username_error}}</p>
                    </div>
                </li>
                <li>
                    <label>邮箱</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="email">
                        <p v-show="email_error" class="error">{{email_error}}</p>
                    </div>
                </li>
                <li>
                    <label>手机号</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="tel">
                        <p v-show="tel_error" class="error">{{tel_error}}</p>
                    </div>
                </li>
                <li>
                    <label>归属地</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="addr">
                        <p v-show="addr_error" class="error">{{addr_error}}</p>
                    </div>
                </li>
                <li>
                    <label>所在位置</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="self_addr">
                        <p v-show="self_addr_error" class="error">{{self_addr_error}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="sure">确定</a>
            <a class="btn" href="javascript:void(0);" @click="close">取消</a>
        </div>
    </div>
</template>
<script>
    import { isEmail, isRealPhone } from 'src/services/functions'
    import API from 'src/services/api'

    export default {
        data() {
            return {
                style: 'none',
                user: '',
                id: '',
                name: '',
                name_error: '',
                username: '',
                username_error: '',
                email: '',
                email_error: '',
                tel: '',
                tel_error: '',
                addr: '',
                addr_error: '',
                self_addr: '',
                self_addr_error: ''
            }
        },
        methods: {
            close() {
                this.username_error = ''
                this.email_error = ''
                this.name_error = ''
                this.tel_error = ''
                this.addr_error = ''
                this.self_addr_error = ''
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure() {
                let reg = /^[\u4e00-\u9fa5]{2,6}$/
                if (!this.username) {
                    this.username_error = '请填写姓名'
                    return false
                } else {
                    if (reg.test(this.username)) {
                        this.username_error = ''
                    } else {
                        this.username_error = '姓名由汉字组成2~6位'
                        return false
                    }
                }
                if (!this.email) {
                    this.email_error = '请填写邮箱'
                    return false
                } else {
                    if (isEmail(this.email)) {
                        this.email_error = ''
                    } else {
                        this.email_error = '邮箱格式不正确'
                        return false
                    }
                }
                if (!this.tel) {
                    this.tel_error = '请填写手机号'
                    return false
                } else {
                    if (isRealPhone(this.tel)) {
                        this.tel_error = ''
                    } else {
                        this.tel_error = '请填写真实的手机号'
                        return false
                    }
                }
                if (!this.addr) {
                    this.addr_error = '请填写归属地'
                    return false
                }
                if (!this.self_addr) {
                    this.self_addr_error = '请填写所在位置'
                    return false
                }
                this.$ajax({
                    url: API.agent_modify_myinfo,
                    data: {
                        id: this.id,
                        name: this.name,
                        user_name: this.username,
                        mail: this.email,
                        tel: this.tel,
                        regoin: this.addr,
                        application_addr: this.self_addr
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.close()
                            this.$toast('修改信息成功', () => {
                                window.location.reload()
                            })
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            }
        },
        created() {
            this.$on('show', function (opt) {
                this.id = opt.id
                this.user = opt.user
                this.name = opt.name
                this.username = opt.username
                this.email = opt.email
                this.tel = opt.tel
                this.addr = opt.addr
                this.self_addr = opt.self_addr
                this.style = 'block'
                this.$store.commit('SHOW_LAYER')
            })
        },
    }

</script>