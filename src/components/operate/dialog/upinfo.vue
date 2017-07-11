<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-259px','margin-top':'-257px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>{{edit?'修改信息':'新建运营'}}</h4>
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
                    <label>权限</label>
                    <div class="input-warp">
                        <div class="check-warp check-limit">
                            <ul>
                                <li :class="{checked:power[1]}">
                                    <p>
                                        <i class="icon" @click="togglePower(1)"></i>
                                        <span>客户管理</span>
                                    </p>
                                </li>
                                <li :class="{checked:power[2]}">
                                    <p>
                                        <i class="icon" @click="togglePower(2)"></i>
                                        <span>项目管理</span>
                                    </p>
                                </li>
                                <li :class="{checked:power[3]}">
                                    <p>
                                        <i class="icon" @click="togglePower(3)"></i>
                                        <span>话务管理</span>
                                    </p>
                                </li>
                                <li :class="{checked:power[4]}">
                                    <p>
                                        <i class="icon" @click="togglePower(4)"></i>
                                        <span>计费管理</span>
                                    </p>
                                </li>
                                <li :class="{checked:power[5]}">
                                    <p>
                                        <i class="icon" @click="togglePower(5)"></i>
                                        <span>代理管理</span>
                                    </p>
                                </li>
                            </ul>
                            <p v-show="power_error" class="error">{{power_error}}</p>
                        </div>
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
                id: '',
                user: '',
                user_error: '',
                username: '',
                username_error: '',
                email: '',
                email_error: '',
                tel: '',
                tel_error: '',
                edit: false,
                power: {
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false
                },
                power_error: ''
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
            togglePower(num) {
                if (num) {
                    this.power[num] = !this.power[num]
                }
            },
            sure: function () {
                let reg_username = /^[\u4e00-\u9fa5]{2,6}$/
                let cansub = true
                if (!this.edit) {
                    if (this.user) {
                        if (REG.username.test(this.user)) {
                            this.user_error = ''
                        } else {
                            this.user_error = '账号是中英文数字组成4~10位'
                            cansub = false
                        }
                    } else {
                        this.user_error = '请填写账号'
                        cansub = false
                    }
                }
                if (this.username) {
                    if (reg_username.test(this.username)) {
                        this.username_error = ''
                    } else {
                        this.username_error = '姓名需要是中文2~6位'
                        cansub = false
                    }
                } else {
                    this.username_error = '请填写姓名'
                    cansub = false
                }
                if (this.email) {
                    if (isEmail(this.email)) {
                        this.email_error = ''
                    } else {
                        this.email_error = '邮箱格式不正确'
                        cansub = false
                    }
                } else {
                    this.email_error = '请填写邮箱'
                    cansub = false
                }
                if (this.tel) {
                    if (isRealPhone(this.tel)) {
                        this.tel_error = ''
                    } else {
                        this.tel_error = '请填写真实的手机号'
                        cansub = false
                    }
                } else {
                    this.tel_error = '请填写手机号'
                    cansub = false
                }

                let powerArr = []
                for (let i in this.power) {
                    if (this.power[i]) {
                        powerArr.push(i)
                    }
                }
                if (powerArr.length > 0) {
                    this.power_error = ''
                } else {
                    this.power_error = '请选择运营权限'
                    cansub = false
                }

                if (cansub == false) return false

                let _this = this
                let api = this.edit ? API.update_operate : API.create_operate
                let data = this.edit ? { id: this.id, user_name: this.username, mail: this.email, tel: this.tel, rule: powerArr.join(',') } :
                    { user: this.user, user_name: this.username, mail: this.email, tel: this.tel, rule: powerArr.join(',') }
                mAjax(this, {
                    url: api,
                    data: data,
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            let msg = _this.edit ? '修改信息成功' : '新建账号成功'
                            _this.$toast(msg)
                        } else {
                            _this.tel_error = data.message
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
                mAjax(this, {
                    url: API.get_operate_info,
                    data: {
                        id: id
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.style = 'block'
                            let info = data.data
                            _this.user = info.user ? info.user : ''
                            _this.username = info.user_name ? info.user_name : ''
                            _this.email = info.mail ? info.mail : ''
                            _this.tel = info.tel ? info.tel : ''
                            _this.id = id

                            let arr = info.rule.split(',')
                            for (let i in _this.power) {
                                _this.power[i] = false
                            }
                            if (info.rule && arr.length > 0) {
                                arr.forEach(el => {
                                    _this.power[el] = true
                                })
                            }

                            _this.edit = true
                            _this.user_error = ''
                            _this.username_error = ''
                            _this.email_error = ''
                            _this.tel_error = ''
                            _this.power_error = ''
                            _this.$store.commit('SHOW_LAYER')
                        } else {
                            
                            this.$toast('获取用户信息失败')
                        }
                    },
                    error: err => {
                        this.$toast('获取用户信息失败')
                    }
                })
            })
            this.$on('create', function () {
                _this.style = 'block'
                _this.user = ''
                _this.username = ''
                _this.email = ''
                _this.tel = ''
                for (let i in _this.power) {
                    _this.power[i] = false
                }
                _this.edit = false
                _this.user_error = ''
                _this.username_error = ''
                _this.email_error = ''
                _this.tel_error = ''
                _this.power_error = ''
                _this.$store.commit('SHOW_LAYER')
            })
        }
    }

</script>