<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>充值</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>客户名称</label>
                    <div class="input-warp">
                        <p class="text">{{company}}</p>
                    </div>
                </li>
                <li>
                    <label>余额</label>
                    <div class="input-warp">
                        <p class="text">&yen; {{balance}}</p>
                    </div>
                </li>
                <li class="li-notice">
                    <label>充值金额</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="money">
                        <p class="notice">
                            <i class="icon"></i>请务必与财务确认充值金额已到账
                        </p>
                        <p v-if="money_error" class="error">{{money_error}}</p>
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
                company: '',
                balance: '',
                money: '',
                money_error: '',
                ajax:false
            }
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                if (!this.money) {
                    this.money_error = '重置金额不能为空'
                    return false
                } else {
                    if (isNaN(this.money) || this.money <= 0) {
                        this.money_error = '输入不合法'
                        return false
                    }
                }
                if(this.ajax) return false
                this.ajax = true
                let _this = this
                mAjax(this, {
                    url: API.recharge,
                    data: {
                        id: this.id,
                        amount: this.money
                    },
                    success: data => {
                        this.ajax = false
                        if (data.code == 200) {
                            _this.close()
                            _this.$store.commit('SHOW_TOAST', '充值成功')
                            _this.$router.replace('/customer/index') //TODO 刷新页面
                        } else {
                            _this.money_error = data.message
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
            this.$on('show', function (id, company, balance) {
                _this.id = id
                _this.money = ''
                _this.money_error = ''
                _this.company = company
                _this.balance = balance
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')

            })
        },
    }

</script>