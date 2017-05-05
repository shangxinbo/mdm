<template>
    <div class="screening">
        <h2>筛选分类</h2>
        <div class="screening-left">
            <div class="scroll-warp" style="overflow-y:auto">
                <ul class="scroll-content screening-one">
                    <li v-for="(item,index) in tag1" :class="{active:item.code==selected}">
                        <div class="sort-first" @click="getLeaf(item.code)">
                            <i class="icon" :class="'icon'+ item.code"></i>
                            <span :title="item.name">{{item.name}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="screening-right">
            <div class="scroll-warp" style="overflow-y:auto">
                <ul class="scroll-content screening-item">
                    <li v-for="(item,index) in tag2" :class="{checked:locInCart(item)>=0}">
                        <p class="text" @click="toggleChecked(item)">
                            <i class="icon"></i>
                            <span :title="item.name">{{item.name}}</span>
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
                <p class="text" :class="{checked:allStatus}" @click="checkAll">
                    <i class="icon"></i>
                    <span>全选</span>
                </p>
            </div>
            <div class="btn-screening billing">
                <a class="blue" href="javascript:void(0);" @click="toCart">加入购物车</a>
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
            allStatus() {
                let status = true
                let _this = this
                if (this.tag2.length > 0) {
                    this.tag2.forEach(el => {
                        if (_this.locInCart(el) < 0) status = false
                    })
                    return status
                } else {
                    return false
                }
            }
        },
        methods: {
            getLeaf(code) {
                mAjax(this, {
                    url: API.filter_product_2,
                    data: {
                        code: code
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.selected = code
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
                            this.tag2 = tags
                        } else {
                            this.tag2 = []
                        }
                    },
                    error: err => {
                        this.tag2 = []
                    }
                })
            },
            locInCart(item) {
                return this.cart.findIndex((val, index, arr) => {
                    if (item) {
                        return val.code == item.code
                    } else {
                        return false
                    }
                })
            },
            toggleChecked(item) {
                let loc = this.locInCart(item)
                if (loc < 0) {
                    this.cart.push(item)
                } else {
                    this.cart.splice(loc, 1)
                }
            },
            checkAll() {
                let _this = this
                if (this.allStatus && this.tag2.length > 0) {
                    this.tag2.forEach(el => {
                        _this.cart.splice(_this.locInCart(el), 1)
                    })
                } else {
                    this.tag2.forEach(el => {
                        if (_this.locInCart(el) < 0) {
                            _this.cart.push(el)
                        }
                    })
                }
            },
            toCart() {
                if (this.cart.length > 0) {
                    this.$emit('toCart', this.cart)
                }
            }
        }
    }

</script>