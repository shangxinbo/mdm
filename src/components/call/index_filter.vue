<template>
    <form>
        <ul class="data-text">
            <li>
                <label class="name">项目</label>
                <div class="input-warp">
                    <input class="text" v-model="search_name" type="text">
                </div>
            </li>
            <li v-if="userType==1&&!client_id">
                <label class="name">客户</label>
                <mselect ref="customerSelect" :api="api.customerList" :id="search_client_id"></mselect>
            </li>
            <li v-if="userType==1&&!agent_id&&!client_id">
                <label class="name">代理</label>
                <mselect ref="agentSelect" :api="api.agentList" :id="search_agent_id"></mselect>
            </li>
            <li>
                <label class="name">日期</label>
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

    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            let now = moment().format('YYYY-MM-DD')
            return {
                userType: user.type,
                search_name: '',
                search_agent_id: '',
                search_client_id: '',
                agent_id:'',
                client_id:'',
                api: {
                    customerList: API.customer_list_all,
                    agentList: API.angent_list_all,
                },
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
                this.search_name = this.$route.query.search_name ? this.$route.query.search_name : ''
                this.search_agent_id = this.$route.query.search_agent_id === undefined ? '' : this.$route.query.search_agent_id
                this.search_client_id = this.$route.query.search_client_id === undefined ? '' : this.$route.query.search_client_id
                this.agent_id = this.$route.query.agent_id
                this.client_id = this.$route.query.client_id
                this.endTime = this.$route.query.endTime ? this.$route.query.endTime : ''
                this.startTime = this.$route.query.startTime ? this.$route.query.startTime : ''
                this.max_start = this.endTime
                this.min_end = this.startTime
                console.log(this.search_client_id)
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
                    search_name: this.search_name,
                    startTime: this.startTime,
                    endTime: this.endTime
                }
                if (this.userType == 1) {
                    obj.search_client_id = this.$refs.customerSelect ? this.$refs.customerSelect.selected.id : ''
                    obj.search_agent_id = this.$refs.agentSelect ? this.$refs.agentSelect.selected.id : ''
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