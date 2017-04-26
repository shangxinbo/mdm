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
                <span class="t">线索量</span>
                <span class="num">{{data.clueNumTotal}}</span>
            </li>
            <li>
                <span class="t">剩余线索</span>
                <span class="num">{{data.oddNumTotal}}</span>
            </li>
            <li>
                <span class="t">拨通线索</span>
                <span class="num">{{data.connectNumTotal}}</span>
            </li>
            <li>
                <span class="t">有效率</span>
                <span class="num">{{data.clueValidPercent}}%</span>
            </li>
        </ul>
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