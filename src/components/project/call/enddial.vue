<template>
    <div>
        <div class="data-property">
            <searchForm @submit="search"></searchForm>
        </div>
        <div class="data-warp">
            <div class="cutover">
                <div class="data-export">
                    <ul>
                        <li>
                            <span class="t">已拨打</span>
                            <span class="num">{{total}}</span>
                        </li>
                    </ul>
                </div>
                <mtable :list="list">
                    <template scope="props">
                        <td width="10%" label="拨打资源">{{props.item.telephone_crypt}}</td>
                        <td width="5%" label="归属地">{{props.item.city}}</td>
                        <td width="5%" label="称呼">{{props.item.call}}{{props.item.gender=='男'?'先生':''}}{{props.item.gender=='女'?'女士':''}}</td>
                        <td width="10%" label="已拨打次数">{{props.item.dial_num}}</td>
                        <td width="10%" label="拨打日期">{{props.item.updated_at}}</td>
                        <td width="10%" label="通话时长">{{props.item.call_time|timeFormat}}</td>
                        <td width="20%" label="备注">{{props.item.remarks}}</td>
                        <td width="10%" label="拨打结果">【{{props.item.dial_result_first}}】{{props.item.dial_result_second}}</td>
                        <td width="20%" label="操作">
                            <a href="javascript:void(0);" @click="call(props.item.id,props.item.telephone_crypt,props.item.city,props.item.call,props.item.gender,props.item.dial_num)">
                                <span class="notice">
                                    <i class="icon phone"></i>
                                </span>拨打
                            </a>
                            <a v-if="smsShow==1" href="javascript:void(0)" @click="sms(props.item.id)">
                                <span class="notice">
                                    <i class="icon sms"></i>
                                </span>发短信</a>
                            <a href="javascript:void(0);" @click="view(props.item.id,props.item.telephone_crypt,props.item.city,props.item.call,props.item.gender,props.item.dial_num)">查看</a>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
        <smsDialog ref="smsDialog"></smsDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import smsDialog from '../dialog/sms'
    import searchForm from './form2'
    import mtable from 'components/utils/table'

    export default {
        data() {
            return {
                project_id: '',
                sex: '',
                result1: '',
                result2: '',
                currentPage: 1,
                totalPage: 1,
                list: [],
                total: 0,
                smsShow:0
            }
        },
        created() {
            this.render()
        },
        components: {
            pages,
            searchForm,
            mtable,
            smsDialog
        },
        watch: {
            $route: function () {
                this.render()
            }
        },
        filters: {
            timeFormat(val) {
                let hour = 0
                let minute = 0
                let second = 0
                if (val > 60 * 60) {
                    hour = Math.floor(val / (60 * 60))
                }
                if (val > 60) {
                    minute = Math.floor((val - hour * 60 * 60) / 60)
                }
                second = val - hour * 60 * 60 - minute * 60
                return (hour ? (hour + '时') : '') + (minute || hour ? (minute + '分') : '') + second + '秒'
            }
        },
        methods: {
            search(param) {
                let query
                if (!isNaN(param)) {
                    query = Object.assign({}, this.$route.query, { page: param })
                } else {
                    query = Object.assign({}, this.$route.query, param, { page: 1 })
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                })
            },
            render() {
                this.project_id = this.$route.query.project_id
                this.city = this.$route.query.city ? this.$route.query.city : ''
                this.sex = this.$route.query.sex ? this.$route.query.sex : ''
                this.result1 = this.$route.query.result1 ? this.$route.query.result1 : ''
                this.result2 = this.$route.query.result2 ? this.$route.query.result2 : ''
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.clue_status = this.$route.query.clue_status ? this.$route.query.clue_status : 0
                this.end = this.$route.query.end
                this.smsShow = this.$route.query.sms
                this.$ajax({
                    url: API.project_call_enddial_list,
                    data: {
                        project_id: this.project_id,
                        city: this.city,
                        gender: this.sex,
                        dial_result_first: this.result1,
                        dial_result_second: this.result2,
                        created_at_start: this.$route.query.startTime,
                        created_at_end: this.$route.query.endTime,
                        page: this.currentPage
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            this.list = data.data.data
                            this.totalPage = Math.ceil(data.data.total / data.data.per_page)
                            this.total = data.data.total
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            },
            sms(id) {
                this.$refs.smsDialog.$emit('show', id)
            },
            call(id, tel, city, call, sex, call_num) {
                let query = Object.assign({}, this.$route.query, {
                    id: id,
                    project_id: this.project_id,
                    projectName: this.$route.query.projectName,
                    tel: tel,
                    city: city,
                    call: call,
                    sex: sex,
                    call_num: call_num,
                    sms:this.$route.query.sms
                })
                this.$router.push({
                    path: '/project/dial',
                    query: query
                })
            },
            view(id, tel, city, call, sex, call_num) {
                let query = Object.assign({}, this.$route.query, {
                    project_id: this.project_id,
                    id: id,
                    projectName: this.$route.query.projectName,
                    tel: tel,
                    city: city,
                    call: call,
                    sex: sex,
                    call_num: call_num,
                    sms:this.$route.query.sms
                })
                this.$router.push({
                    path: '/project/view',
                    query: query
                })
            }
        }
    }

</script>