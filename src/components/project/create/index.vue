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
                <filterCate class="screening-show" @toCart="addCate"></filterCate>
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
                <div class="screening">
                    <h2>筛选地域</h2>
                    <div class="screening-right screening-right-all">
                        <div class="scroll-warp">
                            <ul class="scroll-content screening-item">
                                <li class="checked">
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>河北</span>
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
                                        <span>山东</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 82.1%;">
                                            <span>1209人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>辽宁</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 74%;">
                                            <span>1090人</span>
                                        </em>
                                    </p>
                                </li>
                                <li class="checked">
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>黑龙江</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 66.5%;">
                                            <span>980人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>吉林</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 61%;">
                                            <span>898人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>甘肃</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 41.1%;">
                                            <span>606人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>青海</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 20.4%;">
                                            <span>300人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>河南</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 14.2%;">
                                            <span>209人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>江苏</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 6.7%;">
                                            <span>98人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>湖北</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>湖南</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>江西</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>浙江</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>广东</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>云南</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>福建</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>海南</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>山西</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>四川</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>陕西</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>贵州</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>安徽</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>重庆</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>北京</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>上海</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>天津</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>广西</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>内蒙古</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>西藏</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>新疆</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p class="text">
                                        <i class="icon"></i>
                                        <span>宁夏</span>
                                    </p>
                                    <p class="piece">
                                        <em style="width: 2%;">
                                            <span>30人</span>
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
                                <li class="active">
                                    <h4>筛选偏好</h4>
                                    <p>
                                        <span>美团外卖</span>
                                        <i class="icon"></i>
                                    </p>
                                    <p>
                                        <span>百度外卖</span>
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

    export default {
        data() {
            return {
                logo:logo,
                cate:[]
            }
        },
        computed: {
            layer() {
                return this.$store.state.showLayer
            }
        },
        methods:{
            addCate(arr){
                this.cate = arr
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
            filterCate
        }
    }

</script>