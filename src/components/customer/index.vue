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
                                <input class="text" type="text">
                            </div>
                        </li>
                        <li>
                            <label class="name">客户类型</label>
                            <div class="input-warp">
                                <div class="select-warp" :class="{'select-open':showType}">
                                    <p class="all" @click.stop="showTypeSelect">
                                        <span>全部</span>
                                    </p>
                                    <div class="select-ul">
                                        <div class="scroll-warp scrollBar">
                                            <ul>
                                                <li>全部</li>
                                                <li v-for="(item,index) in list" @click.stop="changeType(index,item)">{{item}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="name">客户状态</label>
                            <div class="input-warp">
                                <div class="select-warp ">
                                    <!-- 在div上加上class（select-open）显示出ul列表 -->
                                    <p class="all">
                                        <span>全部</span>
                                    </p>
                                    <div class="select-ul">
                                        <div class="scroll-warp scrollBar">
                                            <ul>
                                                <li>全部</li>
                                                <li>待审核</li>
                                                <li>未通过</li>
                                                <li>已开通</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button class="btn blue" type="button">
                                <span>
                                    <i class="icon search"></i>查询</span>
                            </button>
                        </li>
                    </ul>
                </form>
                <div class="data-export">
                    <a href="#" class="btn blue btn-export">
                        <span>
                            <i class="icon add"></i>新建客户</span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <!--<p class="no-data">暂无数据</p>-->
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
                                <td>{{item.audit_status}}</td>
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
    export default {
        data: function () {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1,
                user: '',
                type: '',
                auditStatus: '',
                typeList: {},
                showType: false
            }
        },
        components: {
            pages,
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
                        audit_status: _this.auditStatus
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
            },
            showTypeSelect: function () {
                this.showType = true
            },
            changeType:function(id,name){

            }
        },
        created: function () {
            mAjax(this, {
                url: API.customer_type_list,
                success: data => {
                    this.typeList = data.detail
                }
            })
            this.refresh()
        },
        mounted: function () {
            let _this = this
        }
    }

</script>