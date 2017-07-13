<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>分配线索</h4>
        </div>
        <div class="dialog-body">
            <div class="dialog-allocation">
                <ul class="mode">
                    <li>
                        <label>线索分配方式</label>
                        <mselect :hideAll="true" :addClass="'seat-select'" :id="assignType" :initlist="assignTypeList" @change="changeAssignType"></mselect>
                    </li>
                </ul>
                <ul class="mode">
                    <li>
                        <label>未分配线索</label>
                        <div class="input-warp">
                            <p class="text"> {{clue_num}}</p>
                        </div>
                    </li>
                    <li v-show="assignType==1">
                        <div class="select-cutover1">
                            <label>本次分配线索</label>
                            <div class="input-warp">
                                <input class="text" type="text" v-model="assign_clue_num" style="width: 120px; min-width: 120px">
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="title">{{name}}分配给以下坐席拨打</div>
                <div class="check-warp">
                    <div class="scroll-warp scrollBar" style="overflow-y: auto">
                        <ul class="scroll-content screening-item">
                            <li v-for="(item,index) in seat" :class="{checked:item.checked}">
                                <p>
                                    <i class="icon" @click="toggleChecked(item)"></i>
                                    <span>{{item.val}}</span>
                                </p>
                                <div class="clue" v-show="assignType==2">
                                    <span>分配线索</span>
                                    <input class="text" type="text" v-model="item.num">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <p class="notice" v-show="error">
                    <i class="icon"></i>{{error}}</p>
                <div class="dialog-select">
                    <div class="checkall" :class="{checked:checkedAllStatus}">
                        <i class="icon" @click="toggleAll"></i>
                        <span>全选</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="btn blue" type="button" @click="sure">确定</button>
            <button class="btn" type="button" @click="close">取消</button>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    export default {
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                style: 'none',
                id: '',
                name: '',
                seat: [],
                error: '',
                userType: user.type,
                clue_num: 0,
                assign_clue_num: '',
                assignTypeList: [
                    { id: 1, name: '平均分配' },
                    { id: 2, name: '自定义分配' }
                ],
                assignType: 1  //默认是平均分配
            }
        },
        computed: {
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
                let arr = []
                let reg = /^[1-9][0-9]*$/
                if (this.assignType == 1) {
                    this.seat.forEach(item => {
                        if (item.checked) {
                            arr.push(item.key)
                        }
                    })
                    if (arr.length <= 0) {
                        return false
                    }

                    if (!reg.test(this.assign_clue_num)) {
                        this.error = '分配的线索数值需要是正整数'
                        return false
                    } else {
                        this.error = ''
                    }

                } else {
                    this.seat.forEach(item => {
                        if (item.checked) {
                            arr.push({ id: item.key, num: item.num })
                        }
                    })

                    let total = 0
                    for (let i = 0; i < arr.length; i++) {
                        if (!reg.test(arr[i].num)) {
                            this.error = '请保证每个坐席分配到的线索数值是正整数'
                            return false
                        } else {
                            total = total + parseInt(arr[i].num)
                        }
                    }
                    if (arr.length <= 0) {
                        return false
                    } else {
                        if (total > this.clue_num) {
                            this.error = `分配线索量之和大于未拨打线索量。分配线索量之和 ${total}，未拨打线索量 ${this.clue_num}`
                            return false
                        } else {
                            this.error = ''
                        }
                    }
                }
                mAjax(this, {
                    url: API.seat_tobind,
                    data: {
                        id: this.id,
                        type: this.assignType == 1 ? 0 : 1,
                        seat_id: {
                            num: this.assign_clue_num,
                            ids: arr
                        },
                        seat_conf: arr
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()
                            _this.$toast('操作成功', () => {
                                window.location.reload()
                            })
                        } else if (data.code == 600) {
                            _this.close()
                            _this.$toast('拨打资源数量在变动中,请刷新页面后，尝试重新分配')
                        } else {
                            _this.error = data.message
                        }
                    }
                })
            },
            toggleChecked(item) {
                item.checked = !item.checked
            },
            toggleAll() {
                let all = this.checkedAllStatus
                this.seat.forEach((item, index, arr) => {
                    item.checked = !all
                })
            },
            changeAssignType(val) {
                this.assignType = val.id
                if (val.id == 2) {
                    this.seat.forEach((item, index, arr) => {
                        item.num = ''
                    })
                } else {
                    this.assign_clue_num = ''
                }
                this.error = ''
            }
        },
        created() {
            let _this = this
            if (this.userType != 3) return false
            mAjax(this, {
                url: API.seat_list,
                success: data => {
                    if (data.code == 200) {
                        let arr = []
                        for (let i in data.data) {
                            arr.push({
                                key: i,
                                val: data.data[i],
                                checked: false,
                                num: ''
                            })
                        }
                        _this.seat = arr
                    } else {
                        _this.seat = []
                    }
                }
            })
            this.$on('show', function (id, name, clue) {
                _this.id = id
                _this.name = name
                _this.clue_num = clue
                _this.assignType = 1
                _this.assign_clue_num = ''
                _this.error = ''
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')
            })
        },
        components: {
            mselect
        }
    }

</script>