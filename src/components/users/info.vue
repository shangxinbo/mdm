<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">我的账号</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text data-view">
                        <li>
                            <label class="name">账号</label>
                            <div class="input-warp">
                                <p class="text">{{user}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">代理名称</label>
                            <div class="input-warp">
                                <p class="text">{{name}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">联系人姓名</label>
                            <div class="input-warp">
                                <p class="text">{{username}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">邮箱</label>
                            <div class="input-warp">
                                <p class="text">{{email}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">手机号</label>
                            <div class="input-warp">
                                <p class="text">{{tel}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">归属地</label>
                            <div class="input-warp">
                                <p class="text">{{addr}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">所在位置</label>
                            <div class="input-warp">
                                <p class="text">{{self_addr}}</p>
                            </div>
                        </li>
                    </ul>
                </form>
                <div class="btn-warp">
                    <a class="btn blue" href="javascript:void(0);" @click="showChangeInfo">修改账号信息</a>
                </div>
            </div>
        </div>
        <changeInfo ref="changeInfo"></changeInfo>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import changeInfo from './dialog/changeInfo'
    
    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                user: '',
                id: user.id,
                name:'',
                username: '',
                email: '',
                tel: '',
                addr: '',
                self_addr: ''
            }
        },
        components:{
            changeInfo
        },
        methods:{
            showChangeInfo(){
                this.$refs.changeInfo.$emit('show',this.$data)
            }
        },
        created() {
            this.$ajax({
                url: API.agent_my_info,
                data: {
                    id: this.id
                },
                success: data => {
                    this.user = data.data.user
                    this.name = data.data.name
                    this.username = data.data.user_name
                    this.email = data.data.mail
                    this.tel = data.data.tel
                    this.addr = data.data.regoin
                    this.self_addr = data.data.application_addr
                }
            })
        }
    }
</script>