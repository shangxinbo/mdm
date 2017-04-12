<template>
    <table cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <th v-if="userType!=3">客户名称</th>
                <th v-if="type=='all'&&userType!=3">所属代理</th>
                <th>开通坐席数</th>
                <th v-if="userType!=3">坐席单价</th>
                <th>开通费用</th>
                <th>开通日期</th>
                <th>开通月数</th>
                <th>失效日期</th>
            </tr>
            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                <td v-if="userType!=3">
                    <router-link :to="{query:{customer_id:item.client_id,customer_name:item.username}}">{{item.username}}</router-link>
                </td>
                <td v-if="type=='all'&&userType!=3">
                    <router-link :to="{query:{agent_id:item.agency_id,agent_name:item.agency}}">{{item.agency}}</router-link>
                </td>
                <td>{{item.seat_num}}</td>
                <td v-if="userType!=3">¥{{item.price}}/月</td>
                <td>¥{{item.cost}}</td>
                <td>{{item.ask_time}}</td>
                <td>{{item.months}}</td>
                <td>{{item.stop_time}}</td>
            </tr>
        </tbody>
        <confirm ref="confirm"></confirm>
    </table>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import confirm from 'components/dialog/confirm'
    let user = JSON.parse(localStorage.getItem('user'))
    export default {
        props: ['list','type'],
        data: function () {
            return {
                userType: user.type,
            }
        },
        components:{
            confirm
        },
        methods: {

        }
    }

</script>
