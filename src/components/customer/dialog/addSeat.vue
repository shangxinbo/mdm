<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div v-show="loadNow" style="position: absolute;background: rgba(255,255,255,0.5);width: 100%;height: 100%;z-index: 100;border-radius: 10px;">           
            <img style="position:absolute;top:50%;left:50%;margin-left:-50px;" :src="loading" />
            <div style="position: absolute;top: 50%;left: 50%;width: 200px;text-align: center;margin-left: -100px;margin-top: 16px;font-size: 15px;color: #808080;">正在加载中…</div>
        </div>
        <div class="dialog-header">
            <h4>新开坐席</h4>
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
                    <label>现有坐席</label>
                    <div class="input-warp">
                        <p class="text">{{seat}}</p>
                    </div>
                </li>
                <li>
                    <label>新开坐席</label>
                    <mselect ref="seatNumSelect" addClass="seat-select" :initlist="numList" hideAll="true" :id="num" @change="getSeatNum"></mselect>
                </li>
                <li>
                    <label>新开费用</label>
                    <div class="input-warp">
                        <p class="text f18">&yen;{{price * num}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="error-warp" v-if="add_error"><p class="error">{{add_error}}</p></div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="sure">开通</a>
            <a class="btn" href="javascript:void(0);" @click="close">取消</a>
        </div>
    </div>
</template>
<script>
    import { mAjax, isEmail, isRealPhone } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import loading from 'assets/img/loading.gif'

    export default {
        data() {
            return {
                style: 'none',
                company: '',
                seat: '',
                price: '',
                add: '',
                num:1,
                add_error: '',
                numList: [
                    {id:"1",name:"1"},
                    {id:"2",name:"2"},
                    {id:"3",name:"3"},
                    {id:"4",name:"4"},
                    {id:"5",name:"5"},
                    {id:"6",name:"6"},
                    {id:"7",name:"7"},
                    {id:"8",name:"8"},
                    {id:"9",name:"9"},
                    {id:"10",name:"10"}
                ],
                loading:loading,
                loadNow:false
            }
        },
        computed: {
            allPrice() {
                if (this.$refs.seatNumSelect) {
                    return this.$refs.seatNumSelect.selected.id * this.price
                } else {
                    return 0
                }
            }
        },
        methods: {
            getSeatNum(value){
                this.num = value.id
            },
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure() {
                let _this = this
                this.loadNow = true
                mAjax(this, {
                    url: API.add_seat,
                    data: {
                        id: this.id,
                        new_seat_num: this.$refs.seatNumSelect.selected.id
                    },
                    success: data => {
                        this.loadNow = false
                        if (data.code == 200) {
                            _this.close()
                            _this.$store.commit('SHOW_TOAST', '新开坐席成功')
                            _this.$router.replace('/customer/index')    //TODO 刷新页面
                        } else {
                            _this.add_error = data.message
                        }
                    },
                    error: err => {
                        this.loadNow = false
                        _this.add_error = err.toString()
                    }
                })
            }
        },
        created() {
            let _this = this
            this.$on('show', function (id, company, seat, price) {
                _this.add = ''
                _this.add_error = ''
                _this.id = id
                _this.company = company
                _this.seat = seat
                _this.price = price
                _this.num = 1
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')

            })
        },
        components: {
            mselect
        }
    }

</script>