<template>
    <div class="dialog" :style="{display:style}" style="margin-left:-259px;margin-top:-300px;">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>发短信</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>短信模板</label>
                    <div class="input-warp">
                        <div class="select-warp dial-select-sms" :class="{'select-open':selectShow}">
                            <p class="all" @click.stop="showSelect">
                                <span>{{selected.name}}</span>
                            </p>
                            <div class="select-ul">
                                <div class="scroll-warp scrollBar">
                                    <ul>
                                        <li v-for="item in list" @click="change(item)">{{item.name}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="sms-phone">
                <div class="inrr">
                    <i class="bg-up"></i>
                    <i class="bg-down"></i>
                    <p>{{selected.preview_content}}</p>
                </div>
            </div>
        </div>
        <div class="dialog-footer">
            <button class="btn blue" type="button" @click="sure">发送</button>
            <button class="btn" type="button" @click="close">取消</button>
        </div>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import mselect from 'components/utils/select'
    import Vue from 'vue'
    export default {
        data: function () {
            return {
                style: 'none',
                id: '',
                list: [],
                selectShow: false,
                selected: {
                    id: '',
                    name: '',
                    preview_content: ''
                }
            }
        },
        methods: {
            close: function () {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
            },
            showSelect() {
                this.selectShow = true
            },
            change(item) {
                this.selected = item
            },
            sure() {
                let client_id = sessionStorage.getItem('client_id')
                console.log(client_id)
                this.$ajax({
                    url: API.sms_send,
                    data: {
                        clue_id: this.id,
                        template_id: this.selected.id,
                        client_id: client_id
                    },
                    success: data => {
                        this.close()
                        if (data.code == 200) {
                            this.$toast('短信发送成功')
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            }
        },
        created() {
            this.$on('show', function (id) {
                this.id = id
                let client_id = sessionStorage.getItem('client_id')
                this.$ajax({
                    url: API.sms_client_template_list,
                    data: {
                        client_id: client_id
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data
                            this.selected = data.data[0]
                            this.style = 'block'
                            this.$store.commit('SHOW_LAYER')
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            })
        },
        components: {
            mselect
        },
        mounted() {
            let _this = this
            Vue.nextTick(() => {
                document.addEventListener('click', () => {
                    _this.selectShow = false
                })
            })
        }
    }

</script>