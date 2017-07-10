<template>
    <div class="input-warp">
        <div class="select-warp" :class="[{'select-open':show}, addClass]">
            <p class="all" @click.stop="showSelect">
                <span>{{selected.name}}</span>
            </p>
            <div class="select-ul">
                <div class="scroll-warp scrollBar" style="overflow-y:auto">
                    <ul>
                        <li @click.stop="change('','全部')" v-if="!hideAll">全部</li>
                        <li v-for="(item,index) in list" @click.stop="change(item.id,item.name)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <p v-if="error" class="error">{{error}}</p>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import Vue from 'vue'
    export default {
        data() {
            return {
                selected: {
                    id: '',
                    name: '全部'
                },
                list: [],
                show: false
            }
        },
        props: ['api', 'param', 'id', 'initlist', 'error', 'addClass', 'hideAll'],
        watch: {
            id: function (newVal, oldVal) {
                if (newVal === '') {
                    this.selected = {
                        id: '',
                        name: '全部'
                    }
                } else {
                    this.list.find((value, index, arr) => {
                        if (value.id == newVal) {
                            this.selected = value
                        }
                    })
                }
            }
        },
        methods: {
            showSelect: function () {
                this.show = true
            },
            change: function (id, name) {
                if(id==this.selected.id){
                    return false
                }
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
                this.$emit('change', this.selected)
                this.show = false
            },
            init() {
                let _this = this
                if (this.initlist) {
                    this.list = this.initlist
                    let id = this.id
                    if (!id) return false
                    this.list.find((value, index, arr) => {
                        if (isNaN(id)) {
                            if (value.name == id) {
                                this.selected = value
                            }
                        } else {
                            if (value.id == id) {
                                this.selected = value
                            }
                        }
                    })
                } else {
                    mAjax(this, {
                        url: this.api,
                        data:this.param,
                        success: data => {
                            let arr = []
                            if (data.data instanceof Array) {
                                for (let i = 0; i < data.data.length; i++) {
                                    if (data.data[i].id != undefined) {
                                        arr.push({
                                            id: data.data[i].id,
                                            name: data.data[i].name ? data.data[i].name : data.data[i].user
                                        })
                                    } else if (data.data[i].code != undefined) {
                                        arr.push({
                                            id: data.data[i].code,
                                            name: data.data[i].desc
                                        })
                                    } else {
                                        arr.push({
                                            id: i,
                                            name: data.data[i]
                                        })
                                    }

                                }
                            } else {
                                for (let i in data.data) {
                                    arr.push({
                                        id: i,
                                        name: data.data[i]
                                    })
                                }
                            }
                            arr.sort((p, n) => {
                                return parseInt(n.id) - parseInt(p.id)
                            })

                            this.list = arr
                            let id = this.id
                            if (!id) return false
                            this.list.find((value, index, arr) => {
                                if (isNaN(id)) {
                                    if (value.name == id) {
                                        this.selected = value
                                    }
                                } else {
                                    if (value.id == id) {
                                        this.selected = value
                                    }
                                }

                            })
                        }
                    })
                }
            }
        },
        created() {
            this.init()
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