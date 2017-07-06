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
                    <a href="javascript:void(0);" class="btn blue btn-export">
                        <span>
                            <i class="icon icon-export"></i>导出</span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table v-if="list.length>0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>手机号</th>
                                <th>坐席</th>
                                <th>短信内容</th>
                                <th>发送时间</th>
                            </tr>
                            <tr v-for="item in list">
                                <td>{{item.telephone_crypt}}</td>
                                <td>{{item.seat_name}}</td>
                                <td>{{item.preview_content}}</td>
                                <td>{{item.created_at}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else class="no-data">暂无数据</p>
                </div>
                <pages :total="totalPage" :current="page" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import searchForm from './searchForm'
    export default {
        data() {
            return {
                list: [],
                page:1,
                totalPage:1,
                total:'',
                projectName:'',
                clientName:''
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {

                let client_id = this.$route.query.client
                let project_id = this.$route.query.project
                let tel = this.$route.query.tel
                let seat = this.$route.query.seat
                let content = this.$route.query.content
                let startTime = this.$route.query.startTime
                let endTime = this.$route.query.endTime
                this.page = this.$route.query.page
                
                mAjax(this, {
                    url: API.sms_record_list,
                    data: {
                        client_id: client_id,
                        project_id: project_id,
                        phone: tel,
                        seat_id: seat,
                        content: content,
                        start_time: startTime,
                        end_time: endTime,
                        page:this.page
                    },
                    success: data => {
                        if(data.code==200){
                            this.list = data.data.rows.data
                            this.totalPage = Math.ceil(data.data.rows.total/data.data.rows.per_page)
                            this.total = data.data.rows.total
                            this.clientName = data.data.client_name
                            this.projectName = data.data.project_name
                        }else{
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
            pages
        }
    }

</script>