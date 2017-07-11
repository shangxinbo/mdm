<template>
    <div class="dialog tips-succ" :style="{display:msg?'block':'none','margin-left':offsetLeft,'margin-top':offsetTop}">
        <div class="dialog-body">
            <div class="pop-default">
                <p class="title">
                    <span>
                        <i class="icon succ"></i>{{msg}}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import store from 'src/vuex/store'
    export default {
        data() {
            return {
                offsetLeft: '0px',
                offsetTop: '0px',
                msg: ''
            }
        },
        updated() {
            let dialog = this.$el
            let dh = dialog.offsetHeight, dw = dialog.offsetWidth
            this.offsetLeft = -dw / 2 + 'px'
            this.offsetTop = -dh / 2 + 'px'
        },
        methods: {
            show(msg) {
                this.msg = msg
                store.commit('SHOW_LAYER')
            },
            close() {
                this.msg = ''
                store.commit('HIDE_LAYER')
            }
        }
    }

</script>