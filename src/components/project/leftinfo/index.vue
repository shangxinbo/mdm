<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">留资管理</div>
            <div class="data-property">
                <searchForm @submit="search"></searchForm>
                <div class="data-export" v-if="total>0">
                    <ul>
                        <li>
                            <span class="t">留资记录</span>
                            <span class="num">{{total}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="30%" label="手机号">{{props.item.telephone}}</td>
                        <td width="30%" label="姓名">{{props.item.name}}</td>
                        <td width="40%" label="提交时间">{{props.item.created_at}}</td>
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
                project_id: '',
                tel: '',
                name: '',
                startTime: '',
                endTime: '',
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {

                this.project_id = this.$route.query.project ? this.$route.query.project : ''
                this.tel = this.$route.query.tel ? this.$route.query.tel : ''
                this.name = this.$route.query.name ? this.$route.query.name : ''
                this.startTime = this.$route.query.startTime ? this.$route.query.startTime : ''
                this.endTime = this.$route.query.endTime ? this.$route.query.endTime : ''
                this.page = this.$route.query.page ? this.$route.query.page : 1

                this.$ajax({
                    url: API.left_info_list,
                    data: {
                        project_id: this.project_id,
                        phone: this.tel,
                        name: this.name,
                        start_time: this.startTime,
                        end_time: this.endTime,
                        page: this.page
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data.data
                            this.totalPage = Math.ceil(data.data.total / data.data.per_page)
                            this.total = data.data.total
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