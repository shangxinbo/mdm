<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">客户管理</div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">客户名称</label>
                            <div class="input-warp">
                                <input class="text" v-model="user" type="text">
                            </div>
                        </li>
                        <typeSelect ref="typeSelect"></typeSelect>
                        <statusSelect ref="statusSelect"></statusSelect>
                        <li>
                            <button class="btn blue" type="button" @click="jump(1)">
                                <span>
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                    </ul>
                </form>
                <div class="data-export">
                    <router-link to="/customer/add" class="btn blue btn-export">
                        <span>
                            <i class="icon add"></i>新建客户
                        </span>
                    </router-link>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>客户名称</th>
                                <th>类型</th>
                                <th>创建日期</th>
                                <th>状态</th>
                                <th>余额</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>
                                    <a href="#">{{item.company}}</a>
                                </td>
                                <td>{{item.type}}</td>
                                <td>{{item.created_at}}</td>
                                <td v-if="item.audit_status==1">通过</td>
                                <td v-else-if="item.audit_status==2" class="red">未通过</td>
                                <td v-else>待审核</td>
                                <td>¥{{item.balance}}</td>
                                <td>
                                    <a href="javascript:void(0);">修改信息</a>
                                    <a href="javascript:void(0);">重置密码</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import typeSelect from './typeSelect'
    import statusSelect from './statusSelect'
    export default {
        data: function () {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1,
                user: ''
            }
        },
        computed: {
            type: function () {
                return this.$refs.typeSelect ? this.$refs.typeSelect.type.id : ''
            },
            status: function () {
                return this.$refs.statusSelect ? this.$refs.statusSelect.selected.id : ''
            }
        },
        components: {
            pages,
            typeSelect,
            statusSelect
        },
        methods: {
            refresh() {
                let _this = this
                let page = this.$route.params.page
                page = page ? page : 1
                mAjax(this, {
                    url: API.customer_list,
                    data: {
                        page: page,
                        user: _this.user,
                        type: _this.type,
                        audit_status: _this.status
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            let list = data.detail
                            _this.list = list.data
                            _this.totalPage = Math.ceil(list.total / list.per_page)
                            _this.currentPage = page
                        } else {
                            _this.list = ''
                        }
                    }
                })
            },
            jump(num) {
                this.$router.replace('/customer/index/' + num)
                this.refresh()
            }
        },
        created: function () {
            this.refresh()
        }
    }

</script>