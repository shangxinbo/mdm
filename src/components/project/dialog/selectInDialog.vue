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
    import Vue from 'vue'
    import callResultConf from '../call/callResultConf'
    let list = Object.assign({}, callResultConf)
    delete list[1]
    export default {
        data() {
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
            showSelect() {
                this.show = true
            },
            change(id, name) {
                this.selected = {
                    id: id,
                    name: name
                }
                this.show = false
            }
        },
        created() {
            this.selected = {
                "id": 2,
                "name": this.list[2]
            }
        },
        mounted() {
            let _this = this
            Vue.nextTick(() => {
                document.addEventListener('click', () => {
                    _this.show = false
                })
            })
        }
    }

</script>