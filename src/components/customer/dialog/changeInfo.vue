<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-259px','margin-top':'-280px'}">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭" @click="close"></a>
        <div class="dialog-header">
            <h4>修改联系信息</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>客户名称</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" :value="user" disabled="disabled">
                    </div>
                </li>
                <li>
                    <label>姓名</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="username" value="alinea">
                    </div>
                    <p v-show="username_error" class="error">{{username_error}}</p>
                </li>
                <li>
                    <label>邮箱</label>
                    <div class="input-warp">
                        <input class="text" type="email" v-model="email">
                    </div>
                    <p v-show="email_error" class="error">{{email_error}}</p>
                </li>
                <li>
                    <label>手机号</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="tel">
                    </div>
                    <p v-show="tel_error" class="error">{{tel_error}}</p>
                </li>
                <li>
                    <label>归属地</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="addr">
                    </div>
                    <p v-show="addr_error" class="error">{{addr_error}}</p>
                </li>
                <li>
                    <label>所在位置</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="self_addr">
                    </div>
                    <p v-show="self_addr_error" class="error">{{self_addr_error}}</p>
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
    import { mAjax, isEmail, isRealPhone } from 'src/services/functions'
    import API from 'src/services/api'

    export default {
        data: function () {
            return {
                style: 'none',
                user: '',
                id: '',
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
            close: function () {
                this.username_error = ''
                this.email_error = ''
                this.tel_error = ''
                this.addr_error = ''
                this.self_addr_error = ''
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
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
                let _this = this
                mAjax(this, {
                    url: API.customer_edit,
                    data: {
                        id: this.id,
                        user_name: this.username,
                        mail: this.email,
                        tel: this.tel,
                        regoin: this.addr,
                        application_addr: this.self_addr
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            _this.$store.commit('SHOW_TOAST', '修改信息成功')
                            _this.$router.replace('/customer/index')
                        }else{
                            _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    },
                    error: err => {
                        console.log(err)
                    }
                })
            }
        },
        created: function () {
            let _this = this
            this.$on('show', function (id) {
                mAjax(_this, {
                    url: API.customer_detail,
                    data: {
                        id: id
                    },
                    success: data => {
                        _this.id = id
                        _this.user = data.data.user
                        _this.username = data.data.user_name
                        _this.email = data.data.mail
                        _this.tel = data.data.tel
                        _this.addr = data.data.store_addr
                        _this.self_addr = data.data.application_addr
                        _this.style = 'block'
                        _this.$store.commit('SHOW_LAYER')
                    }
                })

            })
        },
    }

</script>