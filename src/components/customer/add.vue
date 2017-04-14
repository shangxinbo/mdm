<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">新建客户</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">账号</label>
                            <div class="input-warp">
                                <input class="text" v-model="user" type="text">
                                <p v-show="user_error" class="error">{{user_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">客户类型</label>
                            <mselect ref="typeSelect" :api="api.typeSelect" :id="type" :error="type_error"></mselect>
                        </li>
                        <li>
                            <label class="name">公司名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="company" type="text">
                                <p class="tips">务必与营业执照保持一致</p>
                                <p v-show="company_error" class="error">{{company_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">法人</label>
                            <div class="input-warp">
                                <input class="text" v-model="legal" type="text">
                                <p class="tips">务必与营业执照保持一致</p>
                                <p v-show="legal_error" class="error">{{legal_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">经营范围</label>
                            <div class="input-warp">
                                <input class="text" v-model="scope" type="text">
                                <p class="tips">务必与营业执照保持一致</p>
                                <p v-show="scope_error" class="error">{{scope_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">办公地点</label>
                            <div class="input-warp">
                                <input class="text long" v-model="addr" type="text">
                                <p v-show="addr_error" class="error">{{addr_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">营业执照</label>
                            <div class="input-warp">
                                <p class="text" v-if="edit_licence">
                                    <a :href="edit_licence" target="_blank">查看</a>
                                    <a href="javascript:void(0)" @click="reUpload(1)">重新上传</a>
                                </p>
                                <div class="file-box" v-else>
                                    <div class="inputbox">
                                        <span name="textfield" id="textfield" class="txt">{{licence_name}}</span>
                                        <div class="mainbox">
                                            <span class="button1">上传文件</span>
                                            <input type="file" class="file" accept=".jpg,.png,gif" multiple="false" size="28" @change="selectLicense">
                                        </div>
                                    </div>
                                    <p v-show="licence_error" class="error">{{licence_error}}</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="name">其他资质</label>
                            <div class="input-warp">
                                <p class="text" v-if="edit_qualification">
                                    <a :href="edit_qualification" target="_blank">查看</a>
                                    <a href="javascript:void(0)" @click="reUpload(2)">重新上传</a>
                                </p>
                                <div class="file-box" v-else>
                                    <div class="inputbox ">
                                        <span name="textfield" class="txt">{{qualification_name}}</span>
                                        <div class="mainbox">
                                            <span class="button1">上传文件</span>
                                            <input type="file" class="file" accept=".jpg,.png,gif" multiple="false" size="28" @change="selectQualification">
                                        </div>
                                        <p v-show="qualification_error" class="error">{{qualification_error}}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="title-info">联系人信息</div>
                    <ul class="data-text">
                        <li>
                            <label class="name">姓名</label>
                            <div class="input-warp">
                                <input class="text" v-model="user_name" type="text">
                                <p v-show="user_name_error" class="error">{{user_name_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">邮箱</label>
                            <div class="input-warp">
                                <input class="text" v-model="email" type="text">
                                <p v-show="email_error" class="error">{{email_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">手机号</label>
                            <div class="input-warp">
                                <input class="text" v-model="tel" type="text">
                                <p v-show="tel_error" class="error">{{tel_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">归属地</label>
                            <div class="input-warp">
                                <input class="text" v-model="location" type="text">
                                <p v-show="location_error" class="error">{{location_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">所在位置</label>
                            <div class="input-warp">
                                <input class="text long" v-model="self_addr" type="text">
                                <p v-show="self_addr_error" class="error">{{self_addr_error}}</p>
                            </div>
                        </li>
                        <li class="li-btn">
                            <div class="input-warp">
                                <button class="btn blue" type="button" @click="submit">提交</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <alert ref="alert"></alert>
    </div>
</template>
<script>
    import { mAjax, isRealPhone, isEmail } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import alert from 'components/dialog/alert'
    import axios from 'axios'
    function scrollTop(todo,num) {
        if (todo){
            let offset = document.querySelector('form').querySelectorAll('label')[num].getBoundingClientRect().top
            window.scrollBy(0, offset)
        }
    }
    export default {
        data: function () {
            return {
                user: '',
                user_error: '',
                type:'',
                type_error: '',
                company: '',
                company_error: '',
                legal: '',
                legal_error: '',
                scope: '',
                scope_error: '',
                addr: '',
                addr_error: '',
                user_name: '',
                user_name_error: '',
                email: '',
                email_error: '',
                tel: '',
                tel_error: '',
                location: '',
                location_error: '',
                self_addr: '',
                self_addr_error: '',
                licence: '',
                licence_name: '',
                licence_error: '',
                qualification: '',
                qualification_name: '',
                qualification_error: '',
                edit_licence: '',
                edit_qualification: '',
                api: {
                    typeSelect: API.customer_type_list
                }
            }
        },
        watch: {
            user_error(newVal, oldVal) {
                scrollTop(newVal,0)
            },
            type_error(newVal, oldVal) {
                scrollTop(newVal,1)
            },
            company_error(newVal, oldVal) {
                console.log(newVal)
                scrollTop(newVal,2)
            },
            legal_error(newVal, oldVal) {
                scrollTop(newVal,3)
            },
            scope_error(newVal, oldVal) {
                scrollTop(newVal,4)
            },
            addr_error(newVal, oldVal) {
                scrollTop(newVal,5)
            },
            licence_error(newVal, oldVal) {
                scrollTop(newVal,6)
            },
            qualification_error(newVal, oldVal) {
                scrollTop(newVal,7)
            },
            user_name_error(newVal, oldVal) {
                scrollTop(newVal,8)
            },
            email_error(newVal, oldVal) {
                scrollTop(newVal,9)
            },
            tel_error(newVal, oldVal) {
                scrollTop(newVal,10)
            },
            location_error(newVal, oldVal) {
                scrollTop(newVal,11)
            },
            self_addr_error(newVal, oldVal) {
                scrollTop(newVal,12)
            }
        },
        components: {
            mselect,
            alert
        },
        methods: {
            reUpload(num) {
                if (num == 1) {
                    this.edit_licence = ''
                } else {
                    this.edit_qualification = ''
                }
            },
            selectLicense(evt) {
                let file = evt.target.files[0]
                if (file.type.indexOf('image') < 0) {
                    this.file_error = '请上传.png|.jpeg|.gif格式的图片'
                    this.fileName = ''
                    return false
                }
                if (file.size > 1024 * 1024 * 10) {
                    this.file_error = '图片不能大于10M'
                    this.fileName = ''
                    return false
                }
                this.licence_name = file.name
                this.licence = file
            },
            selectQualification(evt) {
                let file = evt.target.files[0]
                if (file.type.indexOf('image') < 0) {
                    this.file_error = '请上传.png|.jpeg|.gif格式的图片'
                    this.fileName = ''
                    return false
                }
                if (file.size > 1024 * 1024 * 10) {
                    this.file_error = '图片不能大于10M'
                    this.fileName = ''
                    return false
                }
                this.qualification_name = file.name
                this.qualification = evt.target.files[0]
            },
            submit() {
                let reg_user = /^[a-zA-Z0-9]{6,16}$/
                if (!this.user) {
                    this.user_error = '账号不能为空'
                    return false
                } else {
                    if (reg_user.test(this.user)) {
                        this.user_error = ''
                    } else {
                        this.user_error = '账号是英文数字6-16位组成'
                        return false
                    }
                }
                if (!this.$refs.typeSelect.selected.id) {
                    this.type_error = '请选择客户类型'
                    return false
                } else {
                    this.type_error = ''
                }
                if (!this.company) {
                    this.company_error = '请填写公司名称'
                    return false
                } else {
                    this.company_error = ''
                }
                if (!this.legal) {
                    this.legal_error = '请填写法人'
                    return false
                } else {
                    this.legal_error = ''
                }
                if (!this.scope) {
                    this.scope_error = '请填写经营范围'
                    return false
                } else {
                    this.scope_error = ''
                }
                if (!this.addr) {
                    this.addr_error = '请填写办公地点'
                    return false
                } else {
                    this.addr_error = ''
                }
                if (!this.edit_licence) {
                    if (!this.licence) {
                        this.licence_error = '请选择营业执照'
                        return false
                    } else {
                        this.licence_error = ''
                    }
                }
                if (!this.user_name) {
                    this.user_name_error = '请填写姓名'
                    return false
                } else {
                    this.user_name_error = ''
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
                if (!this.location) {
                    this.location_error = '请填写归属地'
                    return false
                } else {
                    this.location_error = ''
                }
                if (!this.self_addr) {
                    this.self_addr_error = '请填写所在位置'
                    return false
                } else {
                    this.self_addr_error = ''
                }
                let _this = this
                let id = this.$route.params.id
                let api = API.customer_add
                let data = new FormData()
                if (id) {
                    data.append('id',id)
                    api = API.customer_modify
                }
                data.append('user', this.user)
                data.append('type', this.$refs.typeSelect.selected.id)
                data.append('company', this.company)
                data.append('legal', this.legal)
                data.append('scope', this.scope)
                data.append('store_addr', this.addr)
                data.append('licence', this.licence)
                data.append('qualification', this.qualification)
                data.append('user_name', this.user_name)
                data.append('mail', this.email)
                data.append('tel', this.tel)
                data.append('location', this.location)
                data.append('application_addr', this.self_addr)
                axios.post(api, data).then(function (res) {
                    if (res.status == 200 && res.data.code == 200) {
                        let msg = _this.$route.query.id ? '修改成功' : '添加成功'
                        _this.$refs.alert.$emit('show', msg, () => {
                            _this.$router.push('/customer/index')
                        })
                    }else{
                        _this.self_addr_error = res.data.message
                    }
                }).catch(err => {
                    _this.$refs.alert.$emit('show', '程序未知错误')
                })
            }
        },
        created: function () {
            let id = this.$route.params.id
            let _this = this
            if (id) {
                mAjax(this, {
                    url: API.customer_detail,
                    data: {
                        id: id
                    },
                    success: data => {
                        if (data.code == 200) {
                            let detail = data.data
                            _this.user = detail.user
                            _this.type = detail.type
                            _this.company = detail.company
                            _this.legal = detail.legal
                            _this.scope = detail.scope
                            _this.addr = detail.store_addr
                            _this.user_name = detail.user_name
                            _this.email = detail.mail
                            _this.tel = detail.tel
                            _this.location = detail.location
                            _this.self_addr = detail.application_addr
                            _this.edit_licence = detail.licence
                            _this.edit_qualification = detail.qualification
                        } else {
                            _this.$refs.alert.$emit('show', data.message)
                        }
                    }
                })
            }
        }
    }

</script>