<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">项目管理</div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">项目名称</label>
                            <div class="input-warp">
                                <input class="text" type="text">
                            </div>
                        </li>
                        <customerSelect ref="customerSelect"></customerSelect>
                        <agentSelect ref="agentSelect"></agentSelect>
                        <statusSelect ref="statusSelect"></statusSelect>
                        <li>
                            <label class="name">创建日期</label>
                            <div class="input-warp date-warp">
                                <div class="calendar-warp w45">
                                    <input class="date" type="text" value="2016.12.01">
                                </div>
                                <em class="or">至</em>
                                <div class="calendar-warp w45">
                                    <input class="date" type="text" value="2016.12.07">
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
                    <ul>
                        <li>
                            <span class="t">项目数</span>
                            <span class="num">300</span>
                        </li>
                        <li>
                            <span class="t">进行中项目</span>
                            <span class="num">240</span>
                        </li>
                        <li>
                            <span class="t">线索量</span>
                            <span class="num">28000</span>
                        </li>
                        <li>
                            <span class="t">剩余线索</span>
                            <span class="num">28000</span>
                        </li>
                        <li>
                            <span class="t">拨通线索</span>
                            <span class="num">20000</span>
                        </li>
                        <li>
                            <span class="t">有效率</span>
                            <span class="num">80%</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <!--<p class="no-data">暂无数据</p>-->
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>项目名称</th>
                                <th>客户名称</th>
                                <th>所属代理</th>
                                <th>类型</th>
                                <th>创建日期</th>
                                <th>状态</th>
                                <th>线索量</th>
                                <th>剩余线索</th>
                                <th>拨通线索</th>
                                <th>有效率</th>
                                <th>通话时长</th>
                                <th>剩余时间</th>
                                <th>项目坐席</th>
                                <th>操作</th>
                            </tr>
                            <tr>
                                <td>
                                    <a href="#">中国电信项目1</a>
                                </td>
                                <td>
                                    <a href="operate-project-client.html">中国电信</a>
                                </td>
                                <td>
                                    <a href="operate-project-agent.html">代理1</a>
                                </td>
                                <td>sim卡电销</td>
                                <td>2017-03-16</td>
                                <td>待审核</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <a href="operate-project-examine.html">审核</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import customerSelect from './customerSelect'
    import agentSelect from 'components/customer/agentSelect'
    import statusSelect from './statusSelect'
    export default {
        data: function () {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1
            }
        },
        computed: {
            customer: function () {
                return this.$refs.customerSelect ? this.$refs.customerSelect.selected.id : ''
            },
            agent: function () {
                return this.$refs.agentSelect ? this.$refs.agentSelect.selected.id : ''
            },
            status: function () {
                return this.$refs.statusSelect ? this.$refs.statusSelect.selected.id : ''
            }
        },
        components: {
            pages,
            customerSelect,
            agentSelect,
            statusSelect
        }
    }

</script>