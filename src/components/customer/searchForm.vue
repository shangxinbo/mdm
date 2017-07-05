<template>
    <form>
        <ul class="data-text">
            <li>
                <label class="name">客户名称</label>
                <div class="input-warp">
                    <input class="text" v-model="customerName" type="text">
                </div>
            </li>
            <li v-if="userType==1">
                <label class="name">所属代理</label>
                <mselect ref="agentSelect" :api="agentApi" :id="agentId"></mselect>
            </li>
            <li>
                <label class="name">客户类型</label>
                <mselect ref="typeSelect" :api="typeApi" :id="typeId"></mselect>
            </li>
            <li>
                <label class="name">客户状态</label>
                <mselect ref="statusSelect" :initlist="statusList" :id="statusId"></mselect>
            </li>
            <li v-if="userType==1">
                <label class="name">挂机短信</label>
                <mselect ref="hangupSelect" :initlist="hangupStatus"></mselect>
            </li>
            <li>
                <label class="name">创建日期</label>
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
                <a class="btn blue" type="button" @click="search()">
                    <span>
                        <i class="icon search"></i>查询
                    </span>
                </a>
            </li>
        </ul>
    </form>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import datepicker from 'components/utils/datepicker'
    import moment from 'moment'

    let agentApi = API.angent_list_all
    let typeApi = API.customer_type_list
    let statusList = [
        { id: "0", name: "待审核" },
        { id: "1", name: "通过" },
        { id: "2", name: "未通过" }
    ]
    let hangupStatus = [
        { id: "1", name: "已开通" },
        { id: "0", name: "未开通" }
    ]

    export default {
        props: ['userType'],
        data() {
            let now = moment().format('YYYY-MM-DD')
            return {
                customerName: '',
                agentId: '',
                typeId: '',
                statusId: '',
                agentApi,
                typeApi,
                statusList,
                hangupStatus,
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
                    _this.search()
            }
        },
        methods: {
            init() {
                let now = moment().format('YYYY-MM-DD')
                this.customerName = this.$route.query.customerName ? this.$route.query.customerName : ''
                this.typeId = this.$route.query.typeId == undefined ? '' : this.$route.query.typeId
                this.agentId = this.$route.query.agentId == undefined ? '' : this.$route.query.agentId
                this.statusId = this.$route.query.statusId == undefined ? '' : this.$route.query.statusId
                this.startTime = this.$route.query.startTime ? this.$route.query.startTime : ''
                this.endTime = this.$route.query.endTime ? this.$route.query.endTime : ''
                this.maxStart = this.endTime ? this.endTime : now
                this.maxEnd = now
                this.minEnd = this.startTime
            },
            search() {
                let obj = {
                    customerName: this.customerName,
                    typeId: this.$refs.typeSelect.selected.id,
                    statusId: this.$refs.statusSelect.selected.id,
                    startTime: this.startTime,
                    endTime: this.endTime
                }
                if (this.$refs.agentSelect) {
                    obj.agentId = this.$refs.agentSelect.selected.id
                }
                if (this.$refs.hangupSelect) {
                    obj.hangup = this.$refs.hangupSelect.selected.id
                }

                this.$emit('submit', obj)
            },
            setStartTime(value) {
                this.startTime = value
                this.minEnd = value
            },
            setEndTime(value) {
                this.endTime = value
                this.maxStart = value
            },
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        components: {
            mselect,
            datepicker
        }
    }

</script>