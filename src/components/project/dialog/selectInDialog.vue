<template>
    <div class="select-warp dial-select" :class="{'select-open':show}">
        <p class="all" @click.stop="showSelect">
            <span>{{selected.name}}</span>
        </p>
        <div class="select-ul">
            <div class="scroll-warp scrollBar" style="overflow-y:auto">
                <ul>
                    <li v-for="(item,index) in list" @click.stop="change(index,item)">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import Vue from 'vue'
    import callResultConf from '../callResultConf'
    let list = Object.assign({},callResultConf)
    delete list[1]
    export default {
        data: function () {
            return {
                selected: {
                    id: '',
                    name: ''
                },
                show: false,
                list: list
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
            this.selected = {
                "id":2,
                "name":this.list[2]
            }
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