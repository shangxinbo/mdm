<template>
    <div class="data-export">
        <ul v-if="userType==1&&list.length>0">
            <li>
                <span class="t">客户数</span>
                <span class="num">{{data.customer}}</span>
            </li>
            <li>
                <span class="t">进行中项目</span>
                <span class="num">{{data.project}}</span>
            </li>
            <li>
                <span class="t">在用坐席</span>
                <span class="num">{{data.seat}}</span>
            </li>
        </ul>
        <router-link v-if="userType==2||userType==1" to="/customer/add" class="btn blue btn-export">
            <span>
                <i class="icon add"></i>新建客户
            </span>
        </router-link>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object,
                require: true
            },
            userType:String,
            list:{
                type: Array,
                require:true
            }
        }
    }

</script>