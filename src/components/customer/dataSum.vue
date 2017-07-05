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
        <div class="add-explain">
            <a href="javascript:void(0);" @click="noTemplate">未建挂机短信模板客户</a>
            <router-link v-if="userType==2||userType==1" to="/customer/add" class="btn blue">
                <span>
                    <i class="icon add"></i>新建客户
                </span>
            </router-link>
        </div>
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
        },
        methods:{
            noTemplate(){
                this.$emit('showNoTemplate')
            }
        }
    }

</script>