<template>
    <div class="dialog" :style="{display:style,'margin-left':'-372px','margin-top':offsetTop}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>激活坐席</h4>
        </div>
        <div class="dialog-body">
            <div class="dialog-activate">
                <div class="title">{{company}}失效坐席</div>
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <th class="w50"></th>
                            <th>坐席账号</th>
                            <th class="w160">开通日期</th>
                            <th class="w160">失效日期</th>
                        </tr>
                    </table>
                </div>
                <div class="scroll-warp scrollBar w640" style="overflow-y:auto">
                    <div class="data-table check-warp">
                        <table cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr v-for="(item,index) in list" :class="{tr2:index%2,checked:item.checked}">
                                    <td class="w50">
                                        <i class="icon" @click="checkThis(item)"></i>
                                    </td>
                                    <td>{{item.user}}</td>
                                    <td class="w160">{{item.created_at}}</td>
                                    <td class="w160">{{item.expire_time}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="dialog-select">
                    <div class="checkall" :class="{checked:checkedAllStatus}">
                        <i class="icon" @click="toggleAll"></i>
                        <span>全选</span>
                    </div>
                </div>
                <ul class="activate-state">
                    <li>
                        <span>续费后失效日期</span>
                        <p class="text">{{expire_time | formatDate}}</p>
                    </li>
                    <li>
                        <span>激活费用</span>
                        <p class="text">¥{{allPrice}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="error-warp" v-if="error"><p class="error">{{error}}</p></div>
        <div class="dialog-footer">
            <button class="btn" :class="{disabled:disabled,blue:!disabled}" :disabled="disabled" type="button" @click="active">激活</button>
            <button class="btn" type="button" @click="close">取消</button>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        data() {
            return {
                style: 'none',
                id: '',
                company: '',
                price: '',
                expire_time: '',
                list: [],
                offsetTop: 0,
                error:''
            }
        },
        created() {
            let _this = this
            this.$on('show', (id, company, price) => {
                _this.id = id
                _this.error = ''
                mAjax(this, {
                    url: API.operate_expire_seat_list,
                    data: {
                        id: id
                    },
                    success: data => {
                        _this.company = company
                        _this.price = price
                        _this.expire_time = data.data.next_expire
                        data.data.data.forEach(el => {
                            el.checked = false
                        })
                        _this.list = data.data.data
                        _this.style = 'block'
                        _this.$store.commit('SHOW_LAYER')
                    }
                })
            })
        },
        updated() {
            let dialog = this.$el
            let dh = dialog.offsetHeight
            this.offsetTop = -dh / 2 + 'px'
        },
        computed: {
            checkedAllStatus() {
                let all = true
                this.list.forEach(e => {
                    if (!e.checked) {
                        all = false
                    }
                })
                return all
            },
            disabled(){
                let s = true
                this.list.forEach(e => {
                    if (e.checked) {
                        s = false
                    }
                })
                return s
            },
            allPrice(){
                let n = 0
                this.list.forEach(e=>{
                    if(e.checked){
                        n ++
                    }
                })
                return n * this.price
            }
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            checkThis(item) {
                if (item.checked) {
                    item.checked = false
                } else {
                    item.checked = true
                }
            },
            toggleAll() {
                if (this.checkedAllStatus) {
                    this.list.forEach(el => {
                        el.checked = false
                    })
                } else {
                    this.list.forEach(el => {
                        el.checked = true
                    })
                }
            },
            active() {
                let arr = []
                this.list.forEach(el => {
                    if (el.checked)
                        arr.push(el.id)
                })
                let str = arr.join(',')
                mAjax(this, {
                    url: API.operate_active_seat,
                    data: {
                        seat_id: str,
                        uid: this.id
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.close()
                            this.$store.commit('SHOW_TOAST', '激活成功')
                        }else{
                            this.error = data.message
                        }
                    }
                })
            }
        },
        filters: {
            formatDate(val) {
                return val.substr(0, 10)
            }
        }
    }
</script>