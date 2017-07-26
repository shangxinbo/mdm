<template>
    <div style="position:relative">
        <table cellspacing="0" cellpadding="0" v-if="list.length>0">
            <tbody>
                <tr>
                    <th>拨打时间</th>
                    <th>拨打资源</th>
                    <th>通话时长</th>
                    <th class="tl">备注</th>
                    <th class="tl">拨打结果</th>
                    <th>通话录音</th>
                </tr>
                <tr v-for="(item,index) in list" :class="{tr2:index%2==1}">
                    <td>{{item.updated_at}}</td>
                    <td>{{item.telephone_crypt}}</td>
                    <td>{{item.call_time|timeFormat}}</td>
                    <td class="tl">{{item.remarks}}</td>
                    <td class="tl">【{{item.dial_result_first}}】{{item.dial_result_second }}</td>
                    <td>
                        <a class="btn-audio" v-if="item.sound_url" href="javascript:void(0);" @click="playAudio(item.sound_url,index,$event)">
                            <span class="notice">
                                <i class="icon play"></i>
                            </span>
                            <span class="audio-txt">播放</span>
                        </a>
                        <a v-if="item.download_url" :href="item.download_url">
                            <span class="notice">
                                <i class="icon download"></i>
                            </span>下载</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <audio controls="true" style="position: absolute;top: -45px;right: 0px;z-index:100000;width:400px;display:none;" id="audio"
            class="audio" @play="play" @pause="pause" @ended="end"></audio>
    </div>
</template>
<script>
    import API from 'src/services/api'
    export default {
        data() {
            return {
                id: '',
                list: [],
                playNow: -1
            }
        },
        created() {
            this.init()
        },
        watch: {
            $route() {
                this.init()
            }
        },
        filters: {
            timeFormat(val) {
                let hour = 0
                let minute = 0
                let second = 0
                if (val > 60 * 60) {
                    hour = Math.floor(val / (60 * 60))
                }
                if (val > 60) {
                    minute = Math.floor((val - hour * 60 * 60) / 60)
                }
                second = val - hour * 60 * 60 - minute * 60
                return (hour ? (hour + '时') : '') + (minute || hour ? (minute + '分') : '') + second + '秒'
            }
        },
        methods: {
            init() {
                this.id = this.$route.query.id
                this.$ajax({
                    url: API.clue_get_record,
                    data: {
                        clue_id: this.id
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data
                        } else {
                            this.list = []
                        }
                    }
                })
            },
            playAudio(url, index, evt) {
                let dom = document.querySelector('#audio')
                let audios = document.querySelectorAll('.btn-audio')
                let span = evt.currentTarget.querySelectorAll('span')
                let text = span[1].innerText
                dom.style.display = 'inline-block'
                for (let i = 0; i < audios.length; i++) {
                    let item = audios[i]
                    let span = item.querySelectorAll('span')
                    span[0].querySelector('i').className = 'icon play'
                    span[1].innerHTML = '播放'
                    item.removeAttribute('id')
                }
                evt.currentTarget.id = "currentplay"
                if (text == '暂停') {
                    dom.pause()
                } else {

                    if (dom.getAttribute('src') != url) {
                        dom.src = url
                        dom.load()
                    }
                    dom.play()
                }
            },
            end() {
                let audios = document.querySelectorAll('.btn-audio')
                for (let i = 0; i < audios.length; i++) {
                    let item = audios[i]
                    let span = item.querySelectorAll('span')
                    span[0].querySelector('i').className = 'icon play'
                    span[1].innerHTML = '播放'
                }
                this.playNow = -1
            },
            pause() {
                let audio = document.querySelectorAll('#currentplay span')
                audio[0].querySelector('i').className = 'icon play'
                audio[1].innerHTML = '继续播放'
            },
            play() {
                let audio = document.querySelectorAll('#currentplay span')
                audio[0].querySelector('i').className = 'icon pause'
                audio[1].innerHTML = '暂停'
            }
        }
    }

</script>