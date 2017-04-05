import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = resolve => System.import('components/users/login.vue')
const layout = resolve => System.import('components/common/layout.vue')
const operate_index = resolve => System.import('components/operate/index.vue')
const agent_index = resolve => System.import('components/agent/index.vue')
const customer_index = resolve => System.import('components/customer/index.vue')
const customer_add = resolve => System.import('components/customer/add.vue')
const myinfo = resolve => System.import('components/users/info.vue')
const seat = resolve => System.import('components/seat/index.vue')
let mRouter = new Router({
    routes: [
        { path: '/login', name: 'login', component: login },
        {
            path: '/',
            component: layout,
            children: [
                    { path: '/operate/index/:page?', name: 'operate_index', component: operate_index },
                    { path: '/agent/index/:page?', name: 'agent_index', component: agent_index },
                    { path: '/customer/index/:page?', name: 'customer_index', component: customer_index },
                    { path: '/customer/add', name: 'customer_add', component: customer_add },
                    { path: '/user/myinfo', name: 'myinfo', component: myinfo },
                    { path: '/seat/index/page?', name: 'seat', component: seat }
            ]
        }
    ]
})


mRouter.beforeEach((to, from, next) => {
    const path = to.path
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user && path != '/login') {
        next({ path: '/login' })
    } else if (path == '/') {
        if (user.type == 0) {
            next({ path: '/operate/index' })
        } else if(user.type == 1) {
            next({ path: '/agent/index' })
        } else if(user.type == 2) {
            next({ path: '/customer/index' })
        } else if(user.type == 3) {
            next({ path: '/customer/index' })
        }
    } else {
        /*if (path == '/login') {
            document.getElementsByTagName('body')[0].className = 'login-body'
        } else {
            document.getElementsByTagName('body')[0].className = ''
            if (user.type == 1 && (path.indexOf('sms') > 0 || path.indexOf('customer') > 0)) {
                next({ path: '/error?code=403' })
            }
            if (user.type == 2 && path.indexOf('users') > 0) {
                next({ path: '/error?code=403' })
            }
        }*/
        
        next()

    }
})

export default mRouter