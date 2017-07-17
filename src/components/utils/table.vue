<template>
    <div class="data-table">
        <table cellspacing="0" cellpadding="0" v-if="list.length>0">
            <tbody>
                <tr>
                    <th v-for="item in headers" :width="item.width">{{item.label}}</th>
                </tr>
            </tbody>
        </table>
        <table v-if="list.length>0">
            <tbody>
                <tr v-for="(item,index) in list" :class="{tr2:index%2}">
                    <slot :item="item"></slot>
                </tr>
            </tbody>
        </table>
        <p class="no-data" v-else>暂无数据</p>
    </div>
</template>
<script>
    export default {
        props: ['list'],
        data() {
            return {
                headers: []
            }
        },
        watch: {
            list(newVal, oldVal) {
                let slots = this.$scopedSlots.default({ item: this.list[0] })
                this.headers = []
                slots.forEach((item, index) => {
                    if (item.tag == 'td') {
                        if (item.data && item.data.attrs) {
                            this.headers.push({
                                width: item.data.attrs.width,
                                label: item.data.attrs.label
                            })
                        } else {
                            this.headers.push({
                                label: ''
                            })
                        }
                    }
                })
            }
        }
    }

</script>