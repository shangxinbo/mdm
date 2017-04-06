<template>
    <div class="input-warp">
        <div class="select-warp" :class="{'select-open':show}">
            <p class="all" @click.stop="showSelect">
                <span>{{selected.name}}</span>
            </p>
            <div class="select-ul">
                <div class="scroll-warp scrollBar" style="overflow-y:auto">
                    <ul>
                        <li @click.stop="changeType('','全部')">全部</li>
                        <li v-for="(item,index) in list" @click.stop="change(index,item)">{{item.desc?item.desc:item}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import Vue from 'vue'
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
        props: ['api'],
        methods: {
            showSelect: function () {
                this.show = true
            },
            change: function (id, name) {
                if (typeof (name) == 'object') {
                    this.selected = {
                        id: name.code,
                        name: name.desc
                    }
                } else {
                    this.selected = {
                        id: id,
                        name: name
                    }
                }
                this.show = false
            }
        },
        created: function () {
            mAjax(this, {
                url: this.api,
                success: data => {
                    this.list = data.data
                }
            })
        },
        mounted: function () {
            let _this = this
            Vue.nextTick(() => {
                document.addEventListener('click', () => {
                    _this.show = false
                })
            })
        }
    }

</script>