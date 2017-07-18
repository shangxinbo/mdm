<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">运营管理</div>
            <div class="data-property">
                <div class="data-export">
                    <a href="javascript:void(0);" @click="showCreateDialog" class="btn blue btn-export">
                        <span>
                            <i class="icon add"></i>新建运营
                        </span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td label="运营账号">{{props.item.user}}</td>
                        <td label="姓名">{{props.item.user_name}}</td>
                        <td label="邮箱">{{props.item.mail}}</td>
                        <td label="手机号">{{props.item.tel}}</td>
                        <td label="权限">{{props.item.rule}}</td>
                        <td label="创建时间">{{props.item.created_at}}</td>
                        <td label="操作">
                            <a href="javascript:void(0);" @click="showUpdateDialog(props.item.id,props.item.user,props.item.user_name,props.item.mail,props.item.tel)">修改信息</a>
                            <a href="javascript:void(0);" @click="showResetPassDialog(props.item.id,props.item.user)">重置密码</a>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
        <update-info-dialog ref="updateinfo"></update-info-dialog>
        <change-pass-dialog ref="resetpass"></change-pass-dialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import updateInfoDialog from './dialog/upinfo'
    import changePassDialog from 'components/dialog/resetpass'
    import mtable from 'components/utils/table'

    export default {
        data() {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1
            }
        },
        components: {
            pages,
            updateInfoDialog,
            mtable,
            changePassDialog
        },
        watch: {
            $route() {
                this.init()
            }
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.refresh()
            },
            refresh() {
                this.$ajax({
                    url: API.operate_list,
                    data: {
                        page: this.currentPage
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            let list = data.data
                            this.list = list.data
                            this.totalPage = Math.ceil(list.total / list.per_page)
                        } else {
                            this.list = ''
                            this.$toast(data.message)
                        }
                    }
                })
            },
            jump(num) {
                let obj = Object.assign({}, this.$route.query, { page: num })
                this.$router.replace({
                    name: this.$route.name,
                    query: obj
                })
            },
            showResetPassDialog(id, user) {
                this.$refs.resetpass.$emit('show', id, user)
            },
            showUpdateDialog(id, user, username, email, tel) {
                this.$refs.updateinfo.$emit('edit', id, user, username, email, tel)
            },
            showCreateDialog() {
                this.$refs.updateinfo.$emit('create')
            }
        },
        created() {
            this.init()
        }
    }

</script>