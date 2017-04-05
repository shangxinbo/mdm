<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">新建客户</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">账号</label>
                            <div class="input-warp">
                                <input class="text" v-model="user" type="text">
                                <p v-show="user_error" class="error">{{user_error}}</p>
                            </div>
                        </li>
                        <typeSelect ref="typeSelect"></typeSelect>
                        <li>
                            <label class="name">公司名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="company" type="text">
                                <p class="tips">务必与营业执照保持一致</p>
                                <p v-show="company_error" class="error">{{company_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">法人</label>
                            <div class="input-warp">
                                <input class="text" v-model="legal" type="text">
                                <p class="tips">务必与营业执照保持一致</p>
                                <p v-show="legal_error" class="error">{{legal_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">经营范围</label>
                            <div class="input-warp">
                                <input class="text" v-model="scope" type="text">
                                <p class="tips">务必与营业执照保持一致</p>
                                <p v-show="scope_error" class="error">{{scope_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">办公地点</label>
                            <div class="input-warp">
                                <input class="text long" v-model="addr" type="text">
                                <p v-show="addr_error" class="error">{{addr_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">营业执照</label>
                            <div class="input-warp">
                                <div class="file-box">
                                    <div class="inputbox ">
                                        <span name="textfield" id="textfield" class="txt"></span>
                                        <div class="mainbox">
                                            <span class="button1">上传文件</span>
                                            <span class="button2">重新上传</span>
                                            <input type="file" name="fileField" class="file" id="fileField" size="28">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="name">其他资质</label>
                            <div class="input-warp">
                                <div class="file-box">
                                    <div class="inputbox ">
                                        <span name="textfield" class="txt"></span>
                                        <div class="mainbox">
                                            <span class="button1">上传文件</span>
                                            <span class="button2">重新上传</span>
                                            <input type="file" name="fileField" class="file" size="28" onchange="sa(this.value)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="title-info">联系人信息</div>
                    <ul class="data-text">
                        <li>
                            <label class="name">姓名</label>
                            <div class="input-warp">
                                <input class="text" v-model="user_name" type="text">
                                <p v-show="user_name_error" class="error">{{user_name_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">邮箱</label>
                            <div class="input-warp">
                                <input class="text" v-model="email" type="text">
                                <p v-show="email_error" class="error">{{email_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">手机号</label>
                            <div class="input-warp">
                                <input class="text" v-model="tel" type="text">
                                <p v-show="tel_error" class="error">{{tel_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">归属地</label>
                            <div class="input-warp">
                                <input class="text" v-model="location" type="text">
                                <p v-show="location_error" class="error">{{location_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">所在位置</label>
                            <div class="input-warp">
                                <input class="text long" v-model="self_addr" type="text">
                                <p v-show="self_addr_error" class="error">{{self_addr_error}}</p>
                            </div>
                        </li>
                        <li class="li-btn">
                            <div class="input-warp">
                                <button class="btn blue" type="button" @click="submit">提交</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import typeSelect from './typeSelect'
    export default {
        data:function(){
            return {
                user:'',
                user_error:'',
                company:'',
                company_error:'',
                legal:'',
                legal_error:'',
                scope:'',
                scope_error:'',
                addr:'',
                addr_error:'',
                user_name:'',
                user_name_error:'',
                email:'',
                email_error:'',
                tel:'',
                tel_error:'',
                location:'',
                location_error:'',
                self_addr:'',
                self_addr_error:''
            }
        },
        computed:{
            type:function(){
                return this.$refs.typeSelect ? this.$refs.typeSelect.type.id : ''
            }
        },
        components:{
            typeSelect
        },
        methods:{
            submit(){
                //TODO add customer 
                //API.customer_add
            }
        }
    }

</script>