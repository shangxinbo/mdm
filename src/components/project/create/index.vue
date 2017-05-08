<style lang="less">
    @import '../../../assets/less/screening.less';
</style>
<template>
    <div>
        <mheader class="header-screening">
            <h1>
                <router-link to="/" title="geo易获客" class="logo">
                    <img :src="logo" alt="geo易获客" />
                </router-link>
            </h1>
        </mheader>
        <div class="warp warp-screening">
            <div class="main">
                <filterCate @toCart="addCate" :class="{'screening-show':step==1}"></filterCate>
                <filterPrefer @toCart="addTunnel" :cate="cate" :class="{'screening-show':step==2}"></filterPrefer>
                <filterArea @toCart="addArea" :cate="cate" :tunnel="tunnel" :step="step" :class="{'screening-show':step==3}"></filterArea>
                <div class="cart-warp">
                    <h3>人群购物车</h3>
                    <div class="screening-time">
                        <mselect ref="dateSelect" :initlist="select.init" hideAll="true" :id="7" @change="dateChange"></mselect>
                    </div>
                    <div class="scroll-warp">
                        <div class="scroll-content">
                            <ul class="select-center">
                                <li class="active" v-if="cate.length>0">
                                    <h4>筛选分类
                                        <em>(必选)</em>
                                    </h4>
                                    <p v-for="(item,index) in cate">
                                        <span>{{item.name}}</span>
                                        <i v-if="step==1" class="icon" @click="delCateTag(item.code)"></i>
                                    </p>
                                </li>
                                <li class="active" v-if="tunnel.length>0">
                                    <h4>筛选偏好</h4>
                                    <p v-for="(item,index) in tunnel">
                                        <span>{{item.name}}</span>
                                        <i v-if="step==2" class="icon" @click="delTunnelTag(item.code)"></i>
                                    </p>
                                </li>
                                <li class="active" v-if="area.length>0">
                                    <h4>筛选地域</h4>
                                    <p v-for="(item,index) in area">
                                        <span>{{item.name}}</span>
                                        <i v-if="step==3" class="icon" @click="delAreaTag(item.code)"></i>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="select-number">
                        <em>已选客户</em>
                        <span :class="{load:loading}">
                            <b>{{customers|formatBigNumer}}</b>
                            <i></i>
                        </span>
                    </div>
                    <div class="btn-screening btn-manual">
                        <span>没找到合适的? </span>
                        <a class="blue next" href="javascript:void(0);" @click="optionProject">我们帮您选人</a>
                    </div>
                    <div class="btn-screening billing">
                        <a v-show="step>1" class="prev" @click="preStep" href="javascript:void(0);">上一步</a>
                        <a v-show="step>=3" class="blue" href="javascript:void(0);" @click="save">保存</a>
                        <a v-show="step<3" class="blue next" :class="{disabled:cate.length<=0}" @click="nextStep" href="javascript:void(0);">下一步</a>
                    </div>
                </div>
            </div>
        </div>
        <mfooter class="footer-screening"></mfooter>
        <toast></toast>
        <changeMyPass></changeMyPass>
        <callSet></callSet>
        <alert ref="alert"></alert>
        <balanceAlert></balanceAlert>
        <saveDialog ref="save" :cate="cate" :tunnel="tunnel" :area="area" :customers="customers"></saveDialog>
        <saveByOptional ref="optSaveDialog"></saveByOptional>
        <div id="shadowLayer" v-if="layer"></div>
    </div>
</template>
<script>
    import mheader from 'components/common/header.vue'
    import mfooter from 'components/common/footer.vue'
    import toast from 'components/dialog/toast'
    import alert from 'components/dialog/alert'
    import confirm from 'components/dialog/confirm'
    import changeMyPass from 'components/dialog/changeMyPass'
    import balanceAlert from 'components/customer/dialog/balanceAlert'
    import callSet from 'components/dialog/callSet'
    import API from 'src/services/api'
    import { mAjax, numberFormatter } from 'src/services/functions'
    import logo from 'assets/img/logo-screening.png'
    import filterCate from './filter_cate'
    import filterPrefer from './filter_prefer'
    import filterArea from './filter_area'
    import mselect from 'components/utils/select'
    import saveDialog from './save'
    import saveByOptional from './save_optional'

    export default {
        data() {
            return {
                logo: logo,
                cate: [],
                tunnel: [],
                area: [],
                step: 1,
                customers: 0,
                select: {
                    id: 7,
                    init: [
                        {
                            id: 7,
                            name: '最近7天'
                        },
                        {
                            id: 15,
                            name: '最近15天'
                        },
                        {
                            id: 30,
                            name: '最近30天'
                        }
                    ]
                },
                loading: false,
                lastGetCusTime: null
            }
        },
        computed: {
            layer() {
                return this.$store.state.showLayer
            },
            date() {
                return this.$store.state.filter_date
            }
        },
        filters: {
            formatBigNumer(val) {
                return numberFormatter(val)
            }
        },
        methods: {
            addCate(arr) {
                arr.forEach(el => {
                    let elin = false
                    this.cate.forEach(item => {
                        if (item.code == el.code)
                            elin = true
                    })
                    if (!elin) {
                        this.cate.push(el)
                    }
                })

                arr.splice(0, arr.length)
                this.getCustomers()
            },
            addTunnel(arr) {
                arr.forEach(el => {
                    let elin = false
                    this.tunnel.forEach(item => {
                        if (item.code == el.code)
                            elin = true
                    })
                    if (!elin) {
                        this.tunnel.push(el)
                    }
                })

                arr.splice(0, arr.length)
                this.getCustomers()
            },
            addArea(arr) {
                arr.forEach(el => {
                    let elin = false
                    this.area.forEach(item => {
                        if (item.code == el.code)
                            elin = true
                    })
                    if (!elin) {
                        this.area.push(el)
                    }
                })
                arr.splice(0, arr.length)
                this.getCustomers()
            },
            nextStep() {
                this.step = this.step + 1
            },
            preStep() {
                this.step = this.step - 1
                switch (this.step) {
                    case 1:
                        this.tunnel = []
                        this.area = []
                        break
                    case 2:
                        this.area = []
                        break
                    default:
                        this.cate = []
                        this.tunnel = []
                        this.area = []
                }
                this.getCustomers()
            },
            delCateTag(code) {
                if (this.cate.length > 1) {
                    let l = this.cate.findIndex((val, index, arr) => {
                        return val.code == code
                    })
                    if (l >= 0) this.cate.splice(l, 1)
                    this.getCustomers()
                } else {
                    this.$refs.alert.$emit('show', '请筛选至少一个分类')
                }

            },
            delTunnelTag(code) {
                let l = this.tunnel.findIndex((val, index, arr) => {
                    return val.code == code
                })
                if (l >= 0) this.tunnel.splice(l, 1)
                this.getCustomers()
            },
            delAreaTag(code) {
                let l = this.area.findIndex((val, index, arr) => {
                    return val.code == code
                })
                if (l >= 0) this.area.splice(l, 1)
                this.getCustomers()
            },
            getCustomers() {
                if (this.cate.length > 0) {
                    let loadingTime = new Date().getTime()
                    this.lastGetCusTime = loadingTime
                    this.loading = true
                    
                    let product = []
                    this.cate.forEach(el =>{
                        product.push(el.code)
                    })
                    let data = {
                        date: this.date,
                        product: product
                    }
                    if(this.tunnel.length>0){
                        let preference = []
                        this.tunnel.forEach(el =>{
                            preference.push(el.code)
                        })
                        data.preference = preference
                    }
                    if(this.area.length>0){
                        let area = []
                        this.area.forEach(el =>{
                            area.push(el.code)
                        })
                        data.area = area
                    }

                    mAjax(this, {
                        url: API.filter_customers,
                        data: data,
                        success: data => {
                            if (this.lastGetCusTime == loadingTime) {
                                this.loading = false
                            }
                            if (data.code == 200) {
                                this.customers = data.data
                            } else {
                                this.customers = '获取失败'
                            }
                        }
                    })
                }
            },
            dateChange(val) {
                this.$store.commit('SET_FILTER_DATE', val.id)
                this.getCustomers()
            },
            save() {
                this.$refs.save.$emit('show')
            },
            optionProject() {
                this.$refs.optSaveDialog.$emit('show')
            }
        },
        beforeRouteEnter(to, from, next) {
            document.getElementsByTagName('body')[0].className = 'screening-body'
            next()
        },
        beforeRouteLeave(to, from, next) {
            document.getElementsByTagName('body')[0].className = ''
            next()
        },
        components: {
            mheader,
            mfooter,
            toast,
            alert,
            changeMyPass,
            balanceAlert,
            callSet,
            filterCate,
            filterPrefer,
            filterArea,
            mselect,
            saveDialog,
            saveByOptional
        }
    }

</script>