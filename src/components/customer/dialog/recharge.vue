<template>
    <div class="dialog" id="recharge">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭"></a>
        <div class="dialog-header">
            <h4>充值</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>客户名称</label>
                    <div class="input-warp">
                        <p class="text">北京字节跳动科技有限公司</p>
                    </div>
                </li>
                <li>
                    <label>余额</label>
                    <div class="input-warp">
                        <p class="text">&yen; 888.88</p>
                    </div>
                </li>
                <li class="li-notice">
                    <label>充值金额</label>
                    <div class="input-warp">
                        <input class="text" type="text" value="">
                        <p class="notice">
                            <i class="icon"></i>请务必与财务确认充值金额已到账</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);">确定</a>
            <a class="btn" href="javascript:void(0);">取消</a>
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
                seat: '',
                add: '',
                add_error: ''
            }
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                if (isNaN(this.add)) {
                    this.add_error = '输入不合法'
                    return false
                }
                let _this = this
                mAjax(this, {
                    url: API.add_seat,
                    data: {
                        id: this.id,
                        new_seat_num: this.add
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            _this.$store.commit('SHOW_TOAST', '添加坐席成功')
                        } else {
                            //TODO  修改失败
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
                _this.id = id
                _this.company = company
                _this.seat = seat
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')

            })
        },
    }

</script>