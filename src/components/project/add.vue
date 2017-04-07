<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">新建项目</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">项目名称</label>
                            <div class="input-warp">
                                <input class="text" type="text" v-model="name">
                                <p v-if="name_error" class="error">{{name_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">项目类型</label>
                            <mselect ref="projectTypeSelect" :api="api.project_type" :error="projectType_error"></mselect>
                        </li>
                        <li>
                            <label class="name">人群地域</label>
                            <div class="input-warp">
                                <input class="text" type="text" v-model="region">
                                <p class="tips">如：北京、上海，或全国</p>
                                <p v-if="region_error" class="error">{{region_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">预计线索量</label>
                            <div class="input-warp">
                                <input class="text" type="text" v-model="expectClue">
                                <p class="tips">外呼时间为3天，打不完的线索不会计费</p>
                                <p v-if="expectClue_error" class="error">{{expectClue_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">预计开始时间</label>
                            <div class="input-warp date-warp">
                                <div class="calendar-warp">
                                    <datepicker input-class="date" :disabled="datepicker_disabled" language="zh" format="yyyy.MM.dd" v-model="expectTime"></datepicker>
                                </div>
                                <p class="tips">外呼时间为3天</p>
                                <p v-if="expectTime_error" class="error">{{expectTime_error}}</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">短信文本
                                <br/>（选填）</label>
                            <div class="input-warp">
                                <textarea v-model="content"></textarea>
                                <p class="tips block">最多输入600个字符，已经输入0个字符</p>
                            </div>
                        </li>
                        <li>
                            <div class="input-warp">
                                <button class="btn blue" type="button" @click="submit">提交</button>
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
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import datepicker from 'vuejs-datepicker'
    import alert from 'components/dialog/alert'
    export default {
        data: function () {
            return {
                name: '',
                name_error: '',
                projectType_error: '',
                region: '',
                region_error: '',
                expectClue: '',
                expectClue_error: '',
                expectTime: '',
                expectTime_error: '',
                content: '',
                api: {
                    project_type: API.project_type_list
                },
                datepicker_disabled: {
                    to: new Date(2017, 0, 1),
                    from: new Date()
                }
            }
        },
        components: {
            mselect,
            datepicker,
            alert
        },
        methods: {
            submit: function () {
                let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{4,20}$/
                let projectType = this.$refs.projectTypeSelect.selected.id
                if (!this.name) {
                    this.name_error = '请填写项目名成'
                    return false
                } else {
                    if (!reg.test(this.name)) {
                        this.name_error = '项目名称由文字和数字4-20位组成'
                        return false
                    }else{
                        this.name_error = ''
                    }
                }
                if (!projectType) {
                    this.projectType_error = '请选择项目类型'
                    return false
                }else{
                    this.projectType_error = ''
                }
                if (!this.region) {
                    this.region_error = '请填写人群地域'
                    return false
                }else{
                    this.region_error = ''
                }
                if (!this.expectClue) {
                    this.expectClue_error = '请填写预计线索量'
                    return false
                } else {
                    if (isNaN(this.expectClue)) {
                        this.expectClue_error = '线索量需要是数字'
                        return false
                    }else{
                        this.expectClue_error = ''
                    }
                }
                if (!this.expectTime) {
                    this.expectTime_error = '请选择预计开始时间'
                    return false
                }else{
                    this.expectTime_error = ''
                }
                let _this = this
                mAjax(this, {
                    url: API.project_add,
                    data: {
                        name: this.name,
                        type: projectType,
                        region: this.region,
                        expect_clue_num: this.expectClue,
                        expect_begin_time: dateFormat(this.expectTime),
                        desc: this.content
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.$refs.alert.$emit('show', '新建成功', function () {
                                _this.$router.replace('/project/index')
                            })
                        }
                    }
                })
            }
        },
        created:function(){
            let id = this.$route.params.id
            let _this = this
            if(id){
                mAjax(this,{
                    url:API.project_detail,
                    data:{
                        id:id
                    },
                    success:data =>{
                        if(data.code==200){
                            let detail = data.data
                            _this.name = detail.name
                            _this.region = detail.region
                            _this.expectClue = detail.expect_clue_num
                            _this.expectTime = detail.expect_begin_date
                            _this.content = detail.desc
                        }
                    }
                })
            }
        }
    }

</script>