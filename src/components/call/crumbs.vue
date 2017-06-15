<template>
    <div class="current">
        <router-link v-if="agent.id||client.id||project.id||seat.id" to="/call/index">话务管理</router-link>
        <template v-if="agent.id">
            <router-link v-if="client.id||project.id||seat.id" :to="{path:'/call/index', query : {agent_id:agent.id,agent_name:agent.name,crumb_agent_id:agent.id,crumb_agent_name:agent.name}}">{{agent.name}}的话务</router-link>
            <span v-else>{{agent.name}}的话务</span>
        </template>
        <template v-if="client.id">
            <router-link v-if="project.id||seat.id" :to="{path:'/call/index', query : Object.assign({client_id:client.id,client_name:client.name,crumb_client_id:client.id,crumb_client_name:client.name},crumbs)}">{{client.name}}的话务</router-link>
            <span v-else>{{client.name}}的话务</span>
        </template>
        <template v-if="project.id">
            <router-link v-if="seat.id" :to="{path:'/call/cate',query:Object.assign({project_id:project.id,project_name:project.name,crumb_project_id:project.id,crumb_project_name:project.name},crumbs)}">{{project.name}}的话务</router-link>
            <span v-else>{{project.name}}的话务</span>
        </template>
        <span v-if="seat.id">{{seat.name}}的话务</span>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        computed: {
            agent() {
                return {
                    id: this.$route.query.crumb_agent_id,
                    name: this.$route.query.crumb_agent_name
                }
            },
            client() {
                console.log(123)
                return {
                    id: this.$route.query.crumb_client_id,
                    name: this.$route.query.crumb_client_name
                }
            },
            project() {
                return {
                    id: this.$route.query.crumb_project_id,
                    name: this.$route.query.crumb_project_name
                }
            },
            seat() {
                return {
                    id: this.$route.query.crumb_seat_id,
                    name: this.$route.query.crumb_seat_name
                }
            },
            crumbs() {
                let obj = {}
                if (this.$route.query.crumb_agent_id) {
                    obj.crumb_agent_id = this.$route.query.crumb_agent_id
                    obj.crumb_agent_name = this.$route.query.crumb_agent_name
                }
                if (this.$route.query.crumb_client_id) {
                    obj.crumb_client_id = this.$route.query.crumb_client_id
                    obj.crumb_client_name = this.$route.query.crumb_client_name
                }
                return obj
            }
        }
    }

</script>