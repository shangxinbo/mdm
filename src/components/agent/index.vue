<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">代理管理</div>
            <div class="data-property">
                <div class="data-export">
                    <a href="javascript:void(0);" @click="showCreateDialog" class="btn blue btn-export">
                        <span>
                            <i class="icon add"></i>新建代理
                        </span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                        <tr>
                            <th width="5%">代理账号</th>
                            <th width="5%">代理名称</th>
                            <th width="5%">姓名</th>
                            <th width="10%">邮箱</th>
                            <th width="5%">手机号</th>
                            <th width="20%">归属地</th>
                            <th width="20%">所在位置</th>
                            <th width="10%">创建时间</th>
                            <th width="10%">操作</th>
                        </tr>
                        <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                            <td>{{item.user}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.user_name}}</td>
                            <td>{{item.mail}}</td>
                            <td>{{item.tel}}</td>
                            <td>{{item.regoin}}</td>
                            <td>{{item.application_addr}}</td>
                            <td>{{item.created_at}}</td>
                            <td>
                                <a href="javascript:void(0);" @click="showUpdateDialog(item.id)">修改信息</a>
                                <a href="javascript:void(0);" @click="showPassDialog(item.id,item.user)">重置密码</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
        <update-info-dialog ref="changeInfo"></update-info-dialog>
        <change-pass-dialog ref="changePwd"></change-pass-dialog>
    </div>
</template>
<script>
    import {mAjax} from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import updateInfoDialog from './dialog/upinfo'
    import changePassDialog from 'components/dialog/resetpass'
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
                    url: API.agent_list,
                    data: {
                        page: page
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            let list = data.data
                            _this.list = list.data
                            _this.totalPage = Math.ceil(list.total / list.per_page)
                            _this.currentPage = page
                        } else {
                            _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    }
                })
            },
            jump(num) {
                this.$router.replace('/agent/index/' + num)
                this.refresh()
            },
            showCreateDialog(){
                this.$refs.changeInfo.$emit('show')
            },
            showUpdateDialog(uid){
                this.$refs.changeInfo.$emit('show', uid)
            },
            showPassDialog(uid, uname){
                this.$refs.changePwd.$emit('show', uid, uname)
            }
        },
        created: function () {
            this.refresh()
        }
    }

</script>
