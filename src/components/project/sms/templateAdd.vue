<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">新建模板</div>
            <div class="data-detail">
                <form>
                    <ul class="data-text">
                        <li>
                            <label class="name">模板名称</label>
                            <div class="input-warp">
                                <input class="text" type="text">
                            </div>
                        </li>
                        <li>
                            <label class="name">客户名称</label>
                            <div class="input-warp">
                                <div class="select-warp ">
                                    <!-- 在div上加上class（select-open）显示出ul列表 -->
                                    <p class="all">
                                        <span>请选择</span>
                                    </p>
                                    <div class="select-ul">
                                        <div class="scroll-warp scrollBar">
                                            <ul>
                                                <li>中国电信</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label class="name">短信类型</label>
                            <div class="input-warp">
                                <p class="text">挂机短信</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">短信文本</label>
                            <div class="input-warp">
                                <textarea></textarea>
                                <p class="tips block">最多录入70个字符，已经输入0个字符</p>
                            </div>
                        </li>
                        <li>
                            <label class="name">短信链接</label>
                            <div class="input-warp">
                                <input class="text" type="text">
                                <p class="tips block">如有短信链接，务必在短信文本中对应位置加入链接占位符#url#</p>
                                <!--<p class="tips block error">请输入正确的链接</p>-->
                            </div>
                        </li>
                        <li>
                            <label class="name">短信签名</label>
                            <div class="input-warp">
                                <input class="text" type="text">
                            </div>
                        </li>
                    </ul>
                    <ul class="data-text">
                        <li class="li-radio">
                            <label class="name">模板状态</label>
                            <div class="input-warp">
                                <label onclick="tagCutover(this)" class="radio-warp radio-inline" for="mode1">
                                    <input type="radio" name="sendMode" class="radio" id="mode1">
                                    <i class="icon"></i>
                                    <span class="radioname">审核中</span>
                                </label>
                                <label onclick="tagCutover(this)" class="radio-warp radio-inline" for="mode2">
                                    <input type="radio" name="sendMode" class="radio" id="mode2">
                                    <i class="icon"></i>
                                    <span class="radioname">使用中</span>
                                </label>
                                <label onclick="tagCutover(this)" class="radio-warp radio-inline" for="mode3">
                                    <input type="radio" name="sendMode" class="radio" id="mode3">
                                    <i class="icon"></i>
                                    <span class="radioname">已禁用</span>
                                </label>
                            </div>
                        </li>
                        <li class="li-btn">
                            <div class="input-warp">
                                <button class="btn blue" type="button" onclick="getWindow('submitSucc','tips-succ');">提交</button>
                            </div>
                        </li>
                    </ul>
                </form>
                <div class="sms-phone">
                    <div class="inrr">
                        <i class="bg-up"></i>
                        <i class="bg-down"></i>
                        <p>【集奥聚合】</p>
                        <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                            <a href="">http://www.geotmt.com/ </a> 退订TD</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>