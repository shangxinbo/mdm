<template>
    <li>
        <label class="name">客户类型</label>
        <div class="input-warp">
            <div class="select-warp" :class="{'select-open':showType}">
                <p class="all" @click.stop="showTypeSelect">
                    <span>{{type.name}}</span>
                </p>
                <div class="select-ul">
                    <div class="scroll-warp scrollBar" style="overflow-y:auto">
                        <ul>
                            <li @click.stop="changeType('','全部')">全部</li>
                            <li v-for="(item,index) in typeList" @click.stop="changeType(index,item)">{{item}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        data: function () {
            return {
                type: {
                    id: '',
                    name: '全部'
                },
                typeList: {},
                showType: false
            }
        },
        methods: { 
            showTypeSelect: function () {
                this.showType = true
            },
            changeType: function (id, name) {
                this.type = {
                    id: id,
                    name: name
                }
                this.showType = false
            }
        },
        created: function () {
            mAjax(this, {
                url: API.customer_type_list,
                success: data => {
                    this.typeList = data.data
                }
            })
        },
        mounted:function(){
            //TODO  nextstick
        }
    }

</script>