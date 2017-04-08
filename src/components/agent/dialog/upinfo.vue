<template>
    <div class="dialog" id="resetEdit" :style="{'display':style,'margin-left':'-259px','margin-top':'-280px'}">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭" @click="close"></a>
        <div class="dialog-header">
            <h4 v-if="type=='create'">新建代理</h4>
            <h4 v-if="type=='update'">修改代理信息</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>账号</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" v-model='user' v-if="type=='create'">
                        <input class="text disabled" type="text" v-model='user' disabled="disabled"
                               v-if="type=='update'">
                    </div>
                    <p v-show="user_error" class="error">{{user_error}}</p>
                </li>
                <li>
                    <label>代理名称</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" v-model='name'>
                    </div>
                    <p v-show="name_error" class="error">{{name_error}}</p>
                </li>
                <li>
                    <label>联系人姓名</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model='username'>
                    </div>
                    <p v-show="username_error" class="error">{{username_error}}</p>
                </li>
                <li>
                    <label>邮箱</label>
                    <div class="input-warp">
                        <input class="text" type="email" v-model='email'>
                    </div>
                    <p v-show="email_error" class="error">{{email_error}}</p>
                </li>
                <li>
                    <label>手机号</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model='tel'>
                    </div>
                    <p v-show="tel_error" class="error">{{tel_error}}</p>
                </li>
                <li>
                    <label>归属地</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" v-model='addr'>
                    </div>
                    <p v-show="addr_error" class="error">{{addr_error}}</p>
                </li>
                <li>
                    <label>所在位置</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" v-model='self_addr'>
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
    import {mAjax, isEmail, isRealPhone} from 'src/services/functions'
    import API from 'src/services/api'

    export default {
        data: function () {
            return {
                style: 'none',
                type: 'create',
                url: API.operate_addagent,
                id: '',
                user: '',
                user_error: '',
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
            close: function () {
                this.style = 'none'
                this.type = 'create'
                this.id = ''
                this.user = ''
                this.name = ''
                this.username = ''
                this.email = ''
                this.tel = ''
                this.addr = ''
                this.self_addr = ''
                this.user_error = ''
                this.name_error = ''
                this.username_error = ''
                this.email_error = ''
                this.tel_error = ''
                this.addr_error = ''
                this.self_addr_error = ''
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                if (this.type == 'create') {
                    //@todo 唯一性验证
                    let reg_user = /^[a-zA-Z0-9]{6,16}$/
                    if (!this.user) {
                        this.user_error = '请填写代理账号'
                        return false
                    } else {
                        if (reg_user.test(this.user)) {
                            this.user_error = ''
                        } else {
                            this.user_error = '代理账号由大小写拼音以及数字组成6~16位'
                            return false
                        }
                    }
                }
                let reg_name = /^[\u4e00-\u9fa5]{2,20}$/
                if (!this.name) {
                    this.name_error = '请填写代理名称'
                    return false
                } else {
                    if (reg_name.test(this.name)) {
                        this.name_error = ''
                    } else {
                        this.name_error = '代理名称由汉字组成2~20位'
                        return false
                    }
                }
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
                    url: this.url,
                    data: {
                        id: this.id,
                        user: this.user,
                        name: this.name,
                        user_name: this.username,
                        mail: this.email,
                        tel: this.tel,
                        regoin: this.addr,
                        application_addr: this.self_addr
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            let msg = ''
                            if (_this.type == 'create') {
                                msg = '添加代理成功'
                            } else if (_this.type == 'update') {
                                msg = '信息修改成功'
                            } else {
                                msg = 'ok'
                            }
                            _this.$store.commit('SHOW_TOAST', msg)
                            _this.$router.replace('/agent/index')
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
            this.$on('show', function (id) {
                _this.type = 'create'
                _this.url = API.operate_addagent
                if (id) {
                    _this.type = 'update'
                    _this.url = API.operate_upagent
                    mAjax(_this, {
                        url: API.operate_getagent,
                        data: {
                            id: id
                        },
                        success: data => {
                            _this.id = id
                            _this.user = data.data.user
                            _this.name = data.data.name
                            _this.username = data.data.user_name
                            _this.email = data.data.mail
                            _this.tel = data.data.tel
                            _this.addr = data.data.regoin
                            _this.self_addr = data.data.application_addr
                        }
                    })
                }
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')

            })
        },
    }

</script>
