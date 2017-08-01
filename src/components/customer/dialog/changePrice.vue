<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-402px;margin-top:-172px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>客户调价</h4>
        </div>
        <div class="dialog-body">
            <div class="data-marketing check-warp">
                <dl class="data-section">
                    <dd>
                        <ul class="query-warp">
                            <li>
                                <label>线索单价</label>
                                <div class="unit-warp">
                                    <span>&yen;</span>
                                    <input class="text" type="text" v-model="clue">
                                    <span>/条</span>
                                </div>
                                <p v-show="error_clue" class="error">{{error_clue}}</p>
                            </li>
                            <li>
                                <label>话费单价</label>
                                <div class="unit-warp">
                                    <span>&yen;</span>
                                    <input class="text" type="text" v-model="call">
                                    <span>/分钟</span>
                                </div>
                                <p v-show="error_call" class="error">{{error_call}}</p>
                            </li>
                            <li>
                                <label>坐席单价</label>
                                <div class="unit-warp">
                                    <span>&yen;</span>
                                    <input class="text" type="text" v-model="seat">
                                    <span>/个/月</span>
                                </div>
                                <p v-show="error_seat" class="error">{{error_seat}}</p>
                            </li>
                            <li class="hang" :class="{checked:sms}">
                                <div class="hang-check">
                                    <i class="icon" @click="chooseSms"></i>
                                    <span>开通挂机短信</span>
                                </div>
                                <div class="unit-warp hang-input">
                                    <span class="name">挂机短信单价</span>
                                    <span class="sign">&yen;</span>
                                    <input class="text" v-model="sms_price" type="text">
                                    <span>/条</span>
                                </div>
                                <p v-show="error_sms" class="error">{{error_sms}}</p>
                            </li>
                        </ul>
                    </dd>
                    <dd>
                        <div class="fs16">通知设置</div>
                        <ul class="data-inline">
                            <li>
                                <span>余额不足</span>
                                <span class="sign">¥</span>
                                <input class="text" v-model="threshold" type="text">
                                <span>时，通知客户</span>
                            </li>
                        </ul>
                        <p v-show="threshold_error" class="error">{{threshold_error}}</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="sure">确定</a>
            <a class="btn" href="javascript:void(0);" @click="close">取消</a>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    export default {
        data() {
            return {
                style: 'none',
                id: '',
                clue: '',
                call: '',
                seat: '',
                error_clue: '',
                error_call: '',
                error_seat: '',
                error_sms: '',
                sms: 0,
                sms_price: '',
                old_sms: 0,
                threshold: '',
                threshold_error: ''
            }
        },
        methods: {
            sure() {
                this.error_clue = ''
                this.error_call = ''
                this.error_seat = ''

                //表单验证格式
                if (!this.clue || isNaN(this.clue) || this.clue < 0) {
                    this.error_clue = '单价格式不正确'
                    return false
                } else {
                    if (this.clue > 999.99) {
                        this.error_clue = '单价值过大，请保证单价值小于999.99'
                        return false
                    }
                }
                if (!this.call || isNaN(this.call) || this.call < 0) {
                    this.error_call = '单价格式不正确'
                    return false
                } else {
                    if (this.call > 99.99) {
                        this.error_call = '单价值过大，请保证单价值小于99.99'
                        return false
                    }
                }
                if (!this.seat || isNaN(this.seat) || this.seat < 0) {
                    this.error_seat = '单价格式不正确'
                    return false
                } else {
                    if (this.seat > 9999.99) {
                        this.error_seat = '单价值过大，请保证单价值小于9999.99'
                        return false
                    }
                }

                if (this.sms) {
                    if (!this.sms_price || isNaN(this.sms_price) || this.sms_price < 0) {
                        this.error_sms = '单价格式不正确'
                        return false
                    } else {
                        if (this.sms_price > 999.99) {
                            this.error_sms = '单价值过大，请保证单价值小于999.99'
                            return false
                        }
                    }
                }

                if (!this.threshold) {
                    this.threshold_error = '请填写余额通知阈值'
                    return false
                } else {
                    if (isNaN(this.threshold) || this.threshold < 0 || parseInt(this.threshold) != this.threshold) {
                        this.threshold_error = '阈值是大于等于零的数值'
                        return false
                    } else {
                        this.threshold_error = ''
                    }
                }


                this.$ajax({
                    url: API.change_price,
                    data: {
                        id: this.id,
                        clue_price: this.clue.toString().trim(),
                        tel_price: this.call.toString().trim(),
                        seat_price: this.seat.toString().trim(),
                        is_hang_up_message: this.sms,
                        hang_up_message_price: this.sms_price,
                        balance_alarm: this.threshold
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.close()
                            this.$toast('价格已做调整', () => {
                                window.location.reload()
                            })
                        } else {
                            this.error_seat = data.message
                        }
                    }
                })
            },
            close() {
                this.style = "none"
                this.$store.commit('HIDE_LAYER')
            },
            chooseSms() {
                if (this.old_sms == 0) {
                    if (this.sms) {
                        this.sms = 0
                    } else {
                        this.sms = 1
                    }
                }
            }
        },
        created() {
            this.$on('show', (id, seat, clue, call, sms, sms_price,threshold) => {
                this.id = id
                this.clue = clue ? Number(clue) : ''
                this.call = call ? Number(call) : ''
                this.seat = seat ? Number(seat) : ''
                this.error_clue = ''
                this.error_call = ''
                this.error_seat = ''
                this.sms = sms
                this.old_sms = sms
                this.sms_price = sms_price
                this.threshold = threshold
                this.style = 'block'
                this.$store.commit('SHOW_LAYER')
            })
        }
    }

</script>