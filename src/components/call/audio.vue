<template>
    <div class="warp">
        <div class="main">
            <crumbs></crumbs>
            <div class="title-warp">{{seat_name}}的话务</div>
            <div class="data-property">
                <audioFilter @submit="search"></audioFilter>
                <div class="data-export" v-if="list.length>0">
                    <ul>
                        <li>
                            <span class="t">外呼次数</span>
                            <span class="num">{{head.call_num}}</span>
                        </li>
                        <li>
                            <span class="t">拨通次数</span>
                            <span class="num">{{head.effect_call_num}}</span>
                        </li>
                        <li>
                            <span class="t">拨通率</span>
                            <span class="num">{{head.effect_call_rate}}%</span>
                        </li>
                        <li>
                            <span class="t">通话时长</span>
                            <span class="num">{{head.call_time}}</span>
                        </li>
                        <li>
                            <span class="t">平均通话</span>
                            <span class="num">{{head.avg_call_time}}</span>
                        </li>
                    </ul>
                    <div class="btn-export">
                        <a :href="exportUrl" class="btn blue">
                            <span>
                                <i class="icon icon-export"></i>导出</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="10%" label="拨打资源">
                            <a href="javascript:void(0)" @click="group(props.item.id,props.item.telephone_crypt,props.item.call_name,props.item.city)">
                                {{props.item.telephone_crypt}}
                            </a>
                        </td>
                        <td width="10%" label="归属地">{{props.item.city}}</td>
                        <td width="10%" label="称呼">{{props.item.call}}{{props.item.gender=='男'?'先生':''}}{{props.item.gender=='女'?'女士':''}}</td>
                        <td width="10%" label="拨打时间">{{props.item.created_at}}</td>
                        <td width="10%" label="通话时长">{{props.item.call_time}}</td>
                        <td width="20%" label="备注">{{props.item.remarks}}</td>
                        <td width="15%" label="拨打结果">{{props.item.dia_result}}</td>
                        <td width="15%" label="通话录音">
                            <a v-if="props.item.file_mp3_url" class="btn-audio" href="javascript:void(0);" @click="playAudio(props.item.file_mp3_url,index,$event)">
                                <span class="notice">
                                    <i class="icon play"></i>
                                </span>
                                <span class="audio-txt">播放</span>
                            </a>
                            <a v-if="props.item.file_down_url" :href="props.item.file_down_url">
                                <span class="notice">
                                    <i class="icon download"></i>
                                </span>下载</a>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
        <audio controls="true" style="position: fixed;top: 67px;right: 165px;z-index:100000;width:400px;" id="audio" class="audio"
            @play="play" @pause="pause" @ended="end"></audio>
        <clueGroup ref="clueGroup"></clueGroup>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import audioFilter from './audio_filter'
    import callResultConf from '../project/call/callResultConf'
    import crumbs from './crumbs'
    import clueGroup from './dialog/clue_group'
    import mtable from 'components/utils/table'
    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                list: [],
                head: null,
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                seat_name: '',
                project_id: '',
                status: '',
                start_time: '',
                end_time: '',
                tel: '',
                playNow: -1,
                city: '',
                result1: '',
                result2: ''
            }
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        computed: {
            exportUrl() {
                return `${API.call_audio_export}?page=${this.currentPage}&project_id=${this.project_id}&client_id=${this.seat_id}&start_time=${this.start_time}&end_time=${this.end_time}&status=${this.status}&phone=${this.tel}`
            }
        },
        filters: {
            resultText(val) {
                return callResultConf[val]
            }
        },
        components: {
            pages,
            audioFilter,
            crumbs,
            clueGroup,
            mtable
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.project_id = this.$route.query.project_id ? this.$route.query.project_id : ''
                this.seat_id = this.$route.query.seat_id ? this.$route.query.seat_id : ''
                this.seat_name = this.$route.query.seat_name ? this.$route.query.seat_name : ''
                this.end_time = this.$route.query.end_time ? this.$route.query.end_time : ''
                this.start_time = this.$route.query.start_time ? this.$route.query.start_time : ''
                this.tel = this.$route.query.tel ? this.$route.query.tel : ''
                this.city = this.$route.query.city ? this.$route.query.city : ''
                this.result1 = this.$route.query.result1 ? this.$route.query.result1 : ''
                this.result2 = this.$route.query.result2 ? this.$route.query.result2 : ''
                this.refresh()
            },
            refresh() {
                this.$ajax({
                    url: API.call_audio,
                    data: {
                        project_id: this.project_id,
                        client_id: this.seat_id,
                        phone: this.tel,
                        area: this.city,
                        dial_result_first: this.result1,
                        dial_result_second: this.result2,
                        start_time: this.start_time,
                        end_time: this.end_time,
                        page: this.currentPage,
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.list = data.data.list.data
                            this.head = data.data.count
                            this.totalPage = Math.ceil(data.data.list.total / data.data.list.per_page)
                        } else {
                            this.list = []
                            this.head = null
                            this.totalPage = 1
                        }
                    }
                })
            },
            search(param) {
                let query
                if (!isNaN(param)) {
                    query = Object.assign({}, this.$route.query, { page: param })
                } else {
                    query = Object.assign({}, this.$route.query, param, { page: 1 })
                }
                this.$router.replace({
                    name: this.$route.name,
                    query: query
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
                this.$refs.clueGroup.playNow = -1
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
            },
            group(id, tel,call,city) {
                this.playNow = -1
                let dom = document.querySelector('#audio')
                dom.pause()
                dom.removeAttribute('src')
                dom.load()
                dom.style.display = 'none'
                this.$refs.clueGroup.$emit('show', id, tel,call,city)
            }
        },
        created() {
            this.init()
            let _this = this
            document.onkeyup = function (evt) {
                if (evt.keyCode == 13)
                    _this.search()
            }
        },
        beforeRouteUpdate(to, from, next) {  //路由切换终端播放录音
            this.playNow = -1
            let dom = document.querySelector('#audio')
            dom.pause()
            dom.removeAttribute('src')
            dom.load()
            dom.style.display = 'none'
            let audios = document.querySelectorAll('.btn-audio')
            for (let i = 0; i < audios.length; i++) {
                let item = audios[i]
                let span = item.querySelectorAll('span')
                span[0].querySelector('i').className = 'icon play'
                span[1].innerHTML = '播放'
            }
            next()
        }
    }

</script>