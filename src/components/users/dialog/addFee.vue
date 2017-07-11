<template>
    <div class="dialog" :style="{display:style,'margin-left':'-302px','margin-top':'-224px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>坐席续费</h4>
        </div>
        <div class="dialog-body renewal-warp">
            <ul class="query-warp">
                <li>
                    <label>坐席账号</label>
                    <div class="input-warp">
                        <p class="text">{{detail.user}}</p>
                    </div>
                </li>
                <li>
                    <label>开通日期</label>
                    <div class="input-warp">
                        <p class="text">{{detail.created_at}}</p>
                    </div>
                </li>
                <li>
                    <label>失效日期</label>
                    <div class="input-warp">
                        <p class="text">{{detail.expire_time}}</p>
                    </div>
                </li>
            </ul>
            <ul class="renewal-state">
                <li>
                    <label>续费月数</label>
                    <div class="input-warp">
                        <p class="text">一个月</p>
                    </div>
                </li>
                <li>
                    <label>续费后失效日期</label>
                    <div class="input-warp">
                        <p class="text">{{detail.nextEpire}}</p>
                    </div>
                </li>
                <li>
                    <label>续费费用</label>
                    <div class="input-warp">
                        <p class="text">¥{{detail.price}}</p>
                    </div>

                </li>
            </ul>
            <p class="error" v-show="error">
                <i class="icon"></i>{{error}}</p>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="sure">续费</a>
            <a class="btn" href="javascript:void(0);" @click="close">取消</a>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        data() {
            return {
                style: 'none',
                id: '',
                detail: {},
                error: ''
            }
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure() {
                this.error = ''
                mAjax(this, {
                    url: API.operate_active_seat,
                    data: {
                        seat_id: this.id
                    },
                    success: data => {

                        if (data.code == 200) {
                            this.close()
                            this.$toast('续费成功',()=>{
                                window.location.reload()
                            })
                        } else {
                            this.error = data.message
                        }
                    }
                })
            }
        },
        created() {
            this.$on('show', (id) => {
                this.id = id
                mAjax(this, {
                    url: API.customer_renew_seat,
                    data: {
                        id: id
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.detail = data.data
                            this.style = 'block'
                            this.$store.commit('SHOW_LAYER')
                        }
                    }
                })
            })
        }
    }

</script>