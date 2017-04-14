<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">我的账号</div>
            <div class="data-detail card-warp">
                <form>
                    <ul class="data-text data-view">
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
                            <label class="name">公司名称</label>
                            <div class="input-warp">
                                <p class="text">{{detail.company}}</p>
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
                        <li v-if="detail.licence">
                            <label class="name">营业执照</label>
                            <div class="input-warp">
                                <p class="text">
                                    <a :href="detail.licence" target="_blank">查看</a>
                                </p>
                            </div>
                        </li>
                        <li v-if="detail.qualification">
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
                    <a class="btn blue" href="javascript:void(0);" @click="showEditDialog">
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
        <editDialog ref="editDialog" :id="detail.id" :username="detail.user_name" :email="detail.mail" :tel="detail.tel" :addr="detail.store_addr"
            :selfaddr="detail.location"></editDialog>
        <alert ref="alert"></alert>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import editDialog from './dialog/changeInfoByCustomer'
    import alert from 'components/dialog/alert'
    let user = JSON.parse(localStorage.getItem('user'))
    export default {
        data: function () {
            return {
                detail: {
                    id: '',
                    company: '',
                    created_at: '',
                    balance: '',
                    audit_status: '',
                    balance_alarm: '',
                    user: '',
                    type: '',
                    legal: '',
                    scope: '',
                    store_addr: '',
                    licence: '',
                    qualification: '',
                    user_name: '',
                    mail: '',
                    tel: '',
                    location: '',
                    application_addr: ''
                },
                userType: user.type
            }
        },
        components: {
            editDialog,
            alert
        },
        methods: {
            showEditDialog() {
                this.$refs.editDialog.$emit('show')
            }
        },
        created: function () {
            mAjax(this, {
                url: API.customer_info,
                success: data => {
                    if (data.code == 200) {
                        this.detail = data.data
                    } else {
                        this.$refs.alert.$emit('show', data.message)
                    }
                }
            })
        }
    }
</script>