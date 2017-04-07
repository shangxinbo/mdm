<template>
    <div class="input-warp">
        <div class="select-warp" :class="{'select-open':show}">
            <p class="all" @click.stop="showSelect">
                <span>{{selected.name}}</span>
            </p>
            <div class="select-ul">
                <div class="scroll-warp scrollBar" style="overflow-y:auto">
                    <ul>
                        <li @click.stop="change('','全部')">全部</li>
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
        props: ['api', 'id', 'initlist'],
        watch: {
            id: function (newVal, oldVal) {
                if (!newVal) {
                    this.selected = {
                        id: '',
                        name: '全部'
                    }
                }
            }
        },
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
            let id = this.id
            console.log(id)
            let _this = this
            if (this.initlist) {
                this.list = this.initlist
                if (id) {
                    for (let i in _this.list) {
                        _this.selected = {
                            id: i,
                            name: _this.list[i]
                        }
                    }
                }
            } else {
                mAjax(this, {
                    url: this.api,
                    success: data => {
                        this.list = data.data
                        if (id) {
                            if (this.list instanceof Array) {
                                this.list.find((value, index, arr) => {
                                    if (value.code == id) {
                                        _this.selected = {
                                            id: value.code,
                                            name: value.desc
                                        }
                                    }
                                })
                            } else {
                                for (let i in _this.list) {
                                    if (i == id) {
                                        _this.selected = {
                                            id: i,
                                            name: _this.list[i]
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
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