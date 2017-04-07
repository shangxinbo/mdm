<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
<div class="warp">
    <div class="main">
        <div class="title-warp">中国电信项目1外呼列表</div>
        <div class="tag-nav">
            <a href="javascript:void(0);" class="active" onclick="tagCutover(this,'cutover-tab01')">未完成</a>
            <a href="javascript:void(0);" onclick="tagCutover(this,'cutover-tab02')">已完成</a>
        </div>
        <div class="data-property">
            <form>
                <div class="cutover">
                    <ul class="data-text cutover-tab01">
                        <li>
                            <label class="name">　手机号</label>
                            <div class="input-warp"><input class="text" type="text"></div>
                        </li>
                        <li>
                            <label class="name">拨打状态</label>
                            <div class="input-warp">
                                <div class="select-warp ">  <!-- 在div上加上class（select-open）显示出ul列表 -->
                                    <p class="all"><span>全部</span></p>
                                    <div class="select-ul">
                                        <div class="scroll-warp scrollBar">
                                            <ul>
                                                <li>全部</li>
                                                <li>未拨打</li>
                                                <li>拨打过</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="name">拨打结果</label>
                            <div class="input-warp">
                                <div class="select-warp ">  <!-- 在div上加上class（select-open）显示出ul列表 -->
                                    <p class="all"><span>全部</span></p>
                                    <div class="select-ul">
                                        <div class="scroll-warp scrollBar">
                                            <ul>
                                                <li>全部</li>
                                                <li>已拨通</li>
                                                <li>空号</li>
                                                <li>错号</li>
                                                <li>停机</li>
                                                <li>关机</li>
                                                <li>占线</li>
                                                <li>无人接听</li>
                                                <li>其他无接通</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="name">分配日期</label>
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
                    <ul class="data-text cutover-tab02" style="display: none">
                        <li>
                            <label class="name">　手机号</label>
                            <div class="input-warp"><input class="text" type="text"></div>
                        </li>
                        <li>
                            <label class="name">拨打结果</label>
                            <div class="input-warp">
                                <div class="select-warp ">  <!-- 在div上加上class（select-open）显示出ul列表 -->
                                    <p class="all"><span>全部</span></p>
                                    <div class="select-ul">
                                        <div class="scroll-warp scrollBar">
                                            <ul>
                                                <li>全部</li>
                                                <li>已拨通</li>
                                                <li>空号</li>
                                                <li>错号</li>
                                                <li>停机</li>
                                                <li>关机</li>
                                                <li>占线</li>
                                                <li>无人接听</li>
                                                <li>其他无接通</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="name">分配日期</label>
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
                </div>
            </form>
        </div>
        <div class="data-warp">
            <div class="cutover">
                <div class="data-table cutover-tab01">
                    <!--<p class="no-data">暂无数据</p>-->
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr><th>手机号</th><th>分配日期</th><th>拨打状态</th><th>拨打结果</th><th>操作</th></tr>
                        <tr><td>138****5556</td><td>2017-03-16</td><td>未拨打</td><td></td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a></td></tr>
                        <tr class="tr2"><td>138****5556</td><td>2017-03-16</td><td>拨打过</td><td>已拨通</td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a><a href="javascript:void(0);" onclick="getWindow('dialDetailView');">查看</a></td></tr>
                        <tr><td>138****5556</td><td>2017-03-16</td><td>未拨打</td><td></td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a></td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="data-table cutover-tab02" style="display: none">
                    <!--<p class="no-data">暂无数据</p>-->
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                        <tr><th>手机号</th><th>分配日期</th><th>拨打结果</th><th>操作</th></tr>
                        <tr><td>138****5556</td><td>2017-03-16</td><td>已拨通</td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a><a href="javascript:void(0);" onclick="getWindow('dialDetailView');">查看</a></td></tr>
                        <tr class="tr2"><td>138****5556</td><td>2017-03-16</td><td>空号</td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a><a href="javascript:void(0);" onclick="getWindow('dialDetailView');">查看</a></td></tr>
                        <tr><td>138****5556</td><td>2017-03-16</td><td>错号</td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a><a href="javascript:void(0);" onclick="getWindow('dialDetailView');">查看</a></td></tr>
                        <tr class="tr2"><td>138****5556</td><td>2017-03-16</td><td>停机</td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a><a href="javascript:void(0);" onclick="getWindow('dialDetailView');">查看</a></td></tr>
                        <tr><td>138****5556</td><td>2017-03-16</td><td>关机</td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a><a href="javascript:void(0);" onclick="getWindow('dialDetailView');">查看</a></td></tr>
                        <tr class="tr2"><td>138****5556</td><td>2017-03-16</td><td>占线</td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a><a href="javascript:void(0);" onclick="getWindow('dialDetailView');">查看</a></td></tr>
                        <tr><td>138****5556</td><td>2017-03-16</td><td>无人接听</td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a><a href="javascript:void(0);" onclick="getWindow('dialDetailView');">查看</a></td></tr>
                        <tr class="tr2"><td>138****5556</td><td>2017-03-16</td><td>其他未接通</td><td><a href="javascript:void(0);" onclick="getWindow('dialDetail','notClose');"><span class="notice"><i class="icon phone"></i></span>拨打</a><a href="javascript:void(0);" onclick="getWindow('dialDetailView');">查看</a></td></tr>
                        </tbody>
                    </table>
                </div>
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