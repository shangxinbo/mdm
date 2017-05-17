<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-394px','margin-top':'-284px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>{{title}}</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp dialog-manua-add">
                <li>
                    <label>项目名称</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="name">
                        <p v-if="name_error" class="error">{{name_error}}</p>
                    </div>
                </li>
                <li>
                    <label>人群地域</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="region">
                        <p class="tips">如：北京、上海，或全国</p>
                        <p v-if="region_error" class="error">{{region_error}}</p>
                    </div>
                </li>
                <li>
                    <label>预计线索量</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="expectClue">
                        <p class="tips">最多10万条，外呼时间为3天，打不完的线索不会计费</p>
                        <p v-if="expectClue_error" class="error">{{expectClue_error}}</p>
                    </div>
                </li>
                <li>
                    <label>预计开始时间</label>
                    <div class="input-warp date-warp">
                        <div class="calendar-warp">
                            <datepicker input-class="date" style="z-index:1" :disabled="datepicker_disabled" language="zh" format="yyyy.MM.dd" v-model="expectTime"></datepicker>
                        </div>
                        <p class="tips">外呼时间为3天</p>
                        <p v-if="expectTime_error" class="error">{{expectTime_error}}</p>
                    </div>
                </li>
                <li>
                    <label class="name">详细描述
                        <br/>
                        <em class="tips">（选填）</em>
                    </label>
                    <div class="input-warp">
                        <textarea v-model="content"></textarea>
                        <p class="tips block">最多输入600个字符，已经输入{{inputWord}}个字符</p>
                        <p v-if="content_error" class="error">{{content_error}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="sure">确定</a>
            <a class="btn" href="javascript:void(0);" @click="close">取消</a>
        </div>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import datepicker from 'vuejs-datepicker'
    export default {
        data: function () {
            return {
                title: '新建项目',
                id: null,
                style: 'none',
                name: '',
                name_error: '',
                region: '',
                region_error: '',
                expectClue: '',
                expectClue_error: '',
                expectTime: '',
                expectTime_error: '',
                content: '',
                content_error: '',
                datepicker_disabled: {
                    to: new Date()
                }
            }
        },
        computed: {
            inputWord: function () {
                return this.content.length
            }
        },
        components: {
            datepicker,
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure() {
                let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{4,20}$/
                let reg_Inter = /^[1-9][0-9]*$/
                this.content_error = ''
                if (!this.name) {
                    this.name_error = '请填写项目名称'
                    return false
                } else {
                    if (!reg.test(this.name)) {
                        this.name_error = '项目名称由文字和数字4-20位组成'
                        return false
                    } else {
                        this.name_error = ''
                    }
                }
                if (!this.region) {
                    this.region_error = '请填写人群地域'
                    return false
                } else {
                    this.region_error = ''
                }
                if (!this.expectClue) {
                    this.expectClue_error = '请填写预计线索量'
                    return false
                } else {
                    if (!reg_Inter.test(this.expectClue)) {
                        this.expectClue_error = '线索量需要是正整数'
                        return false
                    } else {
                        this.expectClue_error = ''
                    }
                }
                if (!this.expectTime) {
                    this.expectTime_error = '请选择预计开始时间'
                    return false
                } else {
                    this.expectTime_error = ''
                }
                if (this.content && this.content.length > 600) {
                    this.content_error = '详细描述不能超过600字'
                    return false
                }
                let time = typeof this.expectTime == 'string' ? this.expectTime : dateFormat(this.expectTime)
                let _this = this
                let api = API.project_add
                let data = {
                    name: this.name,
                    region: this.region,
                    expect_clue_num: this.expectClue,
                    expect_begin_time: time,
                    desc: this.content
                }
                if (this.title == '重新申请项目') {
                    api = API.project_recheck,
                        data.id = this.id
                }

                mAjax(this, {
                    url: api,
                    data: data,
                    success: data => {
                        if (data.code == 200) {
                            this.close()
                            this.$emit('success')
                        } else {
                            this.content_error = data.message
                        }
                    }
                })
            }
        },
        created() {
            let _this = this
            this.$on('show', function (id) {
                if (id) {
                    mAjax(this, {
                        url: API.project_detail,
                        data: {
                            id: id
                        },
                        success: data => {
                            if (data.code == 200) {
                                _this.title = '重新申请项目'
                                _this.style = 'block'
                                _this.id = id
                                _this.name = data.data.name
                                _this.name_error = ''
                                _this.region = data.data.region
                                _this.region_error = ''
                                _this.expectClue = data.data.expect_clue_num
                                _this.expectClue_error = ''
                                _this.expectTime = data.data.expect_begin_date
                                _this.expectTime_error = ''
                                _this.content = data.data.desc
                                _this.content_error = ''
                                _this.$store.commit('SHOW_LAYER')
                            } else {
                                this.$store.commit('SHOW_TOAST', '获取项目信息失败')
                            }
                        }
                    })
                } else {
                    _this.title = '新建项目'
                    _this.style = 'block'
                    _this.name = ''
                    _this.name_error = ''
                    _this.region = ''
                    _this.region_error = ''
                    _this.expectClue = ''
                    _this.expectClue_error = ''
                    _this.expectTime = ''
                    _this.expectTime_error = ''
                    _this.content = ''
                    _this.content_error = ''
                    _this.$store.commit('SHOW_LAYER')
                }
            })
        }
    }

</script>