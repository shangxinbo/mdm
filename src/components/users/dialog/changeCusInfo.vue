<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-259px','margin-top':'-280px'}">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭" @click="close"></a>
        <div class="dialog-header">
            <h4>修改联系信息</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>姓名</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="username" value="alinea">
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
                        <input class="text" type="text" v-model="selfaddr">
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
    import { mAjax, isEmail, isRealPhone } from 'src/services/functions'
    import API from 'src/services/api'

    export default {
        data: function () {
            return {
                style: 'none',
                id:'',
                username:'',
                email:'',
                tel:'',
                addr:'',
                selfaddr:'',
                username_error: '',
                email_error: '',
                tel_error: '',
                addr_error: '',
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
                if (!this.selfaddr) {
                    this.self_addr_error = '请填写所在位置'
                    return false
                }
                let _this = this
                mAjax(this, {
                    url: API.customer_upself,
                    data: {
                        id: this.id,
                        user_name: this.username,
                        mail: this.email,
                        tel: this.tel,
                        location: this.addr,
                        application_addr: this.selfaddr
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            _this.$toast('修改信息成功',()=>{
                                window.location.reload()
                            })
                        } else {
                            _this.self_addr_error = data.message
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
            this.$on('show', function (obj) {
                _this.style = 'block'
                _this.id = obj.id
                _this.username = obj.user_name
                _this.email = obj.mail
                _this.tel = obj.tel
                _this.addr = obj.location
                _this.selfaddr = obj.application_addr
                _this.$store.commit('SHOW_LAYER')      
            })
        },
    }

</script>