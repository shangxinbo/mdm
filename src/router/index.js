import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = resolve => System.import('components/users/login.vue')
const layout = resolve => System.import('components/common/layout.vue')
const operate_index = resolve => System.import('components/operate/index.vue')
const agent_index = resolve => System.import('components/agent/index.vue')

let mRouter = new Router({
    routes: [
        { path: '/login', name: 'login', component: login },
        {
            path: '/',
            component: layout,
            children: [
                    { path: '/operate/index/:page?', name: 'operate_index', component: operate_index },
                    { path: '/agent/index/:page?', name: 'agent_index', component: agent_index }
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
        } else {
            next({ path: '/sms' })
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