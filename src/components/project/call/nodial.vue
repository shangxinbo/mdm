<template>
    <div>
        <div class="data-property">
            <searchForm @submit="search"></searchForm>
        </div>
        <div class="data-warp">
            <div class="cutover">
                <div class="data-table cutover-tab01">
                    <div class="data-export">
                        <ul>
                            <li>
                                <span class="t">未拨打</span><span class="num">{{total}}</span>
                            </li>
                        </ul>
                    </div>
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>拨打资源</th>
                                <th>归属地</th>
                                <th>分配日期</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>{{item.telephone_crypt}}</td>
                                <td>{{item.city}}</td>
                                <td>{{item.distribution_date}}</td>
                                <td>
                                    <a href="javascript:void(0);" @click="call(item.id,item.telephone)">
                                        <span class="notice">
                                            <i class="icon phone"></i>
                                        </span>拨打
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else class="no-data">暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import searchForm from './form1'

    export default {
        data() {
            return {
                id: '',
                city: '',
                currentPage: 1,
                totalPage: 1,
                list: [],
                total:0
            }
        },
        created() {
            this.render()
        },
        components: {
            pages,
            searchForm
        },
        watch: {
            $route() {
                this.render()
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

                this.id = this.$route.query.id
                this.city = this.$route.query.city ? this.$route.query.city : ''
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1

                mAjax(this, {
                    url: API.project_call_nodial_list,
                    data: {
                        project_id: this.id,
                        city: this.city,
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
                            this.$refs.alert.$emit('show', data.message)
                        }
                    }
                })
            },
            call(id, tel) {
                console.log(123)
            }
        }
    }

</script>