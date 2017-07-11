<template>
    <table cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <th v-if="(type=='all'||type=='agent')&&userType!=3">客户名称</th>
                <th v-if="type=='all'&&userType!=3">所属代理</th>
                <th>开通坐席数</th>
                <th v-if="userType!=3">坐席单价</th>
                <th>开通费用</th>
                <th>开通日期</th>
                <th>失效日期</th>
            </tr>
            <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                <td v-if="(type=='all'||type=='agent')&&userType!=3">
                    <router-link :to="{query:{customer_id:item.client_id,customer_name:item.company}}">{{item.company}}</router-link>
                </td>
                <td v-if="type=='all'&&userType!=3">
                    <router-link :to="{query:{agent_id:item.superior_id,agent_name:item.name}}">{{item.name}}</router-link>
                </td>
                <td>{{item.seat_num}}</td>
                <td v-if="userType!=3">¥{{item.price}}/月</td>
                <td>¥{{item.cost}}</td>
                <td>{{item.ask_time}}</td>
                <td>{{item.stop_time}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    
    export default {
        props: ['list','type'],
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                userType: user.type,
            }
        }
    }

</script>
