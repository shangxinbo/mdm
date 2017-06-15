<template>
    <div class="screening">
        <h2>筛选地域</h2>
        <div class="screening-right screening-right-all">
            <div class="scroll-warp" style="overflow-y:auto">
                <ul class="scroll-content screening-item">
                    <li v-for="(item,index) in tag" :class="{checked:inCart(item)>=0}">
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
        props: ['cate', 'tunnel', 'step'],
        data() {
            return {
                tag: [],
                cart: []
            }
        },
        watch: {
            step(newVal, oldVal) {
                if (newVal == 3) {
                    this.init()
                }
            },
            date(){
                this.init()
            }
        },
        computed: {
            allStatus() {
                let status = true
                let _this = this
                if (this.tag.length > 0) {
                    this.tag.forEach(el => {
                        if (_this.locInCart(el) < 0) status = false
                    })
                    return status
                } else {
                    return false
                }
            },
            date() {
                return this.$store.state.filter_date
            }
        },
        methods: {
            init() {
                if (this.cate.length > 0) {
                    let product = []
                    this.cate.forEach(el => {
                        product.push(el.code)
                    })
                    let data = {
                        product: product,
                        date: this.date
                    }
                    if (this.tunnel.length > 0) {
                        let preference = []
                        this.tunnel.forEach(el => {
                            preference.push(el.code)
                        })
                        data.preference = preference
                    }
                    mAjax(this, {
                        url: API.filter_area,
                        data: data,
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
                                this.tag = tags.sort((a, b) => {
                                    return b.num - a.num
                                })
                            } else {
                                this.tag = []
                            }
                        },
                        error: err => {
                            this.tag = []
                        }
                    })
                }
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
            inCart(item) {
                return this.cart.findIndex((val, index, arr) => {
                    return val.code == item.code
                })
            },
            checkAll() {
                let _this = this
                if (this.allStatus && this.tag.length > 0) {
                    this.tag.forEach(el => {
                        _this.cart.splice(_this.locInCart(el), 1)
                    })
                } else {
                    this.tag.forEach(el => {
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