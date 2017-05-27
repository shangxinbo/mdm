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
                    <p  class="error">{{money_error}}</p>
                </li>
                <li>
                    <label>话费单价</label>
                    <div class="unit-warp">
                        <span>&yen;</span>
                        <input class="text" type="text" v-model="call">
                        <span>/分钟</span>
                    </div>
                    <p class="error">{{money_error}}</p>
                </li>
                <li>
                    <label>坐席单价</label>
                    <div class="unit-warp">
                        <span>&yen;</span>
                        <input class="text" type="text" v-model="seat">
                        <span>/个/月</span>
                    </div>
                    <p class="error">{{money_error}}</p>
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
        data(){
            return {
                style: 'none',
                id:'',
                clue:'',
                call:'',
                seat:''
            }
        },
        methods:{
            sure(){
                let _this = this
                
                //表单验证格式


                mAjax(this, {
                    url: API.add_seat,
                    data: {
                        id: this.id,
                        clue: this.clue,
                        call: this.call,
                        seat:this.seat
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            _this.$store.commit('SHOW_TOAST', '价格已做调整')
                        } else {
                            _this.add_error = data.message
                        }
                    },
                    error: err => {
                        console.log(err)
                    }
                })
            },
            close(){
                this.style="block"
                this.$store.commit('HIDE_LAYER')
            }
        },
        created(){
            let _this = this
            this.$on('show', function (id, company, balance) {
                _this.id = id
                // _this.money = ''
                // _this.money_error = ''
                // _this.company = company
                // _this.balance = balance
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')

            })
        }
    }
</script>