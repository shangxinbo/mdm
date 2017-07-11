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
                                <p class="text" v-if="detail.audit_status==2">未通过</p>
                                <p class="text" v-else-if="detail.audit_status==1">已通过</p>
                                <p class="text" v-else>待审核</p>
                            </div>
                        </li>
                        <li v-if="detail.audit_status==1">
                            <label class="name">余额</label>
                            <div class="input-warp">
                                <p class="text">&yen; {{detail.balance}}</p>
                                <p class="notice" v-if="detail.balance<detail.balance_alarm">
                                    <i class="icon"></i>客户余额不足，请尽快联系客户进行充值，以免影响客户正常使用</p>
                            </div>
                        </li>
                        <li v-if="detail.audit_status==2">
                            <label class="name">未通过原因</label>
                            <div class="input-warp">
                                <p class="text red">{{detail.audit_advice}}</p>
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
                                <p class="text">{{detail.type_name}}</p>
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
                                <p class="text" v-if="detail.licence">
                                    <a :href="detail.licence" target="_blank">查看</a>
                                </p>
                                <p class="text" v-else>--</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">其他资质</label>
                            <div class="input-warp">
                                <p class="text" v-if="detail.qualification">
                                    <a :href="detail.qualification" target="_blank">查看</a>
                                </p>
                                <p class="text" v-else>--</p>
                            </div>
                        </li>
                        <li v-if="detail.audit_status!=2">
                            <label class="name">挂机短信</label>
                            <div class="input-warp">
                                <p class="text">{{detail.is_hang_up_message==1?'已开通':'未开通'}}</p>
                            </div>
                        </li>
                        <li v-if="detail.audit_status!=2">
                            <label class="name">线索单价</label>
                            <div class="input-warp">
                                <p class="text">￥{{detail.clue_price}}/条</p>
                            </div>
                        </li>
                        <li v-if="detail.audit_status!=2">
                            <label class="name">话费单价</label>
                            <div class="input-warp">
                                <p class="text">￥{{detail.tel_price}}/分钟</p>
                            </div>
                        </li>
                        <li v-if="detail.audit_status!=2">
                            <label class="name">坐席单价</label>
                            <div class="input-warp">
                                <p class="text">￥{{detail.seat_price}}/个/月</p>
                            </div>
                        </li>
                        <li v-if="detail.audit_status!=2">
                            <label class="name">挂机短信单价</label>
                            <div class="input-warp">
                                <p class="text">￥{{detail.hang_up_message_price}}/条</p>
                            </div>
                        </li>
                    </ul>
                </form>
                <div class="btn-warp" v-if="userType==2&&detail.audit_status==2">
                    <router-link class="btn blue" :to="'/customer/add/'+ detail.id">重新申请</router-link>
                </div>
                <div class="data-card">
                    <div class="title">联系人信息</div>
                    <a class="btn blue" v-if="userType==2&&detail.audit_status==1" href="javascript:void(0);" @click="showEditDialog">
                        <span>
                            <i class="icon edit"></i>修改</span>
                    </a>
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
                        <dd v-if="detail.location">
                            <label class="name">
                                <i class="icon card3"></i>归&nbsp;&nbsp;属&nbsp;&nbsp;地</label>
                            <p class="text">{{detail.location}}</p>
                        </dd>
                        <dd v-if="detail.application_addr">
                            <label class="name">
                                <i class="icon card4"></i>所在位置</label>
                            <p class="text">{{detail.application_addr}}</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <editDialog ref="editDialog" @success="editOver"></editDialog>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import editDialog from './dialog/changeInfo'

    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                detail: {
                    id: '',
                    company: '',
                    created_at: '',
                    balance: '',
                    audit_status: '',
                    balance_alarm: '',
                    user: '',
                    type_name: '',
                    legal: '',
                    scope: '',
                    store_addr: '',
                    licence: '',
                    qualification: '',
                    user_name: '',
                    mail: '',
                    tel: '',
                    location: '',
                    application_addr: '',
                    is_hang_up_message:0,
                    hang_up_message_price:''
                },
                userType: user.type
            }
        },
        components: {
            editDialog,
        },
        methods: {
            showEditDialog() {
                this.$refs.editDialog.$emit('show', this.$route.params.id)
            },
            editOver() {
                let _this = this
                this.$toast('修改信息成功', () => {
                    let user = JSON.parse(localStorage.getItem('user'))
                    if (user.type == 3) {
                        _this.$router.push('/project/index')
                    } else {
                        _this.$router.replace('/customer/index')
                    }
                })
            }
        },
        created() {
            let id = this.$route.params.id
            let api = this.userType == 1 ? API.customer_detail_by_operate : API.customer_detail
            mAjax(this, {
                url: api,
                data: {
                    id: id
                },
                success: data => {
                    if (data.code == 200) {
                        this.detail = data.data
                    } else {
                        this.$toast(data.message)
                    }
                }
            })
        }
    }

</script>