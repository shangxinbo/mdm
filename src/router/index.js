import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from 'src/services/functions'

Vue.use(Router)
const login = resolve => System.import('components/users/login.vue')

export default new Router({
    routes: [
        { path: '/login', name: 'login', component: login }
    ]
})
