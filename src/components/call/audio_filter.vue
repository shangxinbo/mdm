<template>
    <form>
        <ul class="data-text">
            <li>
                <label class="name">拨打资源</label>
                <div class="input-warp"><input class="text" type="text" v-model="tel" /></div>
            </li>
            <li>
                <label class="name">归属地</label>
                <mselect ref="citySelect" :api="getCity" :param="getCity_param" :id="city"></mselect>
            </li>
            <li>
                <label class="name">拨打结果</label>
                <mselect ref="result1Select" :api="getResult1" :id="result1" style="padding-right:10px;" @change="linkResult"></mselect>
                <mselect ref="result2Select" :api="getResult2" :param="param" :id="result2"></mselect>
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
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import callResultConf from '../project/call/callResultConf'
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
            let city = this.$route.query.city ? this.$route.query.city : '全部'
            let id = this.$route.query.project_id
            let seat_id = this.$route.query.seat_id
            return {
                getCity: API.clue_attribution,
                getResult1: API.clue_get_result,
                getResult2: API.clue_get_sub_result,
                city: city,
                getCity_param: {
                    project_id:id,
                    seat_id:seat_id
                },
                result1: '',
                result2: '',
                param: {},
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
                dialStatus: '',
                tel:''
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
                this.city = this.$route.query.city === undefined ? '' : this.$route.query.city
                this.result1 = this.$route.query.result1 ? this.$route.query.result1 : ''
                this.result2 = this.$route.query.result2 ? this.$route.query.result2 : ''
                this.end_time = this.$route.query.end_time ? this.$route.query.end_time : ''
                this.start_time = this.$route.query.start_time ? this.$route.query.start_time : ''
                this.max_start = this.end_time
                this.min_end = this.start_time
                this.tel = this.$route.query.tel?this.$route.query.tel:''
            },
            setStartTime(value) {
                this.start_time = value
                this.minEnd = value
            },
            setEndTime(value) {
                this.end_time = value
                this.maxStart = value
            },
            linkResult(item) {
                this.param = {
                    pid: item.id
                }
                let _this = this
                this.$nextTick(() => {
                    let name = _this.$refs.result2Select.selected.name
                    _this.$refs.result2Select.init(() => {
                        _this.$refs.result2Select.choose('',name)
                    })
                })
            },
            submit() {
                let obj = {
                    start_time: this.start_time,
                    end_time: this.end_time,
                    city: this.$refs.citySelect.selected.id?this.$refs.citySelect.selected.name:'',
                    result1: this.$refs.result1Select.selected.id,
                    result2: this.$refs.result2Select.selected.id
                }
                if(this.tel){
                    obj.tel = this.tel
                }else{
                    obj.tel = ''
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