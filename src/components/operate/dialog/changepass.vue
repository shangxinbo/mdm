<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-259px','margin-top':'-181px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>重置密码</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>账号</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" disabled="disabled" :value="user" />
                    </div>
                </li>
                <li>
                    <label>新密码</label>
                    <div class="input-warp">
                        <input class="text" type="text" value="" />
                    </div>
                </li>
                <li>
                    <label>确认密码</label>
                    <div class="input-warp">
                        <input class="text" type="text" value="" />
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
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        data: function () {
            return {
                style: 'none',
                user: '',
                id: ''
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
                    url: API.reset_operate_pass,
                    success: data => {
                        _this.close()
                        _this.$store.commit('SHOW_TOAST','修改成功')
                    },
                    error: err => {
                        console.log(err)
                    }
                })
            }
        },
        created: function () {
            let _this = this
            this.$on('show', function (id, user) {
                _this.style = 'block'
                _this.user = user ? user : ''
                _this.id = id
                _this.$store.commit('SHOW_LAYER')
            })
        },
    }

</script>