<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">坐席1的话务</div>
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
                        <a href="javascript:void(0);" class="btn blue">
                            <span>
                                <i class="icon icon-export"></i>导出</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <!--<p class="no-data">暂无数据</p>-->
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>手机号</th>
                                <th>拨打时间</th>
                                <th>通话时长</th>
                                <th>拨打结果</th>
                                <th class="w160">通话录音</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                                <td>{{item.telephone_crypt}}</td>
                                <td>{{item.created_at}}</td>
                                <td>{{item.call_time}}</td>
                                <td>{{item.dial_status}}</td>
                                <td>
                                    <a class="btn-audio" href="javascript:void(0);" @click="playAudio(item.file_mp3_url)">
                                        <span class="notice">
                                            <i class="icon play"></i>
                                        </span>
                                        <span class="audio-txt">播放</span>
                                    </a>
                                    <a :href="item.file_down_url">
                                        <span class="notice">
                                            <i class="icon download"></i>
                                        </span>下载</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='search'></pages>
            </div>
        </div>
        <audio id="audio" class="audio"></audio>
        <confirm ref="confirm"></confirm>
        <alert ref="alert"></alert>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import audioFilter from './audio_filter'
    import confirm from 'components/dialog/confirm'
    import alert from 'components/dialog/alert'
    export default {
        data() {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                list: [],
                head: null,
                userType: user.type,
                currentPage: 1,
                totalPage: 1,
                project_name: '',
                project_id: '',
                status: '',
                start_time: '',
                end_time: ''
            }
        },
        watch: {
            $route: function () {
                this.init()
            },
            playUrl() {
                this.$nextTick(function () {
                    document.querySelector('#audio').play()
                })
            }
        },
        components: {
            pages,
            audioFilter,
            confirm,
            alert,
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page ? this.$route.query.page : 1
                this.project_id = this.$route.query.project_id ? this.$route.query.project_id : ''
                this.client_id = this.$route.query.client_id ? this.$route.query.client_id : ''
                this.status = this.$route.query.result ? this.$route.query.result : ''
                this.end_time = this.$route.query.end_time ? this.$route.query.end_time : ''
                this.start_time = this.$route.query.start_time ? this.$route.query.start_time : ''
                this.refresh()
            },
            refresh() {
                let _this = this
                mAjax(this, {
                    url: API.call_audio,
                    data: {
                        project_id: _this.project_id,
                        client_id: _this.client_id,
                        phone: '',
                        status: _this.status,
                        start_time: this.start_time,
                        end_time: this.end_time,
                        page: _this.currentPage,
                    },
                    success: (data) => {
                        if (data.code == 200) {
                            _this.list = data.data.list.data
                            _this.head = data.data.count
                            _this.totalPage = data.data.list.total
                        } else {
                            _this.list = []
                            _this.head = null
                            _this.totalPage = 1
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
            playAudio(url) {
                let dom = document.querySelector('#audio')
                dom.src = url
                dom.play()
            }
        },
        created() {
            this.init()
            let _this = this
            document.onkeyup = function (evt) {
                if (evt.keyCode == 13)
                    _this.search()
            }
        }
    }

</script>