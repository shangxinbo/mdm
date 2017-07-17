<template>
    <div class="warp">
        <div class="main">
            <div class="title-warp">{{projectName}}外呼列表</div>
            <div class="tag-nav" v-if="!end">
                <router-link :to="{path:'/project/call/nodial',query:{project_id,projectName,end,sms}}" :class="{active:tab==0}">未完成</router-link>
                <router-link :to="{path:'/project/call/enddial',query:{project_id,projectName,end,sms}}" :class="{active:tab==1}">已完成</router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            let projectName = this.$route.query.projectName
            let project_id = this.$route.query.project_id
            let end = this.$route.query.end
            let sms = this.$route.query.sms
            return {
                project_id,
                projectName,
                end,
                sms
            }
        },
        computed: {
            tab() {
                if (this.$route.path.indexOf('/project/call/enddial') >= 0) {
                    return 1
                } else {
                    return 0
                }
            }
        }
    }

</script>