<template>
    <div class="dialog" :style="{display:style,'margin-left':offsetLeft,'margin-top':offsetTop}">
        <div class="dialog-body">
            <div class="pop-default">
                <p>
                    <span>{{msg}}</span>
                </p>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="btn green" @click="sure" type="button">确定</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: '',
                style: 'none',
                callback: '',
                offsetLeft: 0,
                offsetTop: 0
            }
        },
        methods: {
            sure() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
                if (this.callback) this.callback()
            },
            show(msg, callback) {

                let _this = this
                this.msg = msg
                this.style = 'block'
                this.$store.commit('SHOW_LAYER')

                this.$nextTick(() => {
                    let dialog = _this.$el
                    let dh = dialog.offsetHeight, dw = dialog.offsetWidth
                    _this.offsetLeft = -dw / 2 + 'px'
                    _this.offsetTop = -dh / 2 + 'px'
                })

                if (callback) {
                    this.callback = callback
                } else {
                    this.callback = ''
                }

            }
        }
    }

</script>