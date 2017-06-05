<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div>
        <mheader></mheader>
        <mnav></mnav>
        <router-view></router-view>
        <mfooter></mfooter>
        <toast></toast>
        <changeMyPass></changeMyPass>
        <callSet></callSet>
        <alert ref="alert"></alert>
        <balanceAlert v-if="userType==3"></balanceAlert>
        <div id="shadowLayer" v-if="layer"></div>
    </div>
</template>
<script>
    import mheader from 'components/common/header.vue'
    import mfooter from 'components/common/footer.vue'
    import mnav from 'components/common/nav.vue'
    import toast from 'components/dialog/toast'
    import alert from 'components/dialog/alert'
    import confirm from 'components/dialog/confirm'
    import changeMyPass from 'components/dialog/changeMyPass'
    import balanceAlert from 'components/customer/dialog/balanceAlert'
    import callSet from 'components/dialog/callSet'
    import API from 'src/services/api'
    import { mAjax, getCookie } from 'src/services/functions'

    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                userType: user.type
            }
        },
        computed: {
            layer: function () {
                return this.$store.state.showLayer
            }
        },
        components: {
            mheader,
            mfooter,
            mnav,
            toast,
            alert,
            changeMyPass,
            balanceAlert,
            callSet
        },
        created: function () {
            let _this = this
                
            if(this.userType==1){
                let user = JSON.parse(localStorage.getItem('user'))
                mAjax(this,{
                    url:API.get_operate_info,
                    data:{
                        id:user.id
                    },
                    success:data=>{
                        if(data.data.rule){
                            let arr = data.data.rule.split(',')
                            user.rule = data.data.rule
                            localStorage.setItem('user',JSON.stringify(user))
                            this.$store.commit('CHANGE_POWER',arr)
                        }
                    }
                })
            }

            //坐席登录外呼中心 start
            if (this.userType == 4) {
                mAjax(_this, {
                    url: API.get_seat_sign,
                    success: data => {
                        let info = data.data
                        
                        _this.$store.commit('RESET_CALLINFO', info)
                        window.mycomm_agent.on_login_s = function (evt) {
                            //_this.$store.commit('RESET_CALLINFO', info)
                        }
                        window.mycomm_agent.on_login_f = function (evt) {
                            _this.$refs.alert.$emit('show', '登录外呼平台异常，外呼功能不能使用')
                        }

                        window.mycomm_agent.set_wrap_up_time(0)
                        window.mycomm_agent.login(info.cti_server + ':' + info.cti_port, info.agent_id.toString(), info.password, info.queue, info.is_leader, info.org_id, info.agent_name, info.work_id.toString(), info.agent_type)
                    },
                    error: err => {
                        _this.error = err.message
                    }
                })
                
                // 获取前缀
                // mAjax(_this, {
                //     url: API.get_tel_prefix,
                //     success: data => {
                //         if (data.code == 200) {
                //             _this.$store.commit('SET_TEL_PREFIX', data.data.prefix)
                //         } else {
                //             _this.$store.commit('SET_TEL_PREFIX', null)
                //         }
                //     },
                //     error: err => {
                //         _this.$store.commit('SET_TEL_PREFIX', null)
                //     }
                // })
                _this.$store.commit('SET_TEL_PREFIX', null)


                //定时退出 
                setInterval(() => {
                    let now = new Date().getTime()
                    console.log(now-window.login_timer)
                    if ((now - window.login_timer) > 20 * 60 * 1000) {  //20无操作退出
                        localStorage.removeItem('user')
                        sessionStorage.clear()
                        window.location.reload()
                    } else {                                            //看登录是否有效
                        mAjax(this, {
                            url: API.get_myclient_balance,
                            success: data => {
                                //console.log(123)
                            }
                        })
                    }
                }, 30 * 1000)

                window.login_timer = new Date().getTime()
                document.body.addEventListener('mouseover', function () {
                    window.login_timer = new Date().getTime()
                    console.log(window.login_timer)
                })

            }
            //坐席登录外呼中心 end

        }
    }

</script>