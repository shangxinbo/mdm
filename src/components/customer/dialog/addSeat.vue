<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
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
                    <mselect ref="seatNumSelect" addClass="seat-select" :initlist="numList" hideAll="true" id="1"></mselect>
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
    import mselect from 'components/utils/select'

    export default {
        data: function () {
            return {
                style: 'none',
                company: '',
                seat: '',
                add: '',
                add_error: '',
                numList:{
                    "1":"1",
                    "2":"2",
                    "3":"3",
                    "4":"4",
                    "5":"5",
                    "6":"6",
                    "7":"7",
                    "8":"8",
                    "9":"9",
                    "10":"10"
                }
            }
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                let _this = this
                mAjax(this, {
                    url: API.add_seat,
                    data: {
                        id: this.id,
                        new_seat_num: this.$refs.seatNumSelect.selected.id
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            _this.$store.commit('SHOW_TOAST', '新开坐席成功')
                            _this.$router.replace('/customer/index')    //TODO 刷新页面
                        } else {
                            _this.add_error = data.message
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
            this.$on('show', function (id, company, seat) {
                _this.add = ''
                _this.add_error = ''
                _this.id = id
                _this.company = company
                _this.seat = seat
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')

            })
        },
        components:{
            mselect
        }
    }

</script>