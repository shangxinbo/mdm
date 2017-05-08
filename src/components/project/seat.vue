<template>
    <div class="data-export">
        <ul>
            <li>
                <span class="t">
                    <router-link to="/user/myseat">现有坐席</router-link>
                </span>
                <span class="num">{{num}}</span>
            </li>
        </ul>
        <router-link to="/project/create" class="btn blue btn-export">
            <span>
                <i class="icon add"></i>新建顶目</span>
        </router-link>
    </div>
</template>
<script>
    import { mAjax, dateFormat } from 'src/services/functions'
    import API from 'src/services/api'
    export default {
        data() {
            return {
                num: 0
            }
        },
        created() {
            mAjax(this, {
                url: API.customer_my_seat_list,
                data: {
                    page: 1
                },
                success: data => {
                    if (data.code == 200) {
                        this.num = data.data.exist_seat
                    } else {
                        this.num = 0
                    }
                    this.$emit('getSeatNum',this.num)
                }
            })
        }
    }

</script>