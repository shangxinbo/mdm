<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div>
        <div class="navbox">
            <h1>
                <a href="#" title="geo方舟公有云" class="logo">
                    <img :src="logo" alt="geo方舟公有云" />
                </a>
            </h1>
        </div>
        <div class="warp" @keyup.enter="submit">
            <div class="main">
                <div class="title-warp">修改密码</div>
                <div class="data-detail">
                    <form>
                        <ul class="data-text">
                            <li>
                                <label class="name">原密码</label>
                                <div class="input-warp">
                                    <input class="text" type="password" v-model="oldpass">
                                    <p v-show="old_error" class="error">{{old_error}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">新密码</label>
                                <div class="input-warp">
                                    <input class="text" type="password" v-model="newpass">
                                    <p class="tips">英文大小写加数字字符6-16位</p>
                                    <p v-show="new_error" class="error">{{new_error}}</p>
                                </div>
                            </li>
                            <li>
                                <label class="name">确认密码</label>
                                <div class="input-warp">
                                    <input class="text" type="password" v-model="repeat">
                                    <p v-show="repeat_error" class="error">{{repeat_error}}</p>
                                </div>
                            </li>
                            <li class="li-btn">
                                <div class="input-warp">
                                    <button class="btn blue" type="button" @click=submit>提交</button>
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
        <div id="shadowLayer" v-if="layer"></div>
        <toast ref="toast"></toast>
    </div>
</template>
<script>
    import logo from 'assets/img/logo.png'
    import API from 'src/services/api'
    import REG from 'src/services/reg'
    import toast from 'components/utils/toast'
    export default {
        data() {
            return {
                logo: logo,
                oldpass: '',
                old_error: '',
                newpass: '',
                new_error: '',
                repeat: '',
                repeat_error: ''
            }
        },
        components:{
            toast
        },
        computed: {
            layer() {
                return this.$store.state.showLayer
            }
        },
        methods: {
            submit: function () {
                if (this.layer) {
                    return false
                }

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
                    if (this.newpass == this.oldpass) {
                        this.new_error = '新密码与旧密码不能相同'
                        return false
                    } else if (REG.password.patten1.test(this.newpass) && REG.password.patten2.test(this.newpass) && REG.password.patten3.test(this.newpass) && REG.password.patten4.test(this.newpass)) {
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
                            this.$refs.toast.show('修改密码成功', () => {
                                this.$router.replace('/')
                            })
                        } else {
                            this.repeat_error = data.message
                        }
                    }
                })
            }
        }
    }

</script>