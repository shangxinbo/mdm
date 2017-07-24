<template>
    <div class="input-warp">
        <div class="select-warp" :class="[{'select-open':show}, addClass]">
            <p class="all" @click.stop="showSelect">
                <span>{{selected.name}}</span>
            </p>
            <div class="select-ul">
                <div class="scroll-warp scrollBar" style="overflow-y:auto">
                    <ul>
                        <li @click.stop="change()" v-if="!hideAll">全部</li>
                        <li v-for="(item,index) in list" @click.stop="change(item)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <p v-if="error" class="error">{{error}}</p>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                selected: { id: '', name: '' },
                list: [],     //item {id,name}
                show: false
            }
        },
        props: ['api', 'param', 'id', 'name', 'initlist', 'error', 'addClass', 'hideAll', 'disabled'],
        watch: {
            id(newVal, oldVal) {
                this.choose(newVal)
            },
            name(newVal, oldVal) {
                this.choose('', newVal)
            }
        },
        created() {
            this.init()
        },
        mounted() {
            let _this = this
            Vue.nextTick(() => {
                document.addEventListener('click', () => {
                    _this.show = false
                })
            })
        },
        methods: {
            showSelect() {
                if (this.disabled) return false
                if (this.show) {
                    this.show = false
                } else {
                    this.show = true
                }
            },
            change(obj) {
                console.log(obj)
                if (obj) {
                    this.selected = obj
                } else {
                    this.selected = {
                        id: '',
                        name: '全部'
                    }
                }
                this.$emit('change', this.selected)
                this.show = false
            },
            choose(id, name) {
                let finded = false
                this.list.find((value, index) => {
                    if (id === value.id) {
                        this.selected = value
                        finded = true
                    }
                    if (name === value.name) {
                        this.selected = value
                        finded = true
                    }
                })

                if (!finded) {
                    if (this.hideAll) {
                        this.selected = this.list.length > 0 ? this.list[0] : { id: '', name: '' }
                    } else {
                        this.selected = {
                            id: '',
                            name: '全部'
                        }
                    }
                }
            },
            init(callback) {
                if (this.initlist) {

                    this.list = this.initlist  //保证initlist 是合规的

                    this.choose(this.id, this.name)

                    if (callback) callback()

                } else if (this.api) {

                    let obj = this.param ? this.param : {}

                    this.$ajax({
                        url: this.api,
                        data: obj,
                        success: data => {
                            let arr = []
                            let list = data.data
                            if (list instanceof Array) {
                                list.forEach((item, index) => {
                                    arr.push({
                                        id: (item.id == undefined) ? ((item.code == undefined) ? index + 1 : item.code) : item.id,
                                        name: item.name || item.desc || item.user || item
                                    })
                                })
                            } else {
                                for (let i in list) {
                                    arr.push({
                                        id: i,
                                        name: list[i]
                                    })
                                }
                            }
                            arr.sort((p, n) => {
                                return parseInt(n.id) - parseInt(p.id)
                            })

                            this.list = arr
                            this.choose(this.id, this.name)
                            if (callback) callback()
                        }
                    })
                }
            }
        }
    }

</script>