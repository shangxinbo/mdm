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
    export default {
        data: function () {
            return {
                offsetLeft: '0px',
                offsetTop: '0px'
            }
        },
        computed: {
            msg: function () {
                return this.$store.state.toast.msg
            },
            during: function () {
                return this.$store.state.toast.during
            }
        },
        watch: {
            msg: function (newVal, oldVal) {
                if (!oldVal && newVal) {
                    this.$store.commit('SHOW_LAYER')
                    if (this.during > 0) {
                        setTimeout(() => {
                            this.$store.commit('HIDE_TOAST')
                            this.$store.commit('HIDE_LAYER')
                            window.location.reload()
                        }, this.during)
                    }
                }
            }
        },
        updated: function () {
            let dialog = this.$el
            let dh = dialog.offsetHeight, dw = dialog.offsetWidth
            this.offsetLeft = -dw / 2 + 'px'
            this.offsetTop = -dh / 2 + 'px'
        }
    }

</script>