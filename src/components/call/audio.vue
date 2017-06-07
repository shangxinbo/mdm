<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">坐席1的话务</div>
            <div class="data-property">
                <audioFilter @submit="search"></audioFilter>
                <div class="data-export">
                    <ul>
                        <li>
                            <span class="t">外呼次数</span>
                            <span class="num">1000</span>
                        </li>
                        <li>
                            <span class="t">拨通次数</span>
                            <span class="num">800</span>
                        </li>
                        <li>
                            <span class="t">拨通率</span>
                            <span class="num">80%</span>
                        </li>
                        <li>
                            <span class="t">通话时长</span>
                            <span class="num">12小时46分</span>
                        </li>
                        <li>
                            <span class="t">平均通话</span>
                            <span class="num">10分</span>
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
                    <table cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>手机号</th>
                                <th>拨打时间</th>
                                <th>通话时长</th>
                                <th>拨打结果</th>
                                <th class="w160">通话录音</th>
                            </tr>
                            <tr>
                                <td>138****5556</td>
                                <td>2017-03-14</td>
                                <td>13分</td>
                                <td>已拨通</td>
                                <td>
                                    <a class="btn-audio" href="javascript:void(0);" onclick="audioControl(this);">
                                        <span class="notice">
                                            <i class="icon play"></i>
                                        </span>
                                        <span class="audio-txt">播放</span>
                                    </a>
                                    <a href="#">
                                        <span class="notice">
                                            <i class="icon download"></i>
                                        </span>下载</a>
                                    <audio class="audio" src="../static/audio/audio.mp3"></audio>
                                </td>
                            </tr>
                            <tr class="tr2">
                                <td>138****5556</td>
                                <td>2017-03-14</td>
                                <td>13分</td>
                                <td>已拨通</td>
                                <td>
                                    <a class="btn-audio" href="javascript:void(0);" onclick="audioControl(this);">
                                        <span class="notice">
                                            <i class="icon play"></i>
                                        </span>
                                        <span class="audio-txt">播放</span>
                                    </a>
                                    <a href="#">
                                        <span class="notice">
                                            <i class="icon download"></i>
                                        </span>下载</a>
                                    <audio class="audio" src="../static/audio/audio.mp3"></audio>
                                </td>
                            </tr>
                            <tr>
                                <td>138****5556</td>
                                <td>2017-03-14</td>
                                <td>13分</td>
                                <td>空号</td>
                                <td>
                                    <a class="btn-audio" href="javascript:void(0);" onclick="audioControl(this);">
                                        <span class="notice">
                                            <i class="icon play"></i>
                                        </span>
                                        <span class="audio-txt">播放</span>
                                    </a>
                                    <a href="#">
                                        <span class="notice">
                                            <i class="icon download"></i>
                                        </span>下载</a>
                                    <audio class="audio" src="../static/audio/audio.mp3"></audio>
                                </td>
                            </tr>
                            <tr class="tr2">
                                <td>138****5556</td>
                                <td>2017-03-14</td>
                                <td>13分</td>
                                <td>停机</td>
                                <td>
                                    <a class="btn-audio" href="javascript:void(0);" onclick="audioControl(this);">
                                        <span class="notice">
                                            <i class="icon play"></i>
                                        </span>
                                        <span class="audio-txt">播放</span>
                                    </a>
                                    <a href="#">
                                        <span class="notice">
                                            <i class="icon download"></i>
                                        </span>下载</a>
                                    <audio class="audio" src="../static/audio/audio.mp3"></audio>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page">
                    <a class="prev disabled" href="javascript:void(0);">上一页</a>
                    <a href="javascript:void(0);" class="active">1</a>
                    <a href="javascript:void(0);">2</a>
                    <a href="javascript:void(0);">3</a>
                    <span>...</span>
                    <a href="javascript:void(0);">19</a>
                    <a class="next" href="javascript:void(0);">下一页</a>
                </div>
            </div>
        </div>
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
                    url: API.call_cate,
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