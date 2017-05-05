<template>
    <div class="screening">
        <h2>筛选地域</h2>
        <div class="screening-right screening-right-all">
            <div class="scroll-warp" style="overflow-y:auto">
                <ul class="scroll-content screening-item">
                    <li v-for="(item,index) in tag" :class="{checked:inCart(item)>=0}">
                        <p class="text" @click="toggleChecked(item)">
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
                tag: [],
                cart_pre: [],
                cart: [],
            }
        },
        created() {
            mAjax(this, {
                url: API.filter_area,
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
        },
        computed: {
            allChecked() {
                let status = true
                let _this = this
                if (this.tag.length > 0) {
                    this.tag.forEach(el => {
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
            toggleChecked(item) {
                let loc = this.cart_pre.findIndex((val, index, arr) => {
                    return val.code == item.code
                })
                if (loc < 0) {
                    this.cart_pre.push(item)
                } else {
                    this.cart_pre.splice(loc, 1)
                }
            },
            inCart(item) {
                return this.cart_pre.findIndex((val, index, arr) => {
                    return val.code == item.code
                })
            },
            checkAll() {
                let _this = this
                if (this.allChecked) {
                    this.tag.forEach(el => {
                        let loc = _this.cart_pre.findIndex((val, index, arr) => {
                            return val.code == el.code
                        })
                        _this.cart_pre.splice(loc, 1)
                    })
                } else {
                    this.tag.forEach(el => {
                        let loc = _this.cart_pre.findIndex((val, index, arr) => {
                            return val.code == el.code
                        })
                        if (loc < 0) {
                            _this.cart_pre.push(el)
                        }
                    })
                }
            },
            toCart() {
                if (this.cart_pre.length > 0) {
                    this.$emit('toCart', this.cart_pre)
                }
            }
        }
    }

</script>