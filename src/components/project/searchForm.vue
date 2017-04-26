<template>
    <form>
        <ul class="data-text">
            <li>
                <label class="name">项目名称</label>
                <div class="input-warp">
                    <input class="text" v-model="projectName" type="text">
                </div>
            </li>
            <li v-if="userType==1&&(type=='all'||type=='agent')">
                <label class="name">客户名称</label>
                <mselect ref="customerSelect" :api="customerApi" :id="customerId"></mselect>
            </li>
            <li v-if="userType==1&&(type=='all')">
                <label class="name">所属代理</label>
                <mselect ref="agentSelect" :api="agentApi" :id="agentId"></mselect>
            </li>
            <li>
                <label class="name">项目状态</label>
                <mselect ref="statusSelect" :api="statusApi" :id="statusId"></mselect>
            </li>
            <li>
                <label class="name">创建日期</label>
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
                <button class="btn blue" type="button" @click="submit">
                    <span>
                        <i class="icon search"></i>查询
                    </span>
                </button>
            </li>
        </ul>
    </form>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import datepicker from 'components/utils/datepicker'
    import moment from 'moment'

    let customerApi = API.customer_list_all
    let agentApi = API.angent_list_all
    let statusApi = API.project_status
    export default {
        props: {
            userType: String,
            showCustomer: {
                type: Boolean,
                default: true
            },
            showAgent: {
                type: Boolean,
                default: true
            }
        },
        data() {
            let now = moment().format('YYYY-MM-DD')
            return {
                type:'all',   //'all' , 'customer' , 'agent'
                customerApi,
                agentApi,
                statusApi,
                projectName: '',
                customerId: '',
                agentId: '',
                statusId: '',
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
                let now = moment().format('YYYY-MM-DD')
                this.projectName = this.$route.query.projectName ? this.$route.query.projectName : ''
                this.customerId = this.$route.query.customerId === undefined ? '' : this.$route.query.customerId
                this.agentId = this.$route.query.agentId === undefined ? '' : this.$route.query.agentId
                this.statusId = this.$route.query.statusId === undefined ? '' : this.$route.query.statusId
                this.startTime = this.$route.query.startTime ? this.$route.query.startTime : ''
                this.endTime = this.$route.query.endTime ? this.$route.query.endTime : ''
                this.maxStart = this.endTime ? this.endTime : now
                this.maxEnd = now
                this.minEnd = this.startTime

                if(this.$route.query.customer_id) {
                    this.type = 'customer'
                }else{
                    if(this.$route.query.agent_id){
                        this.type = 'agent'
                    }else{
                        this.type = 'all'
                    }
                }
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
                    projectName: this.projectName,
                    startTime: this.startTime,
                    endTime: this.endTime
                }
                if(this.$refs.customerSelect)
                    obj.customerId = this.$refs.customerSelect.selected.id
                if(this.$refs.agentSelect)
                    obj.agentId = this.$refs.agentSelect.selected.id
                if(this.$refs.statusSelect)
                    obj.statusId = this.$refs.statusSelect.selected.id
                this.$emit('submit', obj)
            }
        },
        components: {
            mselect,
            datepicker
        }
    }

</script>