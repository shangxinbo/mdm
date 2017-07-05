<template>
    <div class="dialog" id="originalClient">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭"></a>
        <div class="dialog-header">
            <h4>未建挂机短信模板客户</h4>
        </div>
        <div class="dialog-body">
            <div class="dialog-client">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <th>客户名称</th>
                            <th class="w80">所属代理</th>
                            <th class="w80">客户类型</th>
                            <th class="w140">创建日期</th>
                        </tr>
                    </table>
                </div>
                <div class="scroll-warp scrollBar">
                    <div class="data-table check-warp">
                        <table cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="">
                                        <a href="operate-manage-detail.html">北京字节跳动科技有限公司</a>
                                    </td>
                                    <td class="w80">
                                        <a href="operate-manage-agent.html">代理1</a>
                                    </td>
                                    <td class="w80">旅游</td>
                                    <td class="w140">2017-05-17</td>
                                </tr>
                                <tr class="tr2">
                                    <td class="">
                                        <a href="operate-manage-detail.html">北京字节跳动科技有限公司</a>
                                    </td>
                                    <td class="w80">
                                        <a href="operate-manage-agent.html">代理1</a>
                                    </td>
                                    <td class="w80">旅游</td>
                                    <td class="w140">2017-05-17</td>
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
    export default {
        data(){
            return {}
        },
        created(){
            this.$on('show',()=>{
                console.log(123)
            })
        }
    }
</script>