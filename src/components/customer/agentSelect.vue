<template>
    <li>
        <label class="name">所属代理</label>
        <div class="input-warp">
            <div class="select-warp" :class="{'select-open':showStatus}">
                <p class="all" @click.stop="showSelect">
                    <span>{{selected.name}}</span>
                </p>
                <div class="select-ul">
                    <div class="scroll-warp scrollBar" style="overflow-y:auto">
                        <ul>
                            <li @click.stop="change('','全部')">全部</li>
                            <li v-for="(item,index) in list" @click.stop="change(index,item)">{{item}}</li>
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
                selected: {
                    id: '',
                    name: '全部'
                },
                list: {},
                showStatus: false
            }
        },
        methods: {
            showSelect: function () {
                this.showStatus = true
            },
            change: function (id, name) {
                this.selected = {
                    id: id,
                    name: name
                }
                this.showStatus = false
            }
        },
        created: function () {
            mAjax(this, {
                url: API.customer_type_list,
                success: data => {
                    this.list = data.data
                }
            })
        },
        mounted:function(){
            //TODO  nextstick
        }
    }
</script>