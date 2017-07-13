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
        <router-link to="/project/add" class="btn blue btn-export">
            <span>
                <i class="icon add"></i>新建顶目</span>
        </router-link>
    </div>
</template>
<script>
    import API from 'src/services/api'
    export default {
        data() {
            return {
                num: 0
            }
        },
        created() {
            this.$ajax({
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