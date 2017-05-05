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
                <filterCate @toCart="addCate"></filterCate>
                <filterPrefer @toCart="addTunnel"></filterPrefer>
                <filterArea class="screening-show" @toCart="addCate"></filterArea>
                <div class="cart-warp">
                    <h3>人群购物车</h3>
                    <div class="screening-time">
                        <div class="select-warp ">
                            <!-- 在div上加上class（select-open）显示出ul列表 -->
                            <p class="all">
                                <span>最近7天</span>
                            </p>
                            <div class="select-ul">
                                <div class="scroll-warp scrollBar">
                                    <ul>
                                        <li>最近7天</li>
                                        <li>最近15天</li>
                                        <li>最近30天</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
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
                                        <i class="icon"></i>
                                    </p>
                                </li>
                                <li class="active" v-if="tunnel.length>0">
                                    <h4>筛选偏好</h4>
                                    <p v-for="(item,index) in tunnel">
                                        <span>{{item.name}}</span>
                                        <i class="icon"></i>
                                    </p>
                                </li>
                                <li class="active">
                                    <h4>筛选地域</h4>
                                    <p>
                                        <span>河北</span>
                                        <i class="icon"></i>
                                    </p>
                                    <p>
                                        <span>山东</span>
                                        <i class="icon"></i>
                                    </p>
                                    <p>
                                        <span>黑龙江</span>
                                        <i class="icon"></i>
                                    </p>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="select-number">
                        <em>已选客户</em>
                        <span>
                            <b>3,643,342</b>
                            <i></i>
                        </span>
                    </div>
                    <!--加载中span加上load-->
                    <div class="btn-screening btn-manual">
                        <span>没找到合适的? </span>
                        <a class="blue next" href="javascript:void(0);" onclick="getWindow('submitManua');">我们帮您选人</a>
                    </div>
                    <div class="btn-screening billing">
                        <a class="prev" href="javascript:void(0);" style="display: none">上一步</a>
                        <a href="javascript:void(0);" style="display: none">跳过</a>
                        <a class="blue" style="display: none" href="javascript:void(0);" onclick="getWindow('submitSave');">保存</a>
                        <!--disabled-->
                        <a class="blue next" href="javascript:void(0);">下一步</a>
                    </div>
                </div>
            </div>
        </div>
        <mfooter></mfooter>
        <toast></toast>
        <changeMyPass></changeMyPass>
        <callSet></callSet>
        <alert ref="alert"></alert>
        <balanceAlert></balanceAlert>
        <div id="shadowLayer" v-if="layer"></div>
    </div>
</template>
<script>
    import mheader from 'components/common/header.vue'
    import mfooter from 'components/common/footer.vue'
    import mnav from 'components/common/nav.vue'
    import toast from 'components/dialog/toast'
    import alert from 'components/dialog/alert'
    import confirm from 'components/dialog/confirm'
    import changeMyPass from 'components/dialog/changeMyPass'
    import balanceAlert from 'components/customer/dialog/balanceAlert'
    import callSet from 'components/dialog/callSet'
    import API from 'src/services/api'
    import { mAjax } from 'src/services/functions'
    import logo from 'assets/img/logo-screening.png'
    import filterCate from './filter_cate'
    import filterPrefer from './filter_prefer'
    import filterArea from './filter_area'

    export default {
        data() {
            return {
                logo: logo,
                cate: [],
                tunnel:[]
            }
        },
        computed: {
            layer() {
                return this.$store.state.showLayer
            }
        },
        methods: {
            addCate(arr) {
                this.cate = this.cate.concat(arr)     //TODO 去重
                arr.splice(0,arr.length)
            },
            addTunnel(arr) {
                this.tunnel = this.tunnel.concat(arr) //TODO 去重
                arr.splice(0,arr.length)
            }
        },
        components: {
            mheader,
            mfooter,
            mnav,
            toast,
            alert,
            changeMyPass,
            balanceAlert,
            callSet,
            filterCate,
            filterPrefer,
            filterArea
        }
    }

</script>