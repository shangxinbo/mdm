<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭" @click="close"></a>
        <div class="dialog-header">
            <h4>通话设置</h4>
        </div>
        <div class="dialog-body">
            <div v-if="!host" style="width:335px;height:240px;text-align:center;line-height:200px;font-size:16px;">通话设置获取失败</div>
            <ul v-else class="query-warp">
                <li>
                    <label class="w110">主机</label>
                    <div class="input-warp w240">
                        <p class="text">{{host}}</p>
                    </div>
                </li>
                <li>
                    <label class="w110">端口</label>
                    <div class="input-warp w240">
                        <p class="text">{{port}}</p>
                    </div>
                </li>
                <li>
                    <label class="w110">客户端登录名</label>
                    <div class="input-warp w240">
                        <p class="text">{{user}}</p>
                    </div>
                </li>
                <li>
                    <label class="w110">客户端密码</label>
                    <div class="input-warp w240">
                        <p class="text">{{password}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        computed: {
            host: function () {
                return this.$store.state.callInfo ? this.$store.state.callInfo.cti_server : ''
            },
            port() {
                return this.$store.state.callInfo ? this.$store.state.callInfo.ip_port : ''
            },
            user: function () {
                return this.$store.state.callInfo ? this.$store.state.callInfo.agent_id : ''
            },
            password: function () {
                return this.$store.state.callInfo ? this.$store.state.callInfo.password : ''
            },
            style: function () {
                return this.$store.state.showCallSet ? 'block' : 'none'
            }
        },
        watch: {
            style: function (newVal, oldVal) {
                if (newVal == 'block') {
                    this.$store.commit('SHOW_LAYER')
                } else {
                    this.$store.commit('HIDE_LAYER')
                }
            }
        },
        methods: {
            close: function () {
                this.$store.commit('HIDE_CALL_SET')
            }
        }
    }

</script>