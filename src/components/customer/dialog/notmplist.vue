<template>
    <div class="dialog" :style="{display:style,'margin-left':'-322px','margin-top':'-249px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>未建挂机短信模板客户</h4>
        </div>
        <div class="dialog-body">
            <div class="dialog-client">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <th width="40%">客户名称</th>
                            <th width="30%">客户类型</th>
                            <th width="30%">创建日期</th>
                        </tr>
                    </table>
                </div>
                <div class="scroll-warp scrollBar" style="overflow-y:auto" @scroll="scroll">
                    <div class="data-table check-warp">
                        <table cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr v-for="(item,index) in list" :class="{tr2:index%2,checked:item.checked}">
                                    <td width="40%">
                                        <router-link :to="'/customer/detail/'+item.id">{{item.company}}</router-link>
                                    </td>
                                    <td width="30%">{{item.type}}</td>
                                    <td width="30%">{{item.created_at.substr(0,10)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    export default {
        data() {
            return {
                style: 'none',
                list: [],
                page: 1,
                loading: false
            }
        },
        created() {
            this.$on('show', () => {
                this.list = []
                this.page = 1
                this.getData()
            })
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            getData() {
                if (!this.loading) {
                    this.loading = true
                    this.$ajax({
                        url: API.no_sms_template_customer,
                        data: {
                            page: this.page
                        },
                        success: data => {
                            this.loading = false
                            if (data.code == 200) {
                                this.page++
                                this.list = this.list.concat(data.data.data)
                                if (this.style == 'none') {
                                    this.style = 'block'
                                    this.$nextTick(function () {
                                        this.$el.querySelector('.scroll-warp').scrollTop = 0
                                    })
                                    this.$store.commit('SHOW_LAYER')
                                }
                            }
                        }
                    })
                }
            },
            scroll() {
                let scrollTop = this.$el.querySelector('.scroll-warp').scrollTop
                let containerHeight = this.$el.querySelector('.scroll-warp').offsetHeight
                let contentHeight = this.$el.querySelector('table tbody').offsetHeight
                if (scrollTop + containerHeight + 40 > contentHeight) {
                    this.getData()
                }
            }
        }
    }

</script>