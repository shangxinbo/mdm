<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{id?'编辑模板':'新建模板'}}</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">模板名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="name" type="text">
                                <p v-if="error_name" class="tips block error">{{error_name}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">客户名称</label>
                            <mselect ref="clientSelect" :api="clientApi" :id="client" :disabled="id" :error="error_client"></mselect>
                        </li>
                        <li>
                            <label class="name">短信类型</label>
                            <div class="input-warp">
                                <p class="text">挂机短信</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">短信文本</label>
                            <div class="input-warp">
                                <textarea v-model="content"></textarea>
                                <p class="tips block">已经输入{{contentLength}}个字符</p>
                                <p v-if="error_content" class="tips block error">{{error_content}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">短信链接</label>
                            <div class="input-warp">
                                <input class="text" v-model="url" type="text">
                                <p class="tips block">如有短信链接，务必在短信文本中对应位置加入链接占位符#url#</p>
                                <p v-if="error_url" class="tips block error">{{error_url}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">短信签名</label>
                            <div class="input-warp">
                                <input class="text" v-model="sign" type="text">
                                <p v-if="error_sign" class="tips block error">{{error_sign}}</p>
                            </div>
                        </li>
                    </ul>
                    <ul class="data-text">
                        <li class="li-radio">
                            <label class="name">模板状态</label>
                            <div class="input-warp">
                                <label class="radio-warp radio-inline" :class="{'radio-active':status==1}" @click="setStatus(1)">
                                    <i class="icon"></i>
                                    <span class="radioname">审核中</span>
                                </label>
                                <label class="radio-warp radio-inline" :class="{'radio-active':status==2}" @click="setStatus(2)">
                                    <i class="icon"></i>
                                    <span class="radioname">使用中</span>
                                </label>
                                <label class="radio-warp radio-inline" :class="{'radio-active':status==3}" @click="setStatus(3)">
                                    <i class="icon"></i>
                                    <span class="radioname">已禁用</span>
                                </label>
                                <p v-if="error_status" class="tips block error">{{error_status}}</p>
                            </div>
                        </li>
                        <li class="li-btn">
                            <div class="input-warp">
                                <a class="btn blue" @click="submit" v-if="!loading">提交</a>
                                <a class="btn blue" v-if="loading">
                                    <img style="margin:10px;" :src="loading_pic" />
                                </a>
                            </div>
                        </li>
                    </ul>
                </form>
                <div class="sms-phone">
                    <div class="inrr">
                        <i class="bg-up"></i>
                        <i class="bg-down"></i>
                        <p v-show="sign">【{{sign}}】</p>
                        <p v-show="content_view" v-html="content_view"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import loading from 'assets/img/upload.gif'
    export default {
        data() {
            return {
                id: '',
                name: '',
                clientApi: API.sms_client_list,
                client: '',
                content: '',
                url: '',
                sign: '',
                status: '',
                error_name: '',
                error_client: '',
                error_content: '',
                error_url: '',
                error_sign: '',
                error_status: '',
                loading_pic: loading,
                loading: false
            }
        },
        created() {
            if (this.$route.query.id) {
                this.id = this.$route.query.id
                this.$ajax({
                    url: API.sms_template_detail,
                    data: {
                        id: this.id
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.client = data.data.client_id
                            this.name = data.data.name
                            this.content = data.data.content
                            this.url = data.data.url
                            this.sign = data.data.sign
                            this.status = data.data.status
                        }
                    }
                })
            }
        },
        computed: {
            content_view() {
                return this.content.replace(/#url#/, '<a href="' + this.url + '"> t.cn/RK73y </a>')
            },
            contentLength() {
                return this.content.replace(/#url#/, '12345678901234').length
            }
        },
        methods: {
            setStatus(num) {
                this.status = num
            },
            submit() {
                if (!this.name) {
                    this.error_name = '请填写模板名称'
                    return false
                } else {
                    this.error_name = ''
                }
                if (!this.$refs.clientSelect.selected.id) {
                    this.error_client = '请选择客户'
                    return false
                } else {
                    this.error_client = ''
                }
                if (!this.content) {
                    this.error_content = '请填写短信内容'
                    return false
                } else {
                    this.error_content = ''
                }
                if (this.url) {
                    let reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
                    if (!reg.test(this.url)) {
                        this.error_url = '链接格式不正确'
                        return false
                    } else {
                        this.error_url = ''
                    }
                } else {
                    this.error_url = ''
                }
                if (!this.sign) {
                    this.error_sign = '请填写短信签名'
                    return false
                } else {
                    this.error_sign = ''
                }
                if (!this.status) {
                    this.error_status = '请选择短信状态'
                    return false
                } else {
                    this.error_status = ''
                }

                let obj = {
                    name: this.name,
                    client_id: this.$refs.clientSelect.selected.id,
                    type: 1,
                    content: this.content,
                    url: this.url,
                    sign: this.sign,
                    status: this.status
                }

                if (this.id) {
                    obj.id = this.id
                }
                this.loading = true
                this.$ajax({
                    url: API.sms_template_add,
                    data: obj,
                    success: data => {
                        this.loading = false
                        if (data.code == 200) {
                            let _this = this
                            this.$toast(this.id ? '编辑成功' : '新建成功', function () {
                                _this.$router.replace('/project/sms/template')
                            })
                        } else if (data.code == 50001) {
                            this.error_sign = data.message
                        } else {
                            this.error_status = data.message
                        }
                    }
                })
            }
        },
        components: {
            mselect
        }
    }

</script>