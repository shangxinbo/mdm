<template>
    <form>
        <ul class="data-text">
            <li>
                <label class="name">拨打结果</label>
                <mselect ref="resultSelect" :initlist="resultList" :id="dialStatus"></mselect>
            </li>
            <li>
                <label class="name">拨打日期</label>
                <div class="input-warp date-warp">
                    <div class="calendar-warp w45">
                        <datepicker addClass="date" :init="start_time" :weeks="weeks" :months="months" :buttons="buttons" :max="maxStart" @change="setStartTime"></datepicker>
                    </div>
                    <em class="or">至</em>
                    <div class="calendar-warp w45">
                        <datepicker addClass="date" :init="end_time" :weeks="weeks" :months="months" :buttons="buttons" :min="minEnd" :max="maxEnd"
                            @change="setEndTime"></datepicker>
                    </div>
                </div>
            </li>
            <li>
                <a class="btn blue" type="button" @click="submit">
                    <span>
                        <i class="icon search"></i>查询</span>
                </a>
            </li>
        </ul>
    </form>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import callResultConf from '../project/callResultConf'
    import datepicker from 'components/utils/datepicker'
    import moment from 'moment'

    let resultList = []
    for(let i in callResultConf){
        resultList.push({
            id:i,
            name:callResultConf[i]
        })
    }

    export default {
        data: function () {
            let now = moment().format('YYYY-MM-DD')
            return {
                start_time: '',
                end_time: '',
                maxStart: now,
                minEnd: '',
                maxEnd: now,
                weeks: ['一', '二', '三', '四', '五', '六', '日'],
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                buttons: {
                    ok: '确认',
                    cancel: '取消'
                },
                resultList: resultList,
                dialStatus: ''
            }
        },
        created() {
            this.init()
            let _this = this
            document.onkeyup = function (evt) {
                if (evt.keyCode == 13)
                    _this.submit()
            }
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        methods: {
            init() {
                this.end_time = this.$route.query.end_time ? this.$route.query.end_time : ''
                this.start_time = this.$route.query.start_time ? this.$route.query.start_time : ''
                this.max_start = this.end_time
                this.min_end = this.start_time
            },
            setStartTime(value) {
                this.start_time = value
                this.minEnd = value
            },
            setEndTime(value) {
                this.end_time = value
                this.maxStart = value
            },
            submit() {
                let obj = {
                    start_time: this.start_time,
                    end_time: this.end_time,
                    result:this.$refs.resultSelect.selected.id
                }
                this.$emit('submit', obj)
            }
        },
        components: {
            mselect,
            datepicker
        }
    }
</script>