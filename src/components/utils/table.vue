<template>
    <div class="data-table">
        <table cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <th v-for="item in headers" :width="item.width">{{item.label}}</th>
                </tr>
            </tbody>
        </table>
        <table>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
        <p class="no-data">暂无数据</p>
    </div>
</template>
<script>
    export default {
        props: ['list'],
        data() {
            return {
                headers:[]
            }
        },
        created() {
            let slots = this.$slots.default
            slots.forEach((item, index) => {
                if (item.tag == 'td') {
                    if (item.data && item.data.attrs) {
                        this.headers.push({
                            width: item.data.attrs.width,
                            label: item.data.attrs.label
                        })
                    }else{
                        this.headers.push({
                            width:'',
                            label:''
                        })
                    }
                }
            })
        }
    }

</script>