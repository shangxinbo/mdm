<template>
    <div class="dialog" id="resetEdit" :style="{'display':style,'margin-left':'-259px','margin-top':offsetTop}">
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
                        <input class="text disabled" type="text" v-model='user' disabled="disabled" v-if="type=='update'">
                        <p v-show="user_error" class="error">{{user_error}}</p>
                    </div>
                </li>
                <li>
                    <label>代理名称</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" v-model='name'>
                        <p v-show="name_error" class="error">{{name_error}}</p>
                    </div>
                </li>
                <li>
                    <label>联系人姓名</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model='username'>
                        <p v-show="username_error" class="error">{{username_error}}</p>
                    </div>
                </li>
                <li>
                    <label>邮箱</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model='email'>
                        <p v-show="email_error" class="error">{{email_error}}</p>
                    </div>
                </li>
                <li>
                    <label>手机号</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model='tel'>
                        <p v-show="tel_error" class="error">{{tel_error}}</p>
                    </div>
                </li>
                <li>
                    <label>归属地</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" v-model='addr'>
                        <p v-show="addr_error" class="error">{{addr_error}}</p>
                    </div>
                </li>
                <li>
                    <label>所在位置</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" v-model='self_addr'>
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
    import REG from 'src/services/reg'

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
                self_addr_error: '',
                offsetTop: 0,
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
                let cansub = true
                if (this.type == 'create') {
                    if (!this.user) {
                        this.user_error = '请填写代理账号'
                        cansub = false
                    } else {
                        if (REG.username.test(this.user)) {
                            this.user_error = ''
                        } else {
                            this.user_error = '账号是中英文数字组成4~10位'
                            cansub = false
                        }
                    }
                }
                let reg_name = /^[\u4e00-\u9fa5]{2,20}$/
                if (!this.name) {
                    this.name_error = '请填写代理名称'
                    cansub = false
                } else {
                    if (reg_name.test(this.name)) {
                        this.name_error = ''
                    } else {
                        this.name_error = '代理名称由汉字组成2~20位'
                        cansub = false
                    }
                }
                let reg = /^[\u4e00-\u9fa5]{2,6}$/
                if (!this.username) {
                    this.username_error = '请填写姓名'
                    cansub = false
                } else {
                    if (reg.test(this.username)) {
                        this.username_error = ''
                    } else {
                        this.username_error = '姓名由汉字组成2~6位'
                        cansub = false
                    }
                }
                if (!this.email) {
                    this.email_error = '请填写邮箱'
                    cansub = false
                } else {
                    if (isEmail(this.email)) {
                        this.email_error = ''
                    } else {
                        this.email_error = '邮箱格式不正确'
                        cansub = false
                    }
                }
                if (!this.tel) {
                    this.tel_error = '请填写手机号'
                    cansub = false
                } else {
                    if (isRealPhone(this.tel)) {
                        this.tel_error = ''
                    } else {
                        this.tel_error = '请填写真实的手机号'
                        cansub = false
                    }
                }
                if (!this.addr) {
                    this.addr_error = '请填写归属地'
                    cansub = false
                } else {
                    this.addr_error = ''
                }
                if (!this.self_addr) {
                    this.self_addr_error = '请填写所在位置'
                    cansub = false
                } else {
                    this.self_addr_error = ''
                }
                if (cansub == false) return false
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
                            let msg = ''
                            if (_this.type == 'create') {
                                msg = '添加代理成功'
                            } else if (_this.type == 'update') {
                                msg = '信息修改成功'
                            } else {
                                msg = 'ok'
                            }
                            _this.close()
                            _this.$store.commit('SHOW_TOAST', msg)
                            _this.$router.replace('/agent/index')
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
        created() {
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
        updated() {
            let dialog = this.$el
            let dh = dialog.offsetHeight
            this.offsetTop = -dh / 2 + 'px'
        }
    }

</script>