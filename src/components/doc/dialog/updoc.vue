<template>
    <div class="dialog" :style="{display:style,'margin-left':'-260px','margin-top':'-202px'}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>更新手册</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>账号权限</label>
                    <div class="input-warp">
                        <p class="text">{{role}}</p>
                    </div>
                </li>
                <li>
                    <label>原文件名</label>
                    <div class="input-warp">
                        <p class="text">{{name}}</p>
                    </div>
                </li>
                <li class="li-notice">
                    <label>更新文件</label>
                    <div class="input-warp">
                        <div class="file-box">
                            <div class="inputbox ">
                                <span name="textfield" id="textfield" class="txt">{{file_name}}</span>
                                <div class="mainbox">
                                    <span class="button1">上传文件</span>
                                    <input type="file" class="file" accept=".doc,.docx,.pdf" multiple="false" size="28" @change="selectFile">
                                </div>
                            </div>
                        </div>
                        <p class="tips">doc、docx或pdf格式</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="error-warp" v-if="error">
            <p class="error">{{error}}</p>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="sure">更新</a>
            <a class="btn" href="javascript:void(0);" @click="close">取消</a>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import axios from 'axios'
    export default {
        data: () => {
            return {
                style: 'none',
                role: '',
                id: '',
                name: '',
                file: '',
                file_name: '',
                error: ''
            }
        },
        methods: {
            close() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            sure() {
                let _this = this
                let data = new FormData()
                if (!this.file) {
                    this.error = '请选择上传文件'
                    return false
                }
                data.append('file', this.file)
                data.append('type', this.id)
                axios.post(API.doc_upload, data).then(function (res) {
                    if (res.status == 200 && res.data.code == 200) {
                        _this.close()
                        _this.$store.commit('SHOW_TOAST', '上传成功')
                    } else {
                        _this.error = res.data.message
                    }
                }).catch(err => {
                    _this.error = '程序未知错误'
                })
            },
            selectFile(evt) {
                let file = evt.target.files[0]
                let mimeArr = [
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/msword',
                    'application/pdf'
                ]
                if (mimeArr.indexOf(file.type) < 0) {
                    this.error = '请上传.doc,.docx,.pdf格式的文件'
                    this.file_name = ''
                }else{
                    this.error = ''
                    this.file_name = file.name
                    this.file = file
                }
            }
        },
        created: function () {
            let _this = this
            this.$on('show', function (id, role, name) {
                _this.id = id
                _this.role = role
                _this.name = name
                _this.error = ''
                _this.style = 'block'
                _this.$store.commit('SHOW_LAYER')
            })
        }
    }

</script>