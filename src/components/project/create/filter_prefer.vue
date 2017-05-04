<template>
    <div class="screening">
        <h2>筛选偏好</h2>
        <div class="screening-left">
            <div class="scroll-warp">
                <ul class="scroll-content screening-one">
                    <li class="active">
                        <div class="sort-first">
                            <i class="icon icon106013"></i>
                            <span>购物</span>
                        </div>
                        <ul class="screening-sub">
                            <li class="checked">
                                <div class="checkbox-warp">
                                    <i class="icon"></i>
                                    <span>外卖团购</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkbox-warp">
                                    <i class="icon"></i>
                                    <span>综合商城</span>
                                </div>
                            </li>
                            <li>
                                <div class="checkbox-warp">
                                    <i class="icon"></i>
                                    <span>母婴用品</span>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="sort-first">
                            <i class="icon icon102002"></i>
                            <span>金融</span>
                        </div>
                    </li>
                    <li>
                        <div class="sort-first">
                            <i class="icon icon104002"></i>
                            <span>房产</span>
                        </div>
                    </li>
                    <li>
                        <div class="sort-first">
                            <i class="icon icon104009"></i>
                            <span>教育培训</span>
                        </div>
                    </li>
                    <li>
                        <div class="sort-first">
                            <i class="icon icon104003"></i>
                            <span>汽车</span>
                        </div>
                    </li>
                    <li>
                        <div class="sort-first">
                            <i class="icon icon104013"></i>
                            <span>家装</span>
                        </div>
                    </li>
                    <li>
                        <div class="sort-first">
                            <i class="icon icon104004"></i>
                            <span>商旅</span>
                        </div>
                    </li>
                    <li>
                        <div class="sort-first">
                            <i class="icon icon103002"></i>
                            <span>生活服务</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="screening-right">
            <div class="scroll-warp">
                <ul class="scroll-content screening-item">
                    <li class="checked">
                        <p class="text">
                            <i class="icon"></i>
                            <span>美团外卖</span>
                        </p>
                        <p class="piece">
                            <em style="width: 100%;">
                                <span>1473人</span>
                            </em>
                        </p>
                    </li>
                    <li class="checked">
                        <p class="text">
                            <i class="icon"></i>
                            <span>百度外卖</span>
                        </p>
                        <p class="piece">
                            <em style="width: 59.4%;">
                                <span>875人</span>
                            </em>
                        </p>
                    </li>
                    <li>
                        <p class="text">
                            <i class="icon"></i>
                            <span>饿了么</span>
                        </p>
                        <p class="piece">
                            <em style="width: 23.2%;">
                                <span>342人</span>
                            </em>
                        </p>
                    </li>
                    <li>
                        <p class="text">
                            <i class="icon"></i>
                            <span>口碑外卖</span>
                        </p>
                        <p class="piece">
                            <em style="width: 6.7%;">
                                <span>98人</span>
                            </em>
                        </p>
                    </li>

                </ul>
            </div>
            <div class="all-button">
                <p class="text">
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
                    this.tag2.forEach(el => {
                        let loc = _this.cart_pre.findIndex((val, index, arr) => {
                            return val.code == el.code
                        })
                        _this.cart_pre.splice(loc, 1)
                    })
                } else {
                    this.tag2.forEach(el => {
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