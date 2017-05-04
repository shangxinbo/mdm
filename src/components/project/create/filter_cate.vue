<template>
    <div class="screening screening-show">
        <h2>筛选分类</h2>
        <div class="screening-left">
            <div class="scroll-warp" style="overflow-y:auto">
                <ul class="scroll-content screening-one">
                    <li v-for="(item,index) in tag1" :class="{active:item.code==selected}">
                        <div class="sort-first" @click="selectCate(item.code)">
                            <i class="icon" :class="'icon'+ item.code"></i>
                            <span>{{item.name}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="screening-right">
            <div class="scroll-warp" style="overflow-y:auto">
                <ul class="scroll-content screening-item">
                    <li v-for="(item,index) in tag2" :class="{checked:cart_pre.indexOf(item.code)>=0}">
                        <p class="text" @click="toggleChecked(item.code)">
                            <i class="icon"></i>
                            <span>{{item.name}}</span>
                        </p>
                        <p class="piece">
                            <em :style="{width: item.percent}">
                                <span>{{item.num}}人</span>
                            </em>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="all-button">
                <p class="text" :class="{checked:allChecked}" @click="checkAll">
                    <i class="icon"></i>
                    <span>全选</span>
                </p>
            </div>
            <div class="btn-screening billing">
                <a class="blue" href="javascript:void(0);">加入购物车</a>
            </div>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import { mAjax } from 'src/services/functions'
    export default {
        data() {
            return {
                tag1: [],
                tag2: [],
                selected: null,
                cart_pre: [],
                cart: [],
            }
        },
        created() {
            mAjax(this, {
                url: API.filter_product_1,
                success: data => {
                    if (data.code == 200) {
                        this.tag1 = data.data
                    } else {
                        this.tag1 = []
                    }
                },
                error: err => {
                    this.tag1 = []
                }
            })
        },
        computed: {
            allChecked() {
                let status = true
                let _this = this
                if (this.tag2.length > 0) {
                    this.tag2.forEach(el => {
                        if (_this.cart_pre.indexOf(el.code) < 0) {
                            status = false
                        }
                    })
                    return status
                } else {
                    return false
                }
            }
        },
        methods: {
            selectCate(code) {
                this.selected = code
                mAjax(this, {
                    url: API.filter_product_2,
                    success: data => {
                        if (data.code == 200) {
                            let tags = data.data
                            let max = 0
                            tags.forEach(item => {
                                if (item.num > max) {
                                    max = item.num
                                }
                            })
                            tags.forEach(item => {
                                item.percent = item.num * 100 / max + '%'
                            })
                            this.tag2 = data.data
                        } else {
                            this.tag2 = []
                        }
                    },
                    error: err => {
                        this.tag2 = []
                    }
                })
            },
            toggleChecked(code) {
                if (this.cart_pre.indexOf(code) < 0) {
                    this.cart_pre.push(code)
                } else {
                    let loc = this.cart_pre.indexOf(code)
                    this.cart_pre.splice(loc, 1)
                }
            },
            checkAll() {
                let _this = this
                if (this.allChecked) {
                    this.tag2.forEach(el => {
                        let loc = _this.cart_pre.indexOf(el.code)
                        _this.cart_pre.splice(loc, 1)
                    })
                } else {
                    this.tag2.forEach(el => {
                        if (_this.cart_pre.indexOf(el.code) < 0) {
                            _this.cart_pre.push(el.code)
                        }
                    })
                }

            }
        }
    }

</script>