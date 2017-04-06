<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
  <div class="warp">
    <div class="main">
        <div class="title-warp">我的话务</div>
        <div class="data-property">
            <form>
                <ul class="data-text">
                    <li>
                        <label class="name">项目名称</label>
                        <div class="input-warp"><input class="text" type="text"></div>
                    </li>
                    <li>
                        <label class="name">日期</label>
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
                        <button class="btn blue" type="button" ><span><i class="icon search"></i>查询</span></button>
                    </li>
                </ul>
            </form>
        </div>
        <div class="data-warp">
            <div class="data-table">
                <!--<p class="no-data">暂无数据</p>-->
                <div class="data-export">
                    <ul>
                        <li>
                            <span class="t">拨通次数</span><span class="num">800</span>
                        </li>
                        <li>
                            <span class="t">通话时长</span><span class="num">12小时46分</span>
                        </li>
                    </ul>
                    <a href="javascript:void(0);" class="btn blue btn-export"><span><i class="icon icon-export"></i>导出</span></a>
                </div>
                <table cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <th>项目名称</th>
                        <th>外呼次数</th>
                        <th>拨通次数</th>
                        <th>拨通率</th>
                        <th>呼损次数</th>
                        <th>呼损率</th>
                        <th>通话时长</th>
                        <th>平均通话</th>
                    </tr>
                    <!---tr v-for="(item,index) in list":class="{tr2:index%2}">
                        <td>{{item.name}}</td>
                        <td>{{item.call_times}}</td>
                        <td>{{item.effect_call_times}}</td>
                        <td>{{item.effect_call_rate}}</td>
                        <td>{{item.uneffect_call_times}}</td>
                        <td>{{item.uneffect_call_rate}}</td>
                        <td>{{item.charge_time}}</td>
                        <td>{{item.avg_time}}</td>
                        <td>
                            <a href="javascript:void(0);" @click="showDialog('call')">外呼</a>
                        </td>
                    </tr-->
                    </tbody>
                </table>
            </div>
            <div class="page">
                <a class="prev disabled" href="javascript:void(0);">上一页</a>
                <a href="javascript:void(0);" class="active">1</a>
                <a href="javascript:void(0);">2</a>
                <a href="javascript:void(0);">3</a>
                <span>...</span>
                <a href="javascript:void(0);">19</a>
                <a class="next" href="javascript:void(0);">下一页</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import updateInfoDialog from 'components/agent/dialog/upinfo'
    import changePassDialog from 'components/agent/dialog/changepass'
    export default {
        data: function () {
            return {
                list: [],
                currentPage: 1,
                totalPage: 1,
                customer_name
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
                            let list = data.data
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
                this.$router.replace('/seat//' + num)
                this.refresh()
            },
            showDialog(){
                
            }
        },
        created: function () {
            this.refresh()
        }
    }

</script>