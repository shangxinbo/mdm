<template>
    <div class="screening">
        <h2>筛选渠道</h2>
        <div class="screening-left">
            <div class="scroll-warp" style="overflow-y:auto">
                <ul class="scroll-content screening-one">
                    <li v-for="(item,index) in tag1" :class="{active:selected1&&item.code==selected1.code}">
                        <div class="sort-first" @click="selectT1(item)">
                            <i class="icon" :class="'icon' + item.code"></i>
                            <span>{{item.name}}</span>
                        </div>
                        <ul v-if="item.list.length>0" class="screening-sub">
                            <li v-for="(val,key) in item.list" :class="{checked:inCart(val)>=0,active:selected2&&val.code==selected2.code}">
                                <div class="checkbox-warp" @click="showChild(val)">
                                    <i class="icon" @click.stop="toggleChecked(val)"></i>
                                    <span>{{val.name}}</span>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="screening-right">
            <div class="scroll-warp" style="overflow-y:auto">
                <ul class="scroll-content screening-item">
                    <li v-for="(item,index) in tag2" :class="{checked:inCart(item)>=0}">
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
                tag3: [],
                selected1: null,
                selected2: null,
                cart_pre: [],
            }
        },
        created() {
            mAjax(this, {
                url: API.filter_prefer_1,
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
                    let floc = _this.cart_pre.findIndex((val, index, arr) => {
                        return val.code == this.selected2.code
                    })
                    if (floc < 0) {
                        this.tag2.forEach(el => {
                            let loc = _this.cart_pre.findIndex((val, index, arr) => {
                                return val.code == el.code
                            })
                            if (loc < 0) status = false
                        })
                        return status
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            }
        },
        methods: {
            selectT1(code) {
                this.selected1 = code
            },
            showChild(item) {
                this.selected2 = item
                mAjax(this, {
                    url: API.filter_prefer_2,
                    data: {
                        product: [20200100100, 20200100200],
                        code: [item.code],
                        date: 7
                    },
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
                let re = this.cart_pre.findIndex((val, index, arr) => {
                    return val.code == this.selected2.code
                })
                
                if (loc < 0) {
                    this.cart_pre.push(item)
                } else {
                    if(re>=0){
                        this.cart_pre.splice(re, 1)
                    }
                    this.cart_pre.splice(loc, 1)
                }
            },
            inCart(item) {
                return this.cart_pre.findIndex((val, index, arr) => {
                    return item.code.toString().indexOf(val.code) == 0
                })
            },
            checkAll() {
                let _this = this
                if (this.allChecked && this.tag2.length > 0) {

                    let re = _this.cart_pre.findIndex((val, index, arr) => {
                        return val.code == this.selected2.code
                    })
                    if (re >= 0) _this.cart_pre.splice(re, 1)

                    this.tag2.forEach(el => {
                        let loc = _this.cart_pre.findIndex((val, index, arr) => {
                            return val.code == el.code
                        })
                        _this.cart_pre.splice(loc, 1)
                    })
                } else {

                    let re = _this.cart_pre.findIndex((val, index, arr) => {
                        return val.code == this.selected2.code
                    })
                    if (re < 0) _this.cart_pre.push(this.selected2)

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