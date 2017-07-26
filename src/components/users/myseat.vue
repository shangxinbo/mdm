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
                    <router-link to="/expense/seat?type=customer" class="btn-a btn-export">坐席计费记录</router-link>
                </div>
            </div>
            <div class="data-warp">
                <mtable :list="list">
                    <template scope="props">
                        <td width="20%" label="坐席账号">{{props.item.user}}</td>
                        <td width="10%" label="坐席状态">{{props.item.status==1?'有效':'失效'}}</td>
                        <td width="20%" label="开通日期">{{props.item.created_at}}</td>
                        <td width="20%" label="失效日期">{{props.item.expire_time}}</td>
                        <td width="20%" label="操作">
                            <a href="javascript:void(0);" @click="showResetPassDialog(props.item.id,props.item.user)">重置密码</a>
                            <a v-if="props.item.status==1" href="javascript:void(0);" @click="showAddFee(props.item.id)">续费</a>
                        </td>
                    </template>
                </mtable>
                <pages :total="totalPage" :current="currentPage" @jump='jump'></pages>
            </div>
        </div>
        <resetPassDialog ref="resetPassDialog"></resetPassDialog>
        <addFeeDialog ref="addFeeDialog"></addFeeDialog>
    </div>
</template>
<script>
    import API from 'src/services/api'
    import pages from 'components/common/pages'
    import resetPassDialog from 'components/dialog/resetpass'
    import addFeeDialog from './dialog/addFee'
    import mtable from 'components/utils/table'

    export default {
        data() {
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
            resetPassDialog,
            mtable,
            addFeeDialog
        },
        watch: {
            $route() {
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
                this.$ajax({
                    url: API.customer_my_seat_list,
                    data: {
                        page: this.currentPage
                    },
                    success: data => {
                        if (data.code == 200) {
                            this.exist_seat = data.data.exist_seat
                            this.expire_seat = data.data.expire_seat
                            this.list = data.data.seat.data
                            this.totalPage = Math.ceil(data.data.seat.total / data.data.seat.per_page)
                        } else {
                            this.$toast(data.message)
                        }
                    }
                })
            },
            showResetPassDialog(id, name) {
                this.$refs.resetPassDialog.$emit('show', id, name)
            },
            showAddFee(id) {
                this.$refs.addFeeDialog.$emit('show', id)
            }
        },
        created() {
            this.render()
        }
    }

</script>