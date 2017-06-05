<template>
    <table cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
            <th>项目名称</th>
            <th v-if="type!='user'&&userType!=3">客户名称</th>
            <th v-if="type=='all'&&userType!=3">所属代理</th>
            <th>创建日期</th>
            <th>状态</th>
            <th>线索计费</th>
            <th>通话计费</th>
        </tr>
        <tr v-for="(item,index) in list" :class="{tr2:index%2}">
            <td>{{item.name}}</td>
            <td v-if="type!='user'&&userType!=3">
                <router-link :to="{query:{customer_id:item.client_id,customer_name:item.company}}">{{item.company}}

                </router-link>
            </td>
            <td v-if="type=='all'&&userType!=3">
                <router-link :to="{query:{agent_id:item.agency_id,agent_name:item.agent_name}}">{{item.agent_name}}

                </router-link>
            </td>
            <td>{{item.created_at}}</td>
            <td>{{item.status_name}}</td>
            <td>¥{{item.clue_charging}}</td>
            <td>¥{{item.call_charging}}</td>
        </tr>
        </tbody>
        <confirm ref="confirm"></confirm>
    </table>
</template>
<script>
    import {mAjax, codeToName} from 'src/services/functions'
    import API from 'src/services/api'
    import confirm from 'components/dialog/confirm'
    
    export default {
        props: ['list', 'type'],
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                userType: user.type,
            }
        },
        components: {
            confirm
        },
        filters: {
            fiterCode: function (value) {
                return codeToName(value)
            }
        },
        methods: {}
    }

</script>
