<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">操作手册管理</div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>账号权限</th>
                                <th>操作手册名称</th>
                                <th>上传时间</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>{{item.role}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.date}}</td>
                                <td>
                                    <a href="javascript:void(0);" @click="dialog(item.id,item.role,item.name)">更新手册</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <upDialog ref="dialog"></upDialog>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import upDialog from './dialog/updoc'
    export default {
        data() {
            return {
                list: []
            }
        },
        created() {
            mAjax(this, {
                url: API.doc_list,
                success: data => {
                    this.list = data.data
                }
            })
        },
        methods: {
            dialog(id, role, name) {
                this.$refs.dialog.$emit('show', id, role, name)
            }
        },
        components: {
            upDialog
        }
    }

</script>