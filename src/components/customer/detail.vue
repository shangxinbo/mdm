<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{detail.company}}</div>
            <div class="data-detail card-warp">
                <form>
                    <ul class="data-text data-view">
                        <li>
                            <label class="name">创建时间</label>
                            <div class="input-warp">
                                <p class="text">{{detail.created_at}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">客户状态</label>
                            <div class="input-warp">
                                <p class="text">{{detail.client_status}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">余额</label>
                            <div class="input-warp">
                                <p class="text">&yen; {{detail.balance}}</p>
                                <p class="notice" v-if="detail.balance<=detail.balance_alarm">
                                    <i class="icon"></i>客户余额不足，请尽快联系客户进行充值，以免影响客户正常使用</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">账号</label>
                            <div class="input-warp">
                                <p class="text">{{detail.user}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">客户类型</label>
                            <div class="input-warp">
                                <p class="text">{{detail.type}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">法人</label>
                            <div class="input-warp">
                                <p class="text">{{detail.legal}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">经营范围</label>
                            <div class="input-warp">
                                <p class="text">{{detail.scope}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">办公地点</label>
                            <div class="input-warp">
                                <p class="text">{{detail.store_addr}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">营业执照</label>
                            <div class="input-warp">
                                <p class="text">
                                    <a :href="detail.licence" target="_blank">查看</a>
                                </p>
                            </div>
                        </li>
                        <li>
                            <label class="name">其他资质</label>
                            <div class="input-warp">
                                <p class="text">
                                    <a :href="detail.qualification" target="_blank">查看</a>
                                </p>
                            </div>
                        </li>
                    </ul>
                </form>
                <div class="data-card">
                    <div class="title">联系人信息</div>
                    <dl>
                        <dt>{{detail.user_name}}</dt>
                        <dd>
                            <label class="name">
                                <i class="icon card1"></i>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
                            <p class="text">{{detail.mail}}</p>
                        </dd>
                        <dd>
                            <label class="name">
                                <i class="icon card2"></i>手&nbsp;&nbsp;机&nbsp;&nbsp;号</label>
                            <p class="text">{{detail.tel}}</p>
                        </dd>
                        <dd>
                            <label class="name">
                                <i class="icon card3"></i>归&nbsp;&nbsp;属&nbsp;&nbsp;地</label>
                            <p class="text">{{detail.location}}</p>
                        </dd>
                        <dd>
                            <label class="name">
                                <i class="icon card4"></i>所在位置</label>
                            <p class="text">{{detail.application_addr}}</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        data:function(){
            return {
                detail:{
                    company:'',
                    created_at:'',
                    client_status:'',
                    balance:'',
                    balance_alarm:'',
                    user:'',
                    type:'',
                    legal:'',
                    scope:'',
                    store_addr:'',
                    licence:'',
                    qualification:'',
                    user_name:'',
                    mail:'',
                    tel:'',
                    location:'',
                    application_addr:''
                }
            }
        },
        created:function(){
            let id = this.$route.params.id
            mAjax(this,{
                url:API.customer_detail_by_operate,
                data:{
                    id:id
                },
                success:data => {
                    if(data.code==200){
                        this.detail = data.data
                    }
                }
            })
        }
    }
</script>