<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">挂机短信模板管理</div>
            <div class="data-property">
                <searchForm @submit="search"></searchForm>
                <div class="data-export">
                    <ul>
                        <li v-if="all">
                            <span class="t">模板数</span>
                            <span class="num">{{all}}</span>
                        </li>
                        <li v-if="inuse">
                            <span class="t">使用中模板</span>
                            <span class="num">{{inuse}}</span>
                        </li>
                    </ul>
                    <router-link to="/project/sms/template/add" class="btn blue btn-export">
                        <span>
                            <i class="icon add"></i>新建模板</span>
                    </router-link>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="10%" label="模板名称">{{props.item.name}}</td>
                        <td width="10%" label="客户名称">{{props.item.client_name}}</td>
                        <td width="60%" label="短信内容">{{props.item.content}}</td>
                        <td width="10%" label="创建时间">{{props.item.created_at}}</td>
                        <td width="5%" label="状态">{{props.item.status|statusText}}</td>
                        <td width="5%" label="操作"> 
                            <router-link :to="{path:'/project/sms/template/add',query:{id:props.item.id}}">编辑</router-link>
                        </td>
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
    import searchForm from './templateForm'
    import mtable from 'components/utils/table'
    export default {
        data() {
            return {
                list: [],
                page: 1,
                totalPage: 1,
                all: 0,
                inuse: 0,
                name: '',
                client: '',
                status: '',
                startTime: '',
                endTime: '',
            }
        },
        created() {
            this.init()
        },
        filters: {
            statusText(val) {
                switch (val) {
                    case 1: return '审核中'
                    case 2: return '使用中'
                    case 3: return '已禁用'
                    default: return ''
                }
            }
        },
        methods: {
            init() {

                this.name = this.$route.query.name ? this.$route.query.name : ''
                this.client = this.$route.query.client ? this.$route.query.client : ''
                this.status = this.$route.query.status ? this.$route.query.status : ''
                this.startTime = this.$route.query.startTime ? this.$route.query.startTime : ''
                this.endTime = this.$route.query.endTime ? this.$route.query.endTime : ''
                this.page = this.$route.query.page ? this.$route.query.page : 1

                this.$ajax({
                    url: API.sms_template_list,
                    data: {
                        name: this.name,
                        client_id: this.client,
                        status: this.status,
                        start_time: this.startTime,
                        end_time: this.endTime,
                        page: this.page
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data.rows.data
                            this.totalPage = Math.ceil(data.data.rows.total / data.data.rows.per_page)
                            this.all = data.data.total_all
                            this.inuse = data.data.tatal_use
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