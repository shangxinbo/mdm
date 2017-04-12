<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">我的坐席</div>
            <div class="data-property">
                <div class="data-export">
                    <ul>
                        <li>
                            <span class="t">现有坐席</span>
                            <span class="num">{{exist_seat}}</span>
                        </li>
                        <li>
                            <span class="t">已失效坐席</span>
                            <span class="num">{{expire_seat}}</span>
                        </li>
                    </ul>
                    <router-link to="/expense/seat?type=user" class="btn-a btn-export">坐席计费记录</router-link>
                </div>
            </div>
            <div class="data-warp">
                <div class="data-table">
                    <table cellspacing="0" cellpadding="0" v-if="list.length>0">
                        <tbody>
                            <tr>
                                <th>坐席账号</th>
                                <th>坐席状态</th>
                                <th>开通日期</th>
                                <th>开通月数</th>
                                <th>失效日期</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in list" :class="{tr2:index%2,disabled:item.status==2}">
                                <td>{{item.user}}</td>
                                <td>{{item.status==1?'有效':'失效'}}</td>
                                <td>{{item.created_at}}</td>
                                <td>{{item.created_at}}</td>
                                <td>{{item.open_month}}</td>
                                <td>
                                    <a href="javascript:void(0);" @click="showResetPassDialog(item.id,item.user)">重置密码</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="no-data" v-else>暂无数据</p>
                </div>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
        <resetPassDialog ref="resetPassDialog"></resetPassDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import { mAjax } from 'src/services/functions'
    import pages from 'components/common/pages'
    import resetPassDialog from 'components/dialog/resetpass'
    export default {
        data: function () {
            return {
                list: [],
                exist_seat: 0,
                expire_seat: 0,
                totalPage: 1,
                currentPage: 1
            }
        },
        components: {
            pages,
            resetPassDialog
        },
        watch: {
            $route: function () {
                this.init()
            }
        },
        methods: {
            init() {
                this.currentPage = this.$route.query.page
                this.render()
            },
            jump(num) {
                let obj = Object.assign({}, this.$route.query, { page: num })
                this.$router.replace({
                    name: this.$route.name,
                    query: obj
                })
            },
            render() {
                mAjax(this, {
                    url: API.customer_my_seat_list,
                    data: {
                        page: this.currentPage
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.exist_seat = data.data.exist_seat
                            this.expire_seat = data.data.expire_seat
                            this.list = data.data.seat.data
                            this.totalPage = Math.ceil(data.data.seat.total / 10)
                        } else {
                            this.$store.commit('SHOW_TOAST', data.message)
                        }
                    }
                })
            },
            showResetPassDialog(id,name){
                this.$refs.resetPassDialog.$emit('show', id, name)
            }
        },
        created: function () {
            this.render()
        }
    }

</script>