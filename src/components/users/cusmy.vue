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
                
            </div>
        </div>
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