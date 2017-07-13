<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭" @click="close"></a>
        <div class="dialog-header">
            <h4>修改密码</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>原密码</label>
                    <div class="input-warp">
                        <input class="text" type="password" v-model="oldpass">
                        <p v-show="old_error" class="error">{{old_error}}</p>
                    </div>
                </li>
                <li>
                    <label>新密码</label>
                    <div class="input-warp">
                        <input class="text" type="password" v-model="newpass">
                        <p v-show="new_error" class="error">{{new_error}}</p>
                    </div>
                </li>
                <li>
                    <label>确认密码</label>
                    <div class="input-warp">
                        <input class="text" type="password" v-model="repeat">
                        <p v-show="repeat_error" class="error">{{repeat_error}}</p>
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
    import API from 'src/services/api'
    import REGULAR from 'src/services/reg'
    export default {
        data: function () {
            return {
                oldpass: '',
                old_error: '',
                newpass: '',
                new_error: '',
                repeat: '',
                repeat_error: ''
            }
        },
        computed: {
            style: function () {
                return this.$store.state.changeMypassDialogShow ? 'block' : 'none'
            }
        },
        watch: {
            style: function (newVal, oldVal) {
                if (newVal == 'block') {
                    this.oldpass = ''
                    this.old_error = ''
                    this.newpass = ''
                    this.new_error = ''
                    this.repeat = ''
                    this.repeat_error = ''
                    this.$store.commit('SHOW_LAYER')
                }
            }
        },
        methods: {
            close: function () {
                this.$store.commit('HIDE_CHANGEPASS')
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                let reg = /^[a-zA-Z0-9]{6,18}$/
                if (!this.oldpass) {
                    this.old_error = '请填写旧密码'
                    return false
                } else {
                    this.old_error = ''
                }
                if (!this.newpass) {
                    this.new_error = '请填写新密码'
                    return false
                } else {
                    if (REGULAR.password.patten1.test(this.newpass)
                        && REGULAR.password.patten2.test(this.newpass)
                        && REGULAR.password.patten3.test(this.newpass)
                        && REGULAR.password.patten4.test(this.newpass)) {
                        this.new_error = ''
                        if (this.repeat == this.newpass) {
                            this.repeat_error = ''
                        } else {
                            this.repeat_error = '两次密码不同'
                            return false
                        }
                    } else {
                        this.new_error = '密码需是英文大小写加数字6~16位'
                        return false
                    }
                }
                this.$ajax({
                    url: API.update_pass,
                    data: {
                        oigrin_pwd: this.oldpass,
                        new_pwd: this.newpass,
                        confirm_pwd: this.repeat
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.close()
                            this.$toast('修改密码成功', () => window.location.reload())
                        } else {
                            this.repeat_error = data.message
                        }
                    }
                })
            }
        }
    }

</script>