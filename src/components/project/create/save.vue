<template>
    <div class="dialog" :style="{'display':style,'margin-left':'-264px','margin-top':'-215px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>新建项目</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp dialog-client-add">
                <li>
                    <label>项目名称</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="name">
                        <p v-show="name_error" class="error">{{name_error}}</p>
                    </div>
                </li>
                <li>
                    <label>已选客户</label>
                    <div class="input-warp">
                        <p class="text">{{customers}}</p>
                    </div>
                </li>
                <li>
                    <label>预计线索量</label>
                    <div class="input-warp">
                        <input class="text" type="text" v-model="clue">
                        <p class="tips block">最多10万条，外呼时间为3天，打不完的线索不会计费</p>
                        <p v-show="clue_error" class="error">{{clue_error}}</p>
                    </div>
                </li>
                <li>
                    <label>预计开始时间</label>
                    <div class="input-warp date-warp">
                        <div class="calendar-warp">
                            <datepicker input-class="date" style="z-index:1" :disabled="datepicker_disabled" language="zh" format="yyyy.MM.dd" v-model="time"></datepicker>
                        </div>
                        <p class="tips">外呼时间为3天</p>
                        <p v-show="time_error" class="error">{{time_error}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="sure">确定</a>
            <a class="btn" href="javascript:void(0);" onclick="hideDialog('submitSave');">取消</a>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import datepicker from 'vuejs-datepicker'
    export default {
        props:['cate','tunnel','area','customers'],
        data() {
            return {
                style: 'none',
                name: '',
                clue:'',
                time:'',
                name_error:'',
                clue_error:'',
                time_error:'',
                datepicker_disabled: {
                    to: new Date()
                }
            }
        },
        computed:{
            date() {
                return this.$store.state.filter_date
            }
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure() {
                let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{4,20}$/
                let reg_Inter = /^[1-9][0-9]*$/
                if (!this.name) {
                    this.name_error = '请填写项目名称'
                    return false
                } else {
                    if (!reg.test(this.name)) {
                        this.name_error = '项目名称由文字和数字4-20位组成'
                        return false
                    } else {
                        this.name_error = ''
                    }
                }

                if (!this.clue) {
                    this.clue_error = '请填写预计线索量'
                    return false
                } else {
                    if (!reg_Inter.test(this.clue)) {
                        this.clue_error = '线索量需要是正整数'
                        return false
                    } else {
                        this.clue_error = ''
                    }
                }
                
                if (!this.time) {
                    this.time_error = '请选择预计开始时间'
                    return false
                } else {
                    this.time_error = ''
                }
                
                let product = []
                this.cate.forEach(el =>{
                    product.push(el.code)
                })
                let data = {
                    product:product,
                    date:this.date,
                    name:this.name,
                    customer_total:this.customers,
                    expect_clue_num:this.clue,
                    expect_begin_time:this.time
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
                    url: API.filter_save,
                    data: data,
                    success: data => {
                        this.close()
                        this.$store.commit('SHOW_TOAST', '项目新建成功')
                    },
                    error: err => {
                        console.log(err)
                    }
                })
            }
        },
        created() {
            let _this = this
            this.$on('show', function () {
                _this.style = 'block'
                _this.name = ''
                _this.clue = ''
                _this.name_error = ''
                _this.clue_error = ''
                _this.time_error = ''
                _this.$store.commit('SHOW_LAYER')
            })
        },
        components:{
            datepicker
        }
    }
</script>