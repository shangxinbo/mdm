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
                            <datepicker addClass="date" style="z-index:1" :weeks="weeks" :months="months" :buttons="buttons" :min="minTime" @change="setEndTime"></datepicker>
                        </div>
                        <p class="tips">外呼时间为3天</p>
                        <p v-show="time_error" class="error">{{time_error}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="sure">确定</a>
            <a class="btn" href="javascript:void(0);" @click="close">取消</a>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import datepicker from 'components/utils/datepicker'
    import moment from 'moment'
    export default {
        props:['cate','tunnel','area','customers'],
        data() {
            let now = moment().format('YYYY-MM-DD')
            return {
                style: 'none',
                name: '',
                clue:'',
                time:'',
                name_error:'',
                clue_error:'',
                time_error:'',
                weeks: ['一', '二', '三', '四', '五', '六', '日'],
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                buttons: {
                    ok: '确认',
                    cancel: '取消'
                },
                minTime: now,
                ajax:false
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
            setEndTime(val){
                this.time = val
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
                        if (this.clue > 100000) {
                            this.clue_error = '线索量不能超过10万'
                            return false
                        } else {
                            this.clue_error = ''
                        }
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
                if(this.ajax) return false
                this.ajax = true
                this.$ajax({
                    url: API.filter_save,
                    data: data,
                    success: data => {
                        this.ajax = false
                        if(data.code==200){
                            this.close()
                            this.ajax = false
                            this.$emit('success')
                        }else{
                            this.time_error = data.message
                        }
                        
                    }
                })
            }
        },
        created() {
            this.$on('show', function () {
                this.style = 'block'
                this.name = ''
                this.clue = ''
                this.name_error = ''
                this.clue_error = ''
                this.time_error = ''
                this.$store.commit('SHOW_LAYER')
            })
        },
        components:{
            datepicker
        }
    }
</script>