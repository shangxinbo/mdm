<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-181px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>回收线索</h4>
        </div>
        <div class="dialog-body">
            <div class="dialog-recycle">
                <div class="title">回收以下坐席的未拨打线索</div>
                <div class="check-warp">
                    <ul>
                        <li v-for="(item,index) in seat" :class="{checked:item.checked}">
                            <p>
                                <i class="icon" @click="toggleChecked(item)">></i>
                                <span class="name">{{item.name}}</span>
                            </p>
                            <p class="dial">
                                <span>未拨打</span>
                                <span class="num">{{item.num}}</span>
                            </p>
                        </li>
                    </ul>
                    <div class="recycle-all">
                        <span>回收线索</span>
                        <span class="num">{{total}}</span>
                        <span class="tips">回收的线索会变成未分配线索，可以再次分配。</span>
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
            return {
                style: 'none',
                id: '',
                seat: [],
                error: ''
            }
        },
        computed:{
            total(){
                let t = 0
                this.seat.forEach((item,index)=>{
                    if(item.checked){
                        t = t + item.num
                    }
                })
                return t
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
                this.seat.forEach(item => {
                    if (item.checked) {
                        arr.push(item.key)
                    }
                })
                if (arr.length <= 0) {
                    return false
                }
                mAjax(this, {
                    url: API.project_recovery_clues,
                    data: {
                        project_id: this.id,
                        seat: arr
                    },
                    success: data => {
                        console.log(data)
                        if (data.code == 200) {
                            _this.close()
                            _this.$toast('操作成功',()=>{
                                window.location.reload()
                            })
                        } else {
                            _this.error = data.message
                        }
                    }
                })
            },
            toggleChecked(item) {
                item.checked = !item.checked
            }
        },
        created() {
            let _this = this
            this.$on('show', function (id, name, clue) {
                _this.id = id
                _this.error = ''
                mAjax(this, {
                    url: API.project_get_nodial_clues,
                    data: {
                        project_id: id
                    },
                    success: data => {
                        if (data.code == 200) {
                            let arr = []
                            data.data.forEach((item, index) => {
                                arr.push({
                                    key: item.id,
                                    name: item.name,
                                    checked: false,
                                    num: item.num
                                })
                            })
                            this.seat = arr
                            _this.style = 'block'
                            _this.$store.commit('SHOW_LAYER')
                        } else {
                            _this.$toast(data.message)
                        }
                    }
                })
            })
        },
        components: {
            mselect
        }
    }

</script>