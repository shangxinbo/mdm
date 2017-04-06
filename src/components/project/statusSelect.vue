<template>
    <li>
        <label class="name">项目状态</label>
        <div class="input-warp">
            <div class="select-warp" :class="{'select-open':show}">
                <p class="all" @click.stop="showSelect">
                    <span>{{selected.name}}</span>
                </p>
                <div class="select-ul">
                    <div class="scroll-warp scrollBar" style="overflow-y:auto">
                        <ul>
                            <li @click.stop="changeType('','全部')">全部</li>
                            <li v-for="(item,index) in list" @click.stop="change(item.code,item.desc)">{{item.desc}}</li>
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
                show: false
            }
        },
        methods: { 
            showSelect: function () {
                this.show = true
            },
            change: function (id, name) {
                this.selected = {
                    id: id,
                    name: name
                }
                this.show = false
            }
        },
        created: function () {
            mAjax(this, {
                url: API.project_status,
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