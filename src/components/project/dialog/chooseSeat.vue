<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>分配坐席</h4>
        </div>
        <div class="dialog-body">
            <div class="dialog-allocation">
                <div class="title">{{name}}分配给以下坐席拨打</div>
                <div class="check-warp">
                    <div class="scroll-warp scrollBar" style="overflow-y: auto">
                        <ul class="scroll-content screening-item">
                            <li v-for="(item,index) in seat" :class="{checked:item.checked}">
                                <p>
                                    <i class="icon" @click="toggleChecked(item.key)"></i>
                                    <span>{{item.val}}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dialog-select">
                    <div class="checkall" :class="{checked:checkedAllStatus}">
                        <i class="icon" @click="toggleAll"></i>
                        <span>全选</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="btn" :class="{blue:checked.length>0,disabled:checked.length==0}" type="button" @click="sure">确定</button>
            <button class="btn" type="button" @click="close">取消</button>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        data: function () {
            return {
                style: 'none',
                id: '',
                name: '',
                list: {},
                checked: [],
                error: ''
            }
        },
        computed: {
            seat: function () {
                let arr = []
                for (let i in this.list) {
                    arr.push({
                        key: i,
                        val: this.list[i],
                        checked: this.checked.findIndex(n => n == i) >= 0
                    })
                }
                return arr
            },
            checkedAllStatus: function () {
                let all = true
                this.seat.forEach(e => {
                    if (!e.checked) {
                        all = false
                    }
                })
                return all
            }
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                let _this = this
                if (this.checked.length <= 0) {
                    return false
                }
                mAjax(this, {
                    url: API.seat_tobind,
                    data: {
                        id: this.id,
                        seat_id: this.checked
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            _this.$store.commit('SHOW_TOAST', '操作成功')
                        } else {
                            _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    }
                })
            },
            toggleChecked(id) {
                let index = this.checked.findIndex(n => n == id)
                if (index >= 0) {
                    this.checked.splice(index, 1)
                } else {
                    this.checked.push(id)
                }
            },
            toggleAll() {
                if (this.checkedAllStatus) {
                    this.checked = []
                } else {
                    let arr = []
                    for (let i in this.list) {
                        arr.push(i)
                    }
                    this.checked = arr
                }
            }
        },
        created: function () {
            let _this = this
            mAjax(this, {
                url: API.seat_list,
                success: data => {
                    if (data.code == 200)
                        _this.list = data.data
                    else
                        _this.list = {}
                }
            })
            this.$on('show', function (id, name) {
                _this.id = id
                _this.name = name
                console.log(123)
                mAjax(_this, {
                    url: API.seat_binding,
                    data: {
                        id: id
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.checked = data.data
                            _this.style = 'block'
                            _this.$store.commit('SHOW_LAYER')
                        } else {
                            _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    }
                })
            })
        }
    }

</script>