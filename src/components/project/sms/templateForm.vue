<template>
    <form>
        <ul class="data-text">
            <li>
                <label class="name">模板名称</label>
                <div class="input-warp">
                    <input class="text" v-model="name" type="text">
                </div>
            </li>
            <li>
                <label class="name">客户名称</label>
                <mselect ref="clientSelect" :api="clientApi" :id="client"></mselect>
            </li>
            <li>
                <label class="name">模板状态</label>
                <mselect ref="statusSelect" :initlist="statusList" :id="status"></mselect>
            </li>
            <li>
                <label class="name">发送日期</label>
                <div class="input-warp date-warp">
                    <div class="calendar-warp w45">
                        <datepicker addClass="date" :init="startTime" :weeks="weeks" :months="months" :buttons="buttons" :max="maxStart" @change="setStartTime"></datepicker>
                    </div>
                    <em class="or">至</em>
                    <div class="calendar-warp w45">
                        <datepicker addClass="date" :init="endTime" :weeks="weeks" :months="months" :buttons="buttons" :min="minEnd" :max="maxEnd"
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
    import datepicker from 'components/utils/datepicker'
    import moment from 'moment'
    export default {
        data() {
            let now = moment().format('YYYY-MM-DD')
            return {
                name: '',
                client: '',
                status: '',
                clientApi: API.sms_client_list,
                statusList: [
                    {
                        id: 1,
                        name: '审核中'
                    },
                    {
                        id: 2,
                        name: '使用中'
                    },
                    {
                        id: 3,
                        name: '已禁用'
                    }
                ],
                startTime: '',
                endTime: '',
                maxStart: now,
                minEnd: '',
                maxEnd: now,
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
                let now = moment().format('YYYY-MM-DD')
                this.name = this.$route.query.name ? this.$route.query.name : ''
                this.client = this.$route.query.client === undefined ? '' : this.$route.query.client
                this.status = this.$route.query.status === undefined ? '' : this.$route.query.status
                this.startTime = this.$route.query.startTime ? this.$route.query.startTime : ''
                this.endTime = this.$route.query.endTime ? this.$route.query.endTime : ''
                this.maxStart = this.endTime ? this.endTime : now
                this.maxEnd = now
                this.minEnd = this.startTime
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
                    name: this.name,
                    startTime: this.startTime,
                    endTime: this.endTime
                }
                if (this.$refs.clientSelect)
                    obj.client = this.$refs.clientSelect.selected.id
                if (this.$refs.statusSelect)
                    obj.status = this.$refs.statusSelect.selected.id
                this.$emit('submit', obj)
            }
        },
        components: {
            mselect,
            datepicker
        }
    }

</script>