<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-259px','margin-top':'-181px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>修改信息</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>账号</label>
                    <div class="input-warp">
                        <input class="text disabled" :class="{disabled:edit}" type="text" v-model="user" :disabled="edit?true:false">
                        <p v-show="user_error" class="error">{{user_error}}</p>
                    </div> 
                </li>
                <li>
                    <label>姓名</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="username">
                        <p v-show="username_error" class="error">{{username_error}}</p>
                    </div> 
                </li>
                <li>
                    <label>邮箱</label>
                    <div class="input-warp">
                        <input class="text" type="email" v-model="email">
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
                id: '',
                user: '',
                user_error: '',
                username: '',
                username_error: '',
                email: '',
                email_error: '',
                tel: '',
                tel_error: '',
                edit: false
            }
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.id = ''
                this.user = ''
                this.username = ''
                this.email = ''
                this.tel = ''
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                let reg_user = /^[a-zA-Z0-9]{6,16}$/
                let reg_username = /^[\u4e00-\u9fa5]{2,6}$/
                if (!this.edit) {
                    if (this.user) {
                        if (reg_user.test(this.user)) {
                            this.user_error = ''
                        } else {
                            this.user_error = '账号需要是英文大小写及数字组成6~16位'
                            return false
                        }
                    } else {
                        this.user_error = '请填写账号'
                        return false
                    }
                }
                if (this.username) {
                    if (reg_username.test(this.username)) {
                        this.username_error = ''
                    } else {
                        this.username_error = '姓名需要是中文2~6位'
                        return false
                    }
                } else {
                    this.username_error = '请填写姓名'
                    return false
                }
                if (this.email) {
                    if (isEmail(this.email)) {
                        this.email_error = ''
                    } else {
                        this.email_error = '邮箱格式不正确'
                        return false
                    }
                } else {
                    this.email_error = '请填写邮箱'
                    return false
                }
                if (this.tel) {
                    if (isRealPhone(this.tel)) {
                        this.tel_error = ''
                    } else {
                        this.tel_error = '请填写真实的手机号'
                        return false
                    }
                } else {
                    this.tel_error = '请填写手机号'
                    return false
                }
                let _this = this
                let api = this.edit ? API.update_operate : API.create_operate
                let data = this.edit ? { id: this.id, user_name: this.username, mail: this.email, tel: this.tel } :
                    { user: this.user, user_name: this.username, mail: this.email, tel: this.tel }
                mAjax(this, {
                    url: api,
                    data: data,
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            let msg = _this.edit ? '修改信息成功' : '新建账号成功'
                            _this.$store.commit('SHOW_TOAST', msg)
                        } else {
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
            this.$on('edit', function (id, user, username, email, tel) {
                _this.style = 'block'
                _this.user = user ? user : ''
                _this.username = username ? username : ''
                _this.email = email ? email : ''
                _this.tel = tel ? tel : ''
                _this.id = id
                _this.edit = true
                _this.$store.commit('SHOW_LAYER')
            })
            this.$on('create', function () {
                _this.style = 'block'
                _this.user = ''
                _this.username = ''
                _this.email = ''
                _this.tel = ''
                _this.edit = false
                _this.$store.commit('SHOW_LAYER')
            })
        }
    }

</script>