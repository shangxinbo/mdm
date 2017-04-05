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
                        <input class="text" type="password" v-model="newpass" />
                    </div>
                    <p v-show="newpass_error" class="error">{{newpass_error}}</p>
                </li>
                <li>
                    <label>确认密码</label>
                    <div class="input-warp">
                        <input class="text" type="password" v-model="repass" />
                    </div>
                    <p v-show="repass_error" class="error">{{repass_error}}</p>
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
                id: '',
                newpass:'',
                newpass_error:'',
                repass:'',
                repass_error:''
            }
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.user = ''
                this.id = ''
                this.newpass = ''
                this.repass = ''
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                let reg = /^[a-zA-Z0-9]{6,18}$/
                if(!this.newpass){
                    this.newpass_error = '请填写新密码'
                    return false
                }else{
                    if(reg.test(this.newpass)){
                        this.newpass_error = ''
                        if(this.repass==this.newpass){
                            this.repass_error = ''
                        }else{
                            this.repass_error = '两次密码不同'
                            return false
                        }
                    }else{
                        this.newpass_error = '密码需是英文大小写加数字6~18位'
                        return false
                    }
                }
                let _this = this
                mAjax(this, {
                    url: API.reset_operate_pass,
                    data:{
                        id:this.id,
                        new_pwd:this.newpass,
                        confirm_pwd:this.repass
                    },
                    success: data => {
                        _this.close()
                        _this.$store.commit('SHOW_TOAST','密码重置成功')
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