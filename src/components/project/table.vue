<template>
    <table cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <th>项目名称</th>
                <th>客户名称</th>
                <th>所属代理</th>
                <th>类型</th>
                <th>创建日期</th>
                <th>状态</th>
                <th>线索量</th>
                <th>剩余线索</th>
                <th>拨通线索</th>
                <th>有效率</th>
                <th>通话时长</th>
                <th>剩余时间</th>
                <th>项目坐席</th>
                <th>操作</th>
            </tr>
            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                <td>
                    <a href="#">{{item.name}}</a>
                </td>
                <td>
                    <a href="operate-project-client.html">{{item.client_name}}</a>
                </td>
                <td>
                    <a href="operate-project-agent.html">{{item.agency}}</a>
                </td>
                <td>{{item.project_type}}</td>
                <td>{{item.created_at}}</td>
                <td>{{item.project_status}}</td>
                <td>{{item.clue_num}}</td>
                <td>{{item.clue_odd_num}}</td>
                <td>{{item.clue_connect_num}}</td>
                <td>{{item.clue_valid_percent}}%</td>
                <td>{{item.call_time}}</td>
                <td>{{item.odd_time}}</td>
                <td>{{item.project_seat_num}}</td>
                <td>
                    <router-link v-if="item.status==-1" to="/project/check">审核</router-link>
                    <a v-if="item.status==1" href="javascript:void(0);" @click="stop(item.id)">暂停</a>
                    <a v-if="item.status==2" href="javascript:void(0);" @click="start(item.id)">开启</a>
                </td>
            </tr>
        </tbody>
        <confirm ref="confirm"></confirm>
    </table>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import confirm from 'components/dialog/confirm'
    export default {
        props: ['list'],
        components:{
            confirm
        },
        methods: {
            stop(id) {
                let _this = this
                this.$refs.confirm.$emit('show', '是否要暂停该项目', function () {
                    mAjax(_this, {
                        url: API.project_stop,
                        data: {
                            id: id
                        },
                        success: data => {
                            //TODO toast 
                        }
                    })
                })
            },
            start(id) {
                let _this = this
                this.$refs.confirm.$emit('show', '是否要开启该项目', function () {
                    mAjax(_this, {
                        url: API.project_start,
                        data: {
                            id: id
                        },
                        success: data => {
                            //TODO toast 
                        }
                    })
                })
            }
        }
    }

</script>