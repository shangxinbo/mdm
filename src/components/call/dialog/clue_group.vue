<template>
    <div class="dialog" :style="{display:show,'margin-left':offsetLeft,'margin-top':offsetTop}">
        <a href="javascript:void(0);" class="icon dialog-close" @click="close" title="关闭"></a>
        <div class="dialog-header">
            <h4>{{tel}} 拨打详情</h4>
        </div>
        <div class="dialog-body">
            <div class="dialog-seat-list">
                <div class="data-export">
                    <ul>
                        <li>
                            <span class="t">项目名称</span>
                            <span class="num">{{projectName}}</span>
                        </li>
                        <li>
                            <span class="t">外呼次数</span>
                            <span class="num">{{success_num}}</span>
                        </li>
                    </ul>
                    <div class="btn-export">
                        <a :href="exportUrl" class="btn blue">
                            <span>
                                <i class="icon icon-export"></i>导出</span>
                        </a>
                    </div>
                </div>
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <th class="w160">拨打时间</th>
                            <th class="w110">通话时长</th>
                            <th class="w110">拨打结果</th>
                            <th>通话录音</th>
                        </tr>
                    </table>
                </div>
                <div class="scroll-warp scrollBar w640" style="overflow-y:auto">
                    <div class="data-table">
                        <table cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr v-for="(item,index) in list" :index="index" :class="{tr2:index%2}">
                                    <td class="w160">{{item.created_at}}</td>
                                    <td class="w110">{{item.call_time}}</td>
                                    <td class="w110">{{item.dial_status|resultText}}</td>
                                    <td>
                                        <a v-if="item.file_mp3_url" class="btn-audio" href="javascript:void(0);" @click="playAudio(item.file_mp3_url,index,$event)">
                                            <span class="notice">
                                                <i class="icon play"></i>
                                            </span>
                                            <span class="audio-txt">播放</span>
                                        </a>
                                        <a v-if="item.file_down_url" :href="item.file_down_url">
                                            <span class="notice">
                                                <i class="icon download"></i>
                                            </span>下载</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import callResultConf from '../../project/callResultConf'
    export default {
        data() {
            return {
                show: 'none',
                offsetLeft: 0,
                offsetTop: 0,
                success_num: 0,
                tel: '',
                list: [],
                playNow: -1,
                id: ''
            }
        },
        created() {
            this.$on('show', (id, tel) => {
                this.tel = tel
                this.id = id
                mAjax(this, {
                    url: API.call_phone_audio,
                    data: {
                        id: id
                    },
                    success: data => {
                        if (data.code == 200 && data.data.list.length > 0) {
                            this.show = 'block'
                            this.list = data.data.list
                            this.success_num = data.data.count

                            let audios = document.querySelectorAll('.btn-audio')
                            for (let i = 0; i < audios.length; i++) {
                                let item = audios[i]
                                let span = item.querySelectorAll('span')
                                span[0].querySelector('i').className = 'icon play'
                                span[1].innerHTML = '播放'
                            }
                            let dom = document.querySelector('#audio')
                            dom.pause()
                            dom.src = ''
                            this.playNow = -1
                            this.$store.commit('SHOW_LAYER')
                        }
                    }
                })
            })
        },
        updated: function () {
            let dialog = this.$el
            let dh = dialog.offsetHeight, dw = dialog.offsetWidth
            this.offsetLeft = -dw / 2 + 'px'
            this.offsetTop = -dh / 2 + 'px'
        },
        computed: {
            projectName() {
                return this.$route.query.crumb_project_name
            },
            exportUrl() {
                return `${API.call_audio_phone_export}?id=${this.id}`
            }
        },
        filters: {
            resultText(val) {
                return callResultConf[val]
            }
        },
        methods: {
            close() {
                this.show = 'none'
                this.$store.commit('HIDE_LAYER')
                let dom = document.querySelector('#audio')
                dom.pause()
                dom.removeAttribute('src')
                dom.load()
                dom.style.display = 'none'
                this.playNow = -1
            },
            playAudio(url, index, evt) {
                let dom = document.querySelector('#audio')
                let span = evt.currentTarget.querySelectorAll('span')
                let text = span[1].innerText
                let audios = document.querySelectorAll('.btn-audio')
                for (let i = 0; i < audios.length; i++) {
                    let item = audios[i]
                    let span = item.querySelectorAll('span')
                    span[0].querySelector('i').className = 'icon play'
                    span[1].innerHTML = '播放'
                    item.removeAttribute('id')
                }
                evt.currentTarget.id = "currentplay"
                dom.style.display='inline-block'
                if(text=='暂停'){
                    dom.pause()
                }else{

                    if (dom.getAttribute('src') != url) {
                        dom.src = url
                        dom.load()
                    }
                    dom.play()
                }



                // if (index == this.playNow) {
                //     dom.pause()
                //     span[0].querySelector('i').className = 'icon play'
                //     span[1].innerHTML = '继续播放'
                //     this.playNow = -1
                // } else {
                //     if (dom.getAttribute('src') != url) {
                //         dom.src = url
                //         dom.load()
                //     }
                //     dom.play()
                //     span[0].querySelector('i').className = 'icon pause'
                //     span[1].innerHTML = '暂停'
                //     this.playNow = index
                // }
            }
        }
    }

</script>