<template>
    <table cellspacing="0" cellpadding="0">
        <tbody v-if="type=='in'">
        <tr>
            <th>充值日期</th>
            <th>充值金额</th>
            <th>充值前金额</th>
            <th>充值后金额</th>
        </tr>
        <tr v-for="(item,index) in list" :class="{tr2:index%2}">
            <td>{{item.date}}</td>
            <td>¥{{item.recharge_cost}}</td>
            <td>¥{{item.recharge_before_balance}}</td>
            <td>¥{{item.recharge_after_balance}}</td>
        </tr>
        </tbody>

        <tbody v-if="type=='out'">
        <tr>
            <th>消费日期</th>
            <th>消费类型</th>
            <th>消费金额</th>
            <th>消费前金额</th>
            <th>消费后金额</th>
        </tr>
        <tr v-for="(item,index) in list" :class="{tr2:index%2}">
            <td>{{item.created_at}}</td>
            <td>{{item.type | fiterCode}}</td>
            <td>¥{{item.consume_money}}</td>
            <td>¥{{item.before_consume_money}}</td>
            <td>¥{{item.after_consume_money}}</td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    import {mAjax} from 'src/services/functions'
    import API from 'src/services/api'
    
    export default {
        props: ['list', 'type'],
        data: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            return {
                userType: user.type,
            }
        },
        filters: {
            fiterCode: function (value) {
                switch (value) {
                    case 1:
                        return '座席'
                    case 2:
                        return '线索'
                    case 3:
                        return '通话'
                    default:
                        return '暂无'
                }
            }
        }
    }

</script>
