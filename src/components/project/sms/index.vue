<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">挂机短信管理</div>
            <div class="data-property">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">手机号</label>
                            <div class="input-warp">
                                <input class="text" type="text">
                            </div>
                        </li>
                        <li>
                            <label class="name">坐席</label>
                            <div class="input-warp">
                                <div class="select-warp ">
                                    <!-- 在div上加上class（select-open）显示出ul列表 -->
                                    <p class="all">
                                        <span>全部</span>
                                    </p>
                                    <div class="select-ul">
                                        <div class="scroll-warp scrollBar">
                                            <ul>
                                                <li>全部</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="name">短信内容</label>
                            <div class="input-warp">
                                <input class="text" type="text">
                            </div>
                        </li>
                        <li>
                            <label class="name">发送日期</label>
                            <div class="input-warp date-warp">
                                <div class="calendar-warp w45">
                                    <input class="date" type="text" value="2016-12-01">
                                </div>
                                <em class="or">至</em>
                                <div class="calendar-warp w45">
                                    <input class="date" type="text" value="2016-12-07">
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
                            <span class="t">客户名称</span>
                            <span class="num">中国电信</span>
                        </li>
                        <li>
                            <span class="t">项目名称</span>
                            <span class="num">中国电信项目1</span>
                        </li>
                        <li>
                            <span class="t">发送记录</span>
                            <span class="num">300</span>
                        </li>
                    </ul>
                    <a href="javascript:void(0);" class="btn blue btn-export">
                        <span>
                            <i class="icon icon-export"></i>导出</span>
                    </a>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <!--<p class="no-data">暂无数据</p>-->
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>手机号</th>
                                <th>坐席</th>
                                <th>短信内容</th>
                                <th>发送时间</th>
                            </tr>
                            <tr>
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
                            </tr>
                            <tr class="tr2">
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
                            </tr>
                            <tr>
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
                            </tr>
                            <tr class="tr2">
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
                            </tr>
                            <tr>
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
                            </tr>
                            <tr class="tr2">
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
                            </tr>
                            <tr>
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
                            </tr>
                            <tr class="tr2">
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
                            </tr>
                            <tr>
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
                            </tr>
                            <tr class="tr2">
                                <td>159****0025</td>
                                <td>XCR001</td>
                                <td>内容内容内容内容内容内容内容内容内容内容内容内</td>
                                <td>【2017-06-25】16:03:30</td>
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