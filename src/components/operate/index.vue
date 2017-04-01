<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">运营管理</div>
            <div class="data-property">
                <div class="data-export">
                    <a href="javascript:void(0);" class="btn blue btn-export">
                        <span>
                            <i class="icon add"></i>新建运营</span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">

                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>运营账号</th>
                                <th>姓名</th>
                                <th>邮箱</th>
                                <th>手机号</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
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