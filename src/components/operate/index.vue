<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">运营管理</div>
            <div class="data-property">
                <div class="data-export">
                    <a href="javascript:void(0);" @click="showDialog('create')" class="btn blue btn-export">
                        <span>
                            <i class="icon add"></i>新建运营
                        </span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>运营账号</th>
                                <th>姓名</th>
                                <th>邮箱</th>
                                <th>手机号</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>{{item.user}}</td>
                                <td>{{item.user_name}}</td>
                                <td>{{item.mail}}</td>
                                <td>{{item.tel}}</td>
                                <td>{{item.create_at}}</td>
                                <td>
                                    <a href="javascript:void(0);" @click="showDialog('update')">修改信息</a>
                                    <a href="javascript:void(0);" @click="showResetPassDialog(item.id,item.user)">重置密码</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
        <update-info-dialog></update-info-dialog>
        <change-pass-dialog ref="resetpass"></change-pass-dialog>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import updateInfoDialog from 'components/operate/dialog/upinfo'
    import changePassDialog from 'components/operate/dialog/changepass'
    export default {
        data: function () {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1
            }
        },
        components: {
            pages,
            updateInfoDialog,
            changePassDialog
        },
        methods: {
            refresh() {
                let _this = this
                let page = this.$route.params.page
                page = page ? page : 1
                mAjax(this, {
                    url: API.operate_list,
                    data: {
                        page: page,
                        customer_name: _this.customer_name,
                        project_name: _this.project_name
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
                this.$router.replace('/operate/index/' + num)
                this.refresh()
            },
            showResetPassDialog(id,user){
                this.$refs.resetpass.$emit('show',id,user)
            }
        },
        created: function () {
            this.refresh()
        }
    }

</script>