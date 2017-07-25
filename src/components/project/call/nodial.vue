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
                            <span class="t">未拨打</span>
                            <span class="num">{{total}}</span>
                        </li>
                    </ul>
                </div>
                <mtable :list="list">
                    <template scope="props">
                        <td label="拨打资源">{{props.item.telephone_crypt}}</td>
                        <td label="归属地">{{props.item.city}}</td>
                        <td label="分配日期">{{props.item.distribution_date}}</td>
                        <td label="操作">
                            <a href="javascript:void(0);" @click="call(props.item.id,props.item.telephone_crypt,props.item.city,props.item.call,props.item.sex,props.item.call_num)">
                                <span class="notice">
                                    <i class="icon phone"></i>
                                </span>拨打
                            </a>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import searchForm from './form1'
    import mtable from 'components/utils/table'

    export default {
        data() {
            return {
                project_id: '',
                city: '',
                currentPage: 1,
                totalPage: 1,
                list: [],
                total: 0
            }
        },
        created() {
            this.render()
        },
        components: {
            pages,
            mtable,
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

                this.project_id = this.$route.query.project_id
                this.city = this.$route.query.city ? this.$route.query.city : ''
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1

                this.$ajax({
                    url: API.project_call_nodial_list,
                    data: {
                        project_id: this.project_id,
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
                            this.$toast(data.message)
                        }
                    }
                })
            },
            call(id, tel, city, call, sex, call_num) {
                let query = Object.assign({}, this.$route.query, {
                    project_id: this.project_id,
                    id: id,
                    projectName: this.$route.query.projectName,
                    tel: tel,
                    city: city,
                    call: call,
                    sex: sex ? sex : '',
                    call_num: call_num ? call_num : 0
                })
                this.$router.push({
                    path: '/project/dial',
                    query: query
                })
            }
        }
    }

</script>