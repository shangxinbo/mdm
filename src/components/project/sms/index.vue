<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">挂机短信管理</div>
            <div class="data-property">
                <searchForm @submit="search"></searchForm>
                <div class="data-export">
                    <ul>
                        <li v-if="clientName">
                            <span class="t">客户名称</span>
                            <span class="num">{{clientName}}</span>
                        </li>
                        <li v-if="projectName">
                            <span class="t">项目名称</span>
                            <span class="num">{{projectName}}</span>
                        </li>
                        <li v-if="total>0">
                            <span class="t">发送记录</span>
                            <span class="num">{{total}}</span>
                        </li>
                    </ul>
                    <a :href="exportUrl" class="btn blue btn-export">
                        <span>
                            <i class="icon icon-export"></i>导出</span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td label="手机号">{{props.item.telephone_crypt}}</td>
                        <td label="坐席">{{props.item.seat_name}}</td>
                        <td label="短信内容">{{props.item.preview_content}}</td>
                        <td label="发送时间">{{props.item.created_at}}</td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="page" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import searchForm from './searchForm'
    import mtable from 'components/utils/table'
    export default {
        data() {
            return {
                list: [],
                page: 1,
                totalPage: 1,
                total: '',
                projectName: '',
                clientName: '',
                client_id: '',
                project_id: '',
                tel: '',
                seat: '',
                content: '',
                startTime: '',
                endTime: '',
            }
        },
        created() {
            this.init()
        },
        computed: {
            exportUrl() {
                return `${API.sms_record_export}?page=${this.page}&project_id=${this.project_id}&client_id=${this.client_id}&start_time=${this.startTime}&end_time=${this.endTime}&phone=${this.tel}&content=${this.content}&seat_id=${this.seat}`
            }
        },
        methods: {
            init() {

                this.client_id = this.$route.query.client ? this.$route.query.client : ''
                this.project_id = this.$route.query.project ? this.$route.query.project : ''
                this.tel = this.$route.query.tel ? this.$route.query.tel : ''
                this.seat = this.$route.query.seat ? this.$route.query.seat : ''
                this.content = this.$route.query.content ? this.$route.query.content : ''
                this.startTime = this.$route.query.startTime ? this.$route.query.startTime : ''
                this.endTime = this.$route.query.endTime ? this.$route.query.endTime : ''
                this.page = this.$route.query.page ? this.$route.query.page : 1

                this.$ajax({
                    url: API.sms_record_list,
                    data: {
                        client_id: this.client_id,
                        project_id: this.project_id,
                        phone: this.tel,
                        seat_id: this.seat,
                        content: this.content,
                        start_time: this.startTime,
                        end_time: this.endTime,
                        page: this.page
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data.rows.data
                            this.totalPage = Math.ceil(data.data.rows.total / data.data.rows.per_page)
                            this.total = data.data.rows.total
                            this.clientName = data.data.client_name
                            this.projectName = data.data.project_name
                        } else {
                            this.list = []
                        }
                    }
                })
            },
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
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        components: {
            searchForm,
            mtable,
            pages
        }
    }

</script>