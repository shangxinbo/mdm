<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">客户账号审核</div>
            <div class="data-detail examine">
                <div class="license">
                    <span class="t">营业执照</span>
                    <img :src="detail.licence">
                </div>
                <ul class="data-text data-view">
                    <li>
                        <label class="name">账号</label>
                        <div class="input-warp">
                            <p class="text">{{detail.user}}</p>
                        </div>
                    </li>
                    <li>
                        <label class="name">客户类型</label>
                        <div class="input-warp">
                            <p class="text">{{detail.type}}</p>
                        </div>
                    </li>
                    <li class="li-bg">
                        <label class="name">公司名称</label>
                        <div class="input-warp">
                            <p class="text">{{detail.company}}</p>
                        </div>
                    </li>
                    <li class="li-bg">
                        <label class="name">法人</label>
                        <div class="input-warp">
                            <p class="text">{{detail.legal}}</p>
                        </div>
                    </li>
                    <li class="li-bg">
                        <label class="name">经营范围</label>
                        <div class="input-warp">
                            <p class="text">{{detail.scope}}</p>
                        </div>
                    </li>
                    <li>
                        <label class="name">办公地点</label>
                        <div class="input-warp">
                            <p class="text">{{detail.store_addr}}</p>
                        </div>
                    </li>
                    <li>
                        <label class="name">其他资质</label>
                        <div class="input-warp">
                            <p class="text">
                                <a :href="detail.qualification" target="_blank">查看</a>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="data-detail examine">
                <form>
                    <div class="data-card">
                        <div class="title">联系人信息</div>
                        <dl>
                            <dt>{{detail.user_name}}</dt>
                            <dd>
                                <label class="name">
                                    <i class="icon card1"></i>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
                                <p class="text">{{detail.mail}}</p>
                            </dd>
                            <dd>
                                <label class="name">
                                    <i class="icon card2"></i>手&nbsp;&nbsp;机&nbsp;&nbsp;号</label>
                                <p class="text">{{detail.tel}}</p>
                            </dd>
                            <dd>
                                <label class="name">
                                    <i class="icon card3"></i>归&nbsp;&nbsp;属&nbsp;&nbsp;地</label>
                                <p class="text">{{detail.location}}</p>
                            </dd>
                            <dd>
                                <label class="name">
                                    <i class="icon card4"></i>所在位置</label>
                                <p class="text">{{detail.application_addr}}</p>
                            </dd>
                        </dl>
                    </div>
                    <ul class="data-text data-view">
                        <li class="li-radio">
                            <label class="name">审核结果</label>
                            <div class="input-warp">
                                <label class="radio-warp " :class="{'radio-active':option==1}" @click="radio(1)" for="sendBatch">
                                    <input type="radio" name="sendMode" class="radio" id="sendBatch" value="sendBatch" checked="checked">
                                    <i class="icon"></i>
                                    <span class="radioname">通过</span>
                                    <ul class="data-in">
                                        <li>
                                            <span>线索单价</span>
                                            <input class="text" v-model="clue_price" type="text">
                                            <span>/条</span>
                                        </li>
                                        <li>
                                            <span>话费单价</span>
                                            <input class="text" v-model="call_price" type="text">
                                            <span>/分钟</span>
                                        </li>
                                        <li>
                                            <span>坐席单价</span>
                                            <input class="text" v-model="seat_price" type="text">
                                            <span>/个/月</span>
                                        </li>
                                    </ul>
                                    <p v-if="price_error" class="error">{{price_error}}</p>
                                </label>
                                <label class="radio-warp" :class="{'radio-active':option==2}" @click="radio(2)" for="sendSingle">
                                    <input type="radio" name="sendMode" class="radio" id="sendSingle" value="sendSingle">
                                    <i class="icon"></i>
                                    <span class="radioname">拒绝</span>
                                    <div class="data-textarea">
                                        <span>拒绝原因</span>
                                        <textarea v-model="reason"></textarea>
                                    </div>
                                    <p v-if="reason_error" class="error">{{reason_error}}</p>
                                </label>
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
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import alert from 'components/dialog/alert'
    export default {
        data: function () {
            return {
                detail: {
                    company: '',
                    created_at: '',
                    client_status: '',
                    balance: '',
                    balance_alarm: '',
                    user: '',
                    type: '',
                    legal: '',
                    scope: '',
                    store_addr: '',
                    licence: '',
                    qualification: '',
                    user_name: '',
                    mail: '',
                    tel: '',
                    location: '',
                    application_addr: ''
                },
                option: 1,
                clue_price: '',
                call_price: '',
                seat_price: '',
                price_error: '',
                reason: '',
                reason_error: ''
            }
        },
        components: {
            alert
        },
        methods: {
            radio(num) {
                this.option = num
            },
            submit() {
                if (this.option == 1) {
                    if (!this.clue_price) {
                        this.price_error = '线索单价必填'
                        return false
                    } else if (!this.call_price) {
                        this.price_error = '话费单价必填'
                        return false
                    } else if (!this.seat_price) {
                        this.price_error = '坐席单价必填'
                        return false
                    } else {
                        if (isNaN(this.clue_price) || isNaN(this.call_price) || isNaN(this.seat_price)) {
                            this.price_error = '单价必须是数值'
                            return false
                        } else {
                            this.price_error = ''
                        }
                    }
                } else {
                    if (!this.reason) {
                        this.reason_error = '请填写拒绝原因'
                        return false
                    } else {
                        this.reason_error = ''
                    }
                }
                let _this = this
                mAjax(this, {
                    url: API.customer_check,
                    data: {
                        id: this.$route.params.id,
                        clue_price: this.clue_price,
                        tel_price: this.call_price,
                        seat_price: this.seat_price,
                        audit_status: this.option,
                        audit_advice: this.reason
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.$refs.alert.$emit('show', '提交成功', () => {
                                _this.$router.replace('/customer/index')
                            })
                        } else {
                            _this.$refs.alert.$emit('show', data.message)
                        }
                    }
                })
            }
        },
        created: function () {
            let id = this.$route.params.id
            mAjax(this, {
                url: API.customer_detail_by_operate,
                data: {
                    id: id
                },
                success: data => {
                    if (data.code == 200) {
                        this.detail = data.data
                    } else {
                        this.$refs.alert.$emit('show', data.message)
                    }
                }
            })
        }
    }

</script>