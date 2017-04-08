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
        <div class="warp">
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
                                    <p class="tips">英文大小写加数字字符6-18位</p>
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
        <alert ref="alert"></alert>
        <div id="shadowLayer" v-if="layer"></div>
    </div>
</template>
<script>
    import logo from 'assets/img/logo.png'
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import alert from 'components/dialog/alert'
    export default {
        data: function () {
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
        computed:{
            layer:function(){
                return this.$store.state.showLayer
            }
        },
        components:{
            alert
        },
        methods: {
            submit: function () {
                let reg = /^[a-zA-Z0-9]{6,18}$/
                if (!this.oldpass) {
                    this.old_error = '请填写旧密码'
                    return false
                }else{
                    this.old_error = ''
                }
                if (!this.newpass) {
                    this.new_error = '请填写新密码'
                    return false
                } else {
                    if (reg.test(this.newpass)) {
                        this.new_error = ''
                        if (this.repeat == this.newpass) {
                            this.repeat_error = ''
                        } else {
                            this.repeat_error = '两次密码不同'
                            return false
                        }
                    } else {
                        this.new_error = '密码需是英文大小写加数字6~18位'
                        return false
                    }
                }
                let _this = this
                mAjax(this, {
                    url: API.update_pass,
                    data: {
                        oigrin_pwd: this.oldpass,
                        new_pwd: this.newpass,
                        confirm_pwd: this.repeat
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.$refs.alert.$emit('show', '修改密码成功',()=>{
                                _this.$router.replace('/')
                            })
                        } else {
                            _this.$refs.alert.$emit('show', data.message)
                        }
                    },
                    error: err => {
                        console.log(err)
                    }
                })
            }
        }
    }
</script>