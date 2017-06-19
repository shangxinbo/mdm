<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>调价</h4>
        </div>
        <div class="dialog-body">
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
        data() {
            return {
                style: 'none',
                id: '',
                clue: '',
                call: '',
                seat: '',
                error_clue: '',
                error_call: '',
                error_seat: ''
            }
        },
        methods: {
            sure() {
                let _this = this
                this.error_clue = ''
                this.error_call = ''
                this.error_seat = ''

                //表单验证格式
                if (!this.clue||isNaN(this.clue) || this.clue < 0) {
                    this.error_clue = '单价格式不正确'
                    return false
                }else{
                    if(this.clue>999.99){
                        this.error_clue = '单价值过大，请保证单价值小于999.99'
                        return false
                    }
                }
                if (!this.call||isNaN(this.call) || this.call < 0) {
                    this.error_call = '单价格式不正确'
                    return false
                }else{
                    if(this.call>99.99){
                        this.error_call = '单价值过大，请保证单价值小于99.99'
                        return false
                    }
                }
                if (!this.seat||isNaN(this.seat) || this.seat < 0) {
                    this.error_seat = '单价格式不正确'
                    return false
                }else{
                    if(this.seat>9999.99){
                        this.error_seat = '单价值过大，请保证单价值小于9999.99'
                        return false
                    }
                }
                
                console.log(this.seat,this.call,this.clue)
                mAjax(this, {
                    url: API.change_price,
                    data: {
                        id: this.id,
                        clue_price: this.clue.toString().trim(),
                        tel_price: this.call.toString().trim(),
                        seat_price: this.seat.toString().trim()
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            _this.$store.commit('SHOW_TOAST', '价格已做调整')
                        } else {
                            _this.error_seat = data.message
                        }
                    },
                    error: err => {
                        console.log(err)
                    }
                })
            },
            close() {
                this.style = "none"
                this.$store.commit('HIDE_LAYER')
            }
        },
        created() {
            let _this = this
            this.$on('show', function (id, company, balance,seat,clue,call) {
                _this.id = id
                _this.clue = clue?Number(clue):''
                _this.call = call?Number(call):''
                _this.seat = seat?Number(seat):''
                _this.error_clue = ''
                _this.error_call = ''
                _this.error_seat = ''
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')

            })
        }
    }

</script>