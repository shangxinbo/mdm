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
                            <span class="num">{{project_name}}</span>
                        </li>
                        <li>
                            <span class="t">称呼</span>
                            <span class="num">{{call}}</span>
                        </li>
                        <li>
                            <span class="t">归属地</span>
                            <span class="num">{{city}}</span>
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
                            <th class="w80">通话时长</th>
                            <th >备注</th>
                            <th class="w160">拨打结果</th>
                            <th class="w200">通话录音</th>
                        </tr>
                    </table>
                </div>
                <div class="scroll-warp scrollBar" style="overflow-y:auto">
                    <div class="data-table">
                        <table cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr v-for="(item,index) in list" :index="index" :class="{tr2:index%2}">
                                    <td class="w160">{{item.created_at}}</td>
                                    <td class="w80">{{item.call_time}}</td>
                                    <td>{{item.remarks}}</td>
                                    <td class="w160">{{item.dia_result}}</td>
                                    <td class="w200">
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
    import API from 'src/services/api'
    import callResultConf from '../../project/call/callResultConf'
    export default {
        data() {
            return {
                show: 'none',
                offsetLeft: 0,
                offsetTop: 0,
                tel: '',
                list: [],
                playNow: -1,
                id: '',
                call:'',
                city:'',
                project_name:''
            }
        },
        created() {
            this.$on('show', (id, tel,call,city) => {
                this.tel = tel
                this.id = id
                this.$ajax({
                    url: API.call_phone_audio,
                    data: {
                        id: id
                    },
                    success: data => {
                        if (data.code == 200 && data.data.list.length > 0) {
                            this.show = 'block'
                            this.list = data.data.list
                            this.call = call
                            this.city = city
                            this.project_name = data.data.project_name

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
            exportUrl() {
                return `${API.call_audio_phone_export}?id=${this.id}`
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

            }
        }
    }

</script>