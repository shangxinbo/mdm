<template>
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
            <tr v-for="item in list">
                <td>{{item.updated_at}}</td>
                <td>{{item.telephone_crypt}}</td>
                <td>{{item.call_time}}</td>
                <td class="tl">{{item.remarks}}</td>
                <td class="tl">【{{item.dial_result_first}}】{{item.dial_result_second }}</td>
                <td>
                    <a class="btn-audio" href="javascript:void(0);" onclick="getWindow('callAudio');">
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
                <td>2017-03-16 10:20</td>
                <td>138****5556</td>
                <td>6分</td>
                <td class="tl">备注</td>
                <td class="tl">【成功】有意向-条件不符</td>
                <td>
                    <a class="btn-audio" href="javascript:void(0);" onclick="getWindow('callAudio');">
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
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        data() {
            let id = this.$route.query.id
            return {
                id:id,
                list:[]
            }
        },
        created() {
            mAjax(this, {
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
        }
    }

</script>