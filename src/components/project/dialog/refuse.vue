<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-body">
            <div class="pop-default">
                <p>
                    <span>确定要拒绝通过该项目？</span>
                </p>
            </div>
            <div class="data-textarea">
                <span>拒绝原因</span>
                <textarea v-model="message"></textarea>
                <p v-if="error" class="error">{{error}}</p>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="btn blue" type="button" @click="sure">确定</button>
            <button class="btn" type="button" @click="close">取消</button>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'

    export default {
        data: function () {
            return {
                style: 'none',
                message: '',
                error: ''
            }
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                if (!this.message) {
                    this.error = '拒绝原因必填'
                    return false
                }
                this.$ajax({
                    url: API.preject_audit,
                    data: {
                        id: this.id,
                        audit_result: -3,
                        audit_reason: this.message
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.close()
                            this.$toast('操作成功',()=>{
                                window.location.reload()
                            })
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            }
        },
        created: function () {
            this.$on('show', function (id) {
                this.id = id
                this.message = ''
                this.error = ''
                this.style = 'block'
                this.$store.commit('SHOW_LAYER')
            })
        }
    }

</script>