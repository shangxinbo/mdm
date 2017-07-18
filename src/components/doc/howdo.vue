<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">操作手册管理</div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td label="账号权限">{{props.item.role}}</td>
                        <td label="操作手册名称">{{props.item.name}}</td>
                        <td label="操作">{{props.item.date}}</td>
                        <td label="操作">
                            <a href="javascript:void(0);" @click="dialog(props.item.id,props.item.role,props.item.name)">更新手册</a>
                        </td>
                    </template>
                </mtable>
            </div>
        </div>
        <upDialog ref="dialog"></upDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import upDialog from './dialog/updoc'
    import mtable from 'components/utils/table'

    export default {
        data() {
            return {
                list: []
            }
        },
        created() {
            this.$ajax({
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
            upDialog,
            mtable
        }
    }

</script>