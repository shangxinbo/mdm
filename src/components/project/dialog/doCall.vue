<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-267.5px;">
        <div class="dialog-header">
            <h4>拨打详情</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li class="w50">
                    <label>手机号</label>
                    <div class="input-warp">
                        <p class="text">{{tel|md5Tel}}</p>
                    </div>
                </li>
                <li class="w50">
                    <label>项目名称</label>
                    <div class="input-warp">
                        <p class="text">{{projectName}}</p>
                    </div>
                </li>
                <li class="w100">
                    <label>线索状态</label>
                    <div class="input-warp">
                        <label class="radio-warp" :class="{'radio-active':clueStatus}" for="hadFinish" @click="chooseStatus(1)">
                            <i class="icon"></i>
                            <span class="radioname">已完成</span>
                        </label>
                        <label class="radio-warp" :class="{'radio-active':!clueStatus}" for="notFinish" @click="chooseStatus(0)">
                            <i class="icon"></i>
                            <span class="radioname">未完成</span>
                        </label>
                    </div>
                </li>
                <li>
                    <label>拨打结果</label>
                    <div class="input-warp">
                        <label class="radio-warp" for="hadDial" :class="{'radio-active':callResult}" @click="chooseResult(1)">
                            <i class="icon"></i>
                            <span class="radioname">已拨通</span>
                        </label>
                        <label class="radio-warp" for="notDial" :class="{'radio-active':!callResult}" @click="chooseResult(0)">
                            <i class="icon"></i>
                            <span class="radioname">未拨通</span>
                        </label>
                        <selectInDialog ref="callResultSelect"></selectInDialog>
                    </div>
                </li>
                <li class="cl">
                    <label>备注说明
                        <em class="tips">（选填）</em>
                    </label>
                    <div class="input-warp">
                        <textarea v-model="des"></textarea>
                    </div>
                </li>
            </ul>
        </div>
        <div class="error-warp" v-if="error">
            <p class="error">{{error}}</p>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="sure">保存</a>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import selectInDialog from './selectInDialog'
    import md5 from 'js-md5'
    export default {
        data: function () {
            return {
                style: 'none',
                id: '',
                tel: '',
                projectName: '',
                clueStatus: 1,
                callResult: 1,
                des: '',
                error: ''
            }
        },
        props: ['uuid'],
        computed: {
            dialing: function () {
                return this.$store.state.dialing
            },
            tel_encrypt: function () {
                return this.tel.substr(0, 3) + '****' + this.tel.substr(7, 11)
            }
        },
        filters: {
            md5Tel(value) {
                let mm = md5.create().update(value).hex()
                return mm.substr(0, 16)
            }
        },
        components: {
            selectInDialog
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure: function () {
                let _this = this
                if (this.des.length > 100) {
                    this.error = '备注不能超过100个字符'
                    return false
                } else {
                    this.error = ''
                }
                mAjax(this, {
                    url: API.project_call_modify,
                    data: {
                        id: this.id,
                        clue_status: this.clueStatus,
                        dial_status: this.callResult == 1 ? 1 : this.$refs.callResultSelect.selected.id,
                        remarks: this.des
                    },
                    success: data => {
                        if (data.code == 200) {
                            _this.close()

                            // if (_this.dialing) {
                            //     mAjax(this, {
                            //         url: API.add_call_job,
                            //         data: {
                            //             call_uuid: _this.uuid
                            //         },
                            //         success: data => {
                            //             _this.$store.commit('SHOW_TOAST', '操作成功')
                            //             console.log('拨叫任务处理完毕')
                            //         }
                            //     })
                            //     _this.$store.commit('CHANGE_DIAL_STATUS',false)
                            // } else {
                            //     _this.$store.commit('SHOW_TOAST', '操作成功')
                            // }
                            _this.$store.commit('SHOW_TOAST', '操作成功')

                        } else {
                            _this.$store.commit('SHOW_TOAST', data.message)
                        }
                    }
                })
            },
            chooseResult(num) {
                this.callResult = num
            },
            chooseStatus(num) {
                this.clueStatus = num
            }
        },
        created: function () {
            let _this = this
            this.$on('show', function (id, tel, projectName) {
                _this.id = id
                _this.tel = tel
                _this.projectName = projectName
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')
            })
        }
    }

</script>