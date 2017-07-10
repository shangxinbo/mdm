<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{projectName}}拨打详情</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text seat-text">
                        <li class="li-fl">
                            <div class="fl-in">
                                <label class="name">拨打资源</label>
                                <div class="input-warp">
                                    <p class="text">{{tel}}</p>
                                </div>
                            </div>
                            <div class="fl-in">
                                <label class="name">归属地</label>
                                <div class="input-warp">
                                    <p class="text">{{city}}</p>
                                </div>
                            </div>
                            <div class="fl-in" v-if="dialing">
                                <button class="btn red" type="button">
                                    <span>
                                        <i class="icon hangup"></i>挂断</span>
                                </button>
                            </div>
                            <div class="fl-in" v-if="showsms">
                                <a class="btn-sms" href="javascript:void(0);">
                                    <span>
                                        <i class="icon sms"></i>发短信</span>
                                </a>
                            </div>
                        </li>
                        <li class="li-sex">
                            <label class="name">
                                <em>（选填）</em>称呼</label>
                            <div class="input-warp">
                                <input class="text" type="text" value="">
                                <label onclick="tradioCutover(this)" class="radio-warp" for="male">
                                    <input type="radio" name="sendMode" class="radio" id="male" value="male" checked="checked">
                                    <i class="icon"></i>
                                    <span class="radioname">先生</span>
                                </label>
                                <label onclick="tradioCutover(this)" class="radio-warp" for="female">
                                    <input type="radio" name="sendMode" class="radio" id="female" value="female">
                                    <i class="icon"></i>
                                    <span class="radioname">女士</span>
                                </label>
                            </div>
                        </li>
                        <li class="li-fl">
                            <label class="name">拨打结果</label>
                            <mselect ref="result1Select" :api="getResult1" :id="result1" style="padding-right:10px;" @change="linkResult"></mselect>
                            <mselect ref="result2Select" :api="getResult2" :param="param" :id="result2"></mselect>
                        </li>
                        <li>
                            <label class="name">
                                <em>（选填）</em>备注说明</label>
                            <div class="input-warp">
                                <textarea></textarea>
                            </div>
                        </li>
                        <li class="li-btn">
                            <div class="input-warp input-fl">
                                <button class="btn disabled" type="button">保存并关闭</button>
                                <button class="btn disabled" type="button">保存并拨打下一个</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <div class="data-export">
                        <ul>
                            <li>
                                <span class="t">已拨打次数</span>
                                <span class="num">{{call_num}}</span>
                            </li>
                            <li>
                                <span class="t">称呼</span>
                                <span class="num">{{call}}</span>
                            </li>
                        </ul>
                    </div>
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>拨打时间</th>
                                <th>拨打资源</th>
                                <th>通话时长</th>
                                <th class="tl">备注</th>
                                <th class="tl">拨打结果</th>
                                <th>通话录音</th>
                            </tr>
                            <tr v-for="item in list">
                                <td>{{item.updated_at}}</td>
                                <td>{{item.telephone_crypt}}</td>
                                <td>{{item.call_time}}</td>
                                <td class="tl">{{item.remarks}}</td>
                                <td class="tl">【{{item.dial_result_first}}】{{item.dial_result_second }}</td>
                                <td>
                                    <a class="btn-audio" href="javascript:void(0);" onclick="getWindow('callAudio');">
                                        <span class="notice">
                                            <i class="icon play"></i>
                                        </span>
                                        <span class="audio-txt">播放</span>
                                    </a>
                                    <a href="#">
                                        <span class="notice">
                                            <i class="icon download"></i>
                                        </span>下载</a>
                                    <audio class="audio" src="../static/audio/audio.mp3"></audio>
                                </td>
                            </tr>
                            <tr class="tr2">
                                <td>2017-03-16 10:20</td>
                                <td>138****5556</td>
                                <td>6分</td>
                                <td class="tl">备注</td>
                                <td class="tl">【成功】有意向-条件不符</td>
                                <td>
                                    <a class="btn-audio" href="javascript:void(0);" onclick="getWindow('callAudio');">
                                        <span class="notice">
                                            <i class="icon play"></i>
                                        </span>
                                        <span class="audio-txt">播放</span>
                                    </a>
                                    <a href="#">
                                        <span class="notice">
                                            <i class="icon download"></i>
                                        </span>下载</a>
                                    <audio class="audio" src="../static/audio/audio.mp3"></audio>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <alert ref="alert"></alert>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import alert from 'components/dialog/alert'
    export default {
        data() {
            let id = this.$route.query.id
            let projectName = this.$route.query.projectName
            let projectId = this.$route.query.projectId
            let tel = this.$route.query.tel
            let city = this.$route.query.city
            let call = this.$route.query.call
            let call_num = this.$route.query.call_num
            let user = localStorage.getItem('user')
            return {
                id: id,
                user_id: user.id,
                projectId: projectId,
                projectName: projectName,
                tel: tel,
                city: city,
                getResult1: API.clue_get_result,
                getResult2: API.clue_get_sub_result,
                result1: '',
                result2: '',
                param: {},
                call: call,
                call_num: call_num,
                list: [],
                showsms:false
            }
        },
        computed: {
            dialing: function () {
                return this.$store.state.dialing
            },
            tel_pre: function () {
                return this.$store.state.tel_pre
            },
            seat_info: function () {
                return this.$store.state.callInfo
            }
        },
        watch: {
            dialing(newVal, oldVal) {
                if(newVal==true){
                    this.showsms = true
                }
            }
        },
        created() {
            if (this.call_num > 0) {
                mAjax(this, {
                    url: API.clue_get_record,
                    data: {
                        clue_id: this.id
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data
                        } else {
                            this.list = []
                        }
                    }
                })
            }

            this.init()


        },
        methods: {
            linkResult(item) {
                this.param = {
                    pid: item.id
                }
                this.$nextTick(() => {
                    this.$refs.result2Select.init()
                    this.$refs.result2Select.selected = {
                        id: '',
                        name: '全部'
                    }
                })
            },
            init() {
                let _this = this
                let uuid = ''
                let history_id = ''

                window.mycomm_agent.on_dial_f = function (evt) {
                    _this.$refs.alert.$emit('show', evt.params.err_des)
                    window.mycomm_agent.logout()
                }
                window.mycomm_agent.on_login_f = function (evt) {
                    let msg = '服务暂不可用，请联系管理员'
                    switch (evt.params.err_num) {
                        case 404:
                            msg = 'IP电话/软电话/分机没有注册，请根据IP电话机内置说明书进行配置，如有疑问请联系管理员'
                            break
                        case 409:
                            msg = '该分机已经被其他坐席使用，请联系管理员'
                            break
                        case 503:
                            msg = '服务暂不可用，请联系管理员'
                            break
                        default:
                            msg = '服务暂不可用，请联系管理员'
                    }
                    _this.$refs.alert.$emit('show', msg)
                }

                window.mycomm_agent.on_agent_ext_hangup = function (evt) {
                    _this.$store.commit('CHANGE_DIAL_STATUS', false)
                    window.mycomm_agent.logout()
                    mAjax(_this, {
                        url: API.add_call_job,
                        data: {
                            call_uuid: uuid
                        }
                    })
                }

                window.mycomm_agent.on_agent_dial_start = function (evt) {
                    uuid = evt.params.channel_uuid
                    _this.$store.commit('CHANGE_DIAL_STATUS', true)
                    mAjax(_this, {
                        url: API.save_call_uuid,
                        data: {
                            call_uuid: uuid,
                            id: history_id
                        }
                    })
                }

                mAjax(this, {
                    url: API.get_myclient_balance,
                    data: {
                        seat_id: _this.user_id
                    },
                    success: data => {
                        if (data.code == 200) {
                            if (data.data.balance <= 0) {
                                _this.$refs.alert.$emit('show', '您的账号已经没有费用，请联系管理员')
                            } else if (!data.data.valid) {
                                _this.$refs.alert.$emit('show', '坐席已失效,暂不能拨打')
                            } else {
                                mAjax(this, {
                                    url: API.get_tel,
                                    data: {
                                        id: _this.id
                                    },
                                    success: data => {

                                        let info = this.seat_info

                                        let tel_all = data.data.telephone

                                        if (this.tel_pre) {
                                            tel_all = this.tel_pre + tel_all
                                        }

                                        window.mycomm_agent.wrap_up(0)
                                        window.mycomm_agent.on_dial_s = function (evt) {
                                            //dial success
                                        }
                                        window.mycomm_agent.on_login_s = function (evt) {
                                            window.mycomm_agent.dial(tel_all, 'geo', 'great')
                                            setInterval(() => {  //延长用户有效期
                                                mAjax(_this, {
                                                    url: API.get_myclient_balance
                                                })
                                            }, 30 * 1000)
                                        }

                                        mAjax(_this, {
                                            url: API.save_dial_history,
                                            data: {
                                                phone: data.data.telephone,
                                                project_id: _this.projectId
                                            },
                                            success: data => {
                                                if (data.code == 200) {
                                                    history_id = data.data.id
                                                    //window.mycomm_agent.login(info.cti_server + ':' + info.cti_port, info.agent_id.toString(), info.password, info.queue, info.is_leader, info.org_id, info.agent_name, info.work_id.toString(), info.agent_type)
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        } else {
                            _this.$refs.alert.$emit('show', '获取坐席账户状态失败,暂不能拨打')
                        }
                    }
                })

            }
        },
        components: {
            mselect,
            alert
        }
    }

</script>