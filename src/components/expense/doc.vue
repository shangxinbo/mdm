<style lang="less">
    @import '../../assets/less/data-cloud.less';
</style>
<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">收费说明</div>
            <div class="data-warp">
                <div class="doc-warp">
                    <dl>
                        <dt>坐席费用</dt>
                        <dd>1、标准费用：<span class="f16">200元/坐席/月</span></dd>
                        <dd>2、说明：按月收取，比如3月20日开通坐席，当天收取200元费用，坐席有效使用时间是3月20日-4月20日</dd>
                    </dl>
                    <dl>
                        <dt>通讯费用</dt>
                        <dd>1、标准费用：<span class="f16">0.07元/分钟</span></dd>
                        <dd>2、说明：接通时间大于等于1秒时开始计时；通讯费用按照每通电话挂断后开始收取；不足1分钟按照1分钟计费</dd>
                    </dl>
                    <dl>
                        <dt>线索费用</dt>
                        <dd>各行业标准不同，具体请参见 <router-link to="/expense/doc">线索费列表</router-link></dd>
                        <dd>说明：每通电话挂断后系统自动扣除该笔线索费</dd>
                    </dl>
                    <dl>
                        <dt>扣费说明</dt>
                        <dd>坐席费用是即开通即扣</dd>
                        <dd>通讯费用和线索费用是挂断电话后即时扣款</dd>
                    </dl>
                    <dl>
                        <dt>付费说明</dt>
                        <dd>采用预付款的形式，方可享受平台服务</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
