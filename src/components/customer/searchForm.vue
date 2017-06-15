<template>
    <form>
        <ul class="data-text">
            <li>
                <label class="name">客户名称</label>
                <div class="input-warp">
                    <input class="text" v-model="customerName" type="text">
                </div>
            </li>
            <li v-if="userType==1&&type=='all'">
                <label class="name">所属代理</label>
                <mselect ref="agentSelect" :api="agentApi" :id="agentId"></mselect>
            </li>
            <li>
                <label class="name">客户类型</label>
                <mselect ref="typeSelect" :api="typeApi" :id="typeId"></mselect>
            </li>
            <li>
                <label class="name">客户状态</label>
                <mselect ref="statusSelect" :initlist="statusList" :id="statusId"></mselect>
            </li>
            <li>
                <a class="btn blue" type="button" @click="search()">
                    <span>
                        <i class="icon search"></i>查询
                    </span>
                </a>
            </li>
        </ul>
    </form>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    
    let agentApi = API.angent_list_all
    let typeApi = API.customer_type_list
    let statusList = [
        {id:"0",name: "待审核"},
        {id:"1",name: "通过"},
        {id:"2",name: "未通过"}
    ]

    export default {
        props:['userType'],
        data(){
            return {
                type:'all',
                customerName:'',
                agentId:'',
                typeId:'',
                statusId:'',
                agentApi,
                typeApi,
                statusList
            }
        },
        methods:{
            init() {
                this.customerName = this.$route.query.customerName ? this.$route.query.customerName : ''
                this.typeId = this.$route.query.typeId==undefined ?'': this.$route.query.typeId
                this.agentId = this.$route.query.agentId==undefined ?'': this.$route.query.agentId
                this.statusId = this.$route.query.statusId==undefined ?'': this.$route.query.statusId
                if(this.$route.query.agent_id) {
                    this.type = 'agent'
                }else{
                    this.type = 'all'
                }
            },
            search(){
                let obj = {
                    customerName: this.customerName,
                    typeId: this.$refs.typeSelect.selected.id,
                    statusId: this.$refs.statusSelect.selected.id
                }
                if(this.$refs.agentSelect)
                    obj.agentId = this.$refs.agentSelect.selected.id
                this.$emit('submit', obj)
            }
        },
        created() {
            this.init()
            let _this = this
            document.onkeyup = function (evt) {
                if (evt.keyCode == 13)
                    _this.search()
            }
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        components: {
            mselect
        }
    }
</script>