<template>
    <div class="dialog" :style="{display:style,'margin-left':offsetLeft,'margin-top':offsetTop}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-body">
            <div class="pop-default">
                <p>
                    <span>{{msg}}</span>
                </p>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="btn green" @click="sure" type="button">确定</button>
            <button class="btn" type="button" @click="close">取消</button>
        </div>
    </div>
</template>
<script>
    import store from 'src/vuex/store'
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
            close() {
                this.style = 'none'
                store.commit('HIDE_LAYER')
            },
            sure() {
                this.close()
                if (this.callback) {
                    this.callback()
                }
            },
            show(msg, callback) {
                this.msg = msg
                this.style = 'block'
                store.commit('SHOW_LAYER')
                if (callback) {
                    this.callback = callback
                } else {
                    this.callback = ''
                }
            }
        },
        updated() {
            let dialog = this.$el
            let dh = dialog.offsetHeight, dw = dialog.offsetWidth
            this.offsetLeft = -dw / 2 + 'px'
            this.offsetTop = -dh / 2 + 'px'
        }
    }

</script>