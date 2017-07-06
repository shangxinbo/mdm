<template>
    <div class="data-export">
        <ul>
            <li>
                <span class="t">项目数</span>
                <span class="num">{{data.projectNumTotal}}</span>
            </li>
            <li>
                <span class="t">进行中项目</span>
                <span class="num">{{data.projectStatusIngTotal}}</span>
            </li>
            <li>
                <span class="t">资源总量</span>
                <span class="num">{{data.clueNumTotal}}</span>
            </li>
            <li>
                <span class="t">未拨打</span>
                <span class="num">{{data.oddNumTotal}}</span>
            </li>
            <li>
                <span class="t">已拨通</span>
                <span class="num">{{data.connectNumTotal}}</span>
            </li>
            <li>
                <span class="t">拨通率</span>
                <span class="num">{{data.clueValidPercent}}%</span>
            </li>
            <li>
                <span class="t">挂机短信</span>
                <span class="num">{{data.hangUpSms}}</span>
            </li>
            <li>
                <span class="t">留资</span>
                <span class="num">{{data.leftInfo}}</span>
            </li>
        </ul>
        <div class="add-explain">
            <router-link to="/project/sms/template" class="btn blue"><span><i class="icon hook"></i>挂机短信模板管理</span></router-link>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object,
                require: true
            }
        }
    }

</script>