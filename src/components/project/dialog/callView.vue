<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-267.5px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>拨打详情</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li class="w50">
                    <label>手机号</label>
                    <div class="input-warp">
                        <p class="text">{{tel}}</p>
                    </div>
                </li>
                <li class="w50">
                    <label>项目名称</label>
                    <div class="input-warp">
                        <p class="text">{{project}}</p>
                    </div>
                </li>
                <li class="w100">
                    <label>线索状态</label>
                    <div class="input-warp">
                        <p class="text">{{status==1?'已完成':'未完成'}}</p>
                    </div>
                </li>
                <li>
                    <label>拨打结果</label>
                    <div class="input-warp">
                        <p class="text">{{result | toResultText}}</p>
                    </div>
                </li>
                <li class="cl">
                    <label>备注说明</label>
                    <div class="input-warp">
                        <p class="text">{{des}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" @click="callThis">
                <span>
                    <i class="icon phone"></i>拨打
                </span>
            </a>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import callResultConf from '../callResultConf'
    import md5 from 'js-md5'
    export default {
        data: () => {
            return {
                style: 'none',
                tel: '',
                id: '',
                project: '',
                status: '',
                result: '',
                des: ''
            }
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            callThis:function(){
                this.close()
                this.$emit('callThis',this.id,this.tel)
            }
        },
        filters: {
            toResultText: function (value) {
                if (value) {
                    return callResultConf[value]
                } else {
                    return '未拨打'
                }
            },
            md5Tel(value){     
                let mm = md5.create().update(value).hex()
                return mm.substr(0,16)
            }
        },
        created: function () {
            let _this = this
            this.$on('show', function (id, name) {
                mAjax(this, {
                    url: API.project_clue_info,
                    data: {
                        id: id
                    },
                    success: data => {
                        _this.id = id
                        _this.tel = data.data.telephone_crypt
                        _this.project = name
                        _this.status = data.data.clue_status
                        _this.result = data.data.dial_status
                        _this.des = data.data.remarks
                        _this.style = 'block'
                        _this.$store.commit('SHOW_LAYER')
                    }
                })

            })
        }
    }

</script>