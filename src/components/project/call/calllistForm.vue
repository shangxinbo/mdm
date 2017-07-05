<template>
    <form>
        <div class="cutover">
            <ul class="data-text cutover-tab01">
                <li v-if="status<1">
                    <label class="name">拨打状态</label>
                    <mselect ref="callStatusSelect" :initlist="statusList" :id="isDial"></mselect>
                </li>
                <li>
                    <label class="name">拨打结果</label>
                    <mselect ref="callResultSelect" :initlist="resultList" :id="dialStatus"></mselect>
                </li>
                <li>
                    <label class="name">分配日期</label>
                    <div class="input-warp date-warp">
                        <div class="calendar-warp w45">
                            <datepicker addClass="date" :init="startTime" :weeks="weeks" :months="months" :buttons="buttons" :max="maxStart" @change="setStartTime"></datepicker>
                        </div>
                        <em class="or">至</em>
                        <div class="calendar-warp w45">
                            <datepicker addClass="date" :init="endTime" :weeks="weeks" :months="months" :buttons="buttons" :min="minEnd" :max="maxEnd" @change="setEndTime"></datepicker>
                        </div>
                    </div>
                </li>
                <li>
                    <a class="btn blue" type="button" @click="submit">
                        <span>
                            <i class="icon search"></i>查询
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </form>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import datepicker from 'components/utils/datepicker'
    import callResultConf from './callResultConf'
    import moment from 'moment'
    
    let resultList = []
    for(let i in callResultConf){
        resultList.push({
            id:i,
            name:callResultConf[i]
        })
    }

    export default {
        props:['status'],
        data() {
            let now = moment().format('YYYY-MM-DD')
            return {
                statusList: [
                    {id:"0",name:"未拨打"},
                    {id:"1",name:"已拨打"}
                ],
                resultList: resultList,
                isDial: '',
                dialStatus: '',
                startTime: '',
                endTime: '',
                maxStart: now,
                minEnd: '',
                maxEnd:now,
                weeks: ['一', '二', '三', '四', '五', '六', '日'],
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                buttons: {
                    ok: '确认',
                    cancel: '取消'
                }
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
                this.isDial = this.$route.query.isDial===undefined ?'': this.$route.query.isDial
                this.dialStatus = this.$route.query.dialStatus===undefined ?'': this.$route.query.dialStatus
                this.startTime = this.$route.query.startTime ? this.$route.query.startTime : ''
                this.endTime = this.$route.query.endTime ? this.$route.query.endTime : ''
                this.max_start = this.endTime
                this.min_end = this.startTime
            },
            setStartTime(value) {
                this.startTime = value
                this.minEnd = value
            },
            setEndTime(value) {
                this.endTime = value
                this.maxStart = value
            },
            submit() {
                let obj = {
                    dialStatus: this.$refs.callResultSelect.selected.id,
                    startTime:this.startTime,
                    endTime:this.endTime
                }
                if(this.status<1){
                    obj.isDial = this.$refs.callStatusSelect.selected.id
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