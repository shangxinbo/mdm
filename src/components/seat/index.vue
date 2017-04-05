<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
<div class="warp">
    <div class="main">
        <div class="title-warp">我的项目</div>
        <div class="data-property">
            <form>
                <ul class="data-text">
                    <li>
                        <label class="name">项目名称</label>
                        <div class="input-warp"><input class="text" type="text"></div>
                    </li>
                    <li>
                        <label class="name"> 项目状态</label>
                        <div class="input-warp">
                            <div class="select-warp ">  <!-- 在div上加上class（select-open）显示出ul列表 -->
                                <p class="all"><span>全部</span></p>
                                <div class="select-ul">
                                    <div class="scroll-warp scrollBar">
                                        <ul>
                                            <li>全部</li>
                                            <li>进行中</li>
                                            <li>已暂停</li>
                                            <li>已结束</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
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
                        <button class="btn blue" type="button" ><span><i class="icon search"></i>查询</span></button>
                    </li>
                </ul>

            </form>
        </div>
        <div class="data-warp">
            <div class="data-table">
                <!--<p class="no-data">暂无数据</p>-->
                <table cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                    	<th>项目名称</th>
                    	<th>类型</th>
                    	<th>创建日期</th>
                    	<th>状态</th>
                    	<th>线索量</th>
                    	<th>剩余线索</th>
                    	<th>拨通线索</th>
                    	<th>有效率</th>
                    	<th>通话时长</th>
                    	<th>剩余时间</th>
                    	<th>操作</th>
                    </tr>
                    <!---tr v-for="(item,index) in list" :class="{tr2:index%2}">
                    	<td>{{item.name}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.created_at}}</td>
                        <td>{{item.project_status}}</td>
                        <td>{{item.clue_num}}</td>
                        <td>{{item.clue_odd_num}}</td>
                        <td>{{item.clue_connect_num}}</td>
                        <td>{{item.clue_valid_percent}}</td>
                        <td>{{item.call_time}}</td>
                        <td>{{item.odd_time}}</td>
                        <td>
                            <a href="javascript:void(0);" @click="showDialog('call')">外呼</a>
                    </tr--!>
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