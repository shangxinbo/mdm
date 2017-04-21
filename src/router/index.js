import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = resolve => System.import('components/users/login.vue')
const initpass = resolve => System.import('components/users/initpass.vue')
const layout = resolve => System.import('components/common/layout.vue')
const error = resolve => System.import('components/common/error.vue')
const operate_index = resolve => System.import('components/operate/index.vue')
const agent_index = resolve => System.import('components/agent/index.vue')
const customer_index = resolve => System.import('components/customer/index.vue')
const customer_add = resolve => System.import('components/customer/add.vue')
const customer_detail = resolve => System.import('components/customer/detail.vue')
const customer_check = resolve => System.import('components/customer/check.vue')
const myinfo = resolve => System.import('components/users/info.vue')
const cusmy = resolve => System.import('components/users/cusmy.vue')
const myseat = resolve => System.import('components/users/myseat.vue')
const project_list = resolve => System.import('components/project/index.vue')
const project_call_list = resolve => System.import('components/project/calllist.vue')
const project_detail = resolve => System.import('components/project/detail.vue')
const project_add = resolve => System.import('components/project/add.vue')
const call_index = resolve => System.import('components/call/index.vue')
const call_cate = resolve => System.import('components/call/category.vue')
const expense_project = resolve => System.import('components/expense/project.vue')
const expense_seat = resolve => System.import('components/expense/seat.vue')
const expense_balance = resolve => System.import('components/expense/balance.vue')
const expense_doc = resolve => System.import('components/expense/doc.vue')
const admin_doc_index = resolve => System.import('components/doc/howdo.vue')

let mRouter = new Router({
    routes: [
        { path: '/login', name: 'login', component: login },
        { path: '/initpass', name: 'initpass', component: initpass },
        {
            path: '/',
            component: layout,
            children: [
                { path: '/doc/index', name: 'admin_doc_index', component: admin_doc_index },
                { path: '/operate/index', name: 'operate_index', component: operate_index },
                { path: '/agent/index/:page?', name: 'agent_index', component: agent_index },
                { path: '/customer/index/', name: 'customer_index', component: customer_index },
                { path: '/customer/add/:id?', name: 'customer_add', component: customer_add },
                { path: '/customer/detail/:id', name: 'customer_detail', component: customer_detail },
                { path: '/customer/check/:id', name: 'customer_check', component: customer_check },
                { path: '/user/myinfo', name: 'myinfo', component: myinfo },
                { path: '/user/cusmy', name: 'cusmy', component: cusmy },
                { path: '/user/myseat', name: 'myseat', component: myseat },
                { path: '/project/index/', name: 'project_list', component: project_list },
                { path: '/project/call/', name: 'project_call_list', component: project_call_list },
                { path: '/project/detail/:id/', name: 'project_detail', component: project_detail },
                { path: '/project/add/:id?', name: 'project_add', component: project_add },
                { path: '/call/index', name: 'call_index', component: call_index },
                { path: '/call/cate', name: 'call_cate', component: call_cate },
                { path: '/expense/project', name: 'expense_project', component: expense_project },
                { path: '/expense/seat', name: 'expense_seat', component: expense_seat },
                { path: '/expense/balance', name: 'expense_balance', component: expense_balance },
                { path: '/expense/doc', name: 'expense_doc', component: expense_doc }
            ]
        },
        { path: '/error*', name: 'error', component: error },
        { path: '*', redirect: '/error?code=404' }
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
        } else if (user.type == 1 || user.type == 2) {
            next({ path: '/customer/index' })
        } else {
            next({ path: '/project/index' })
        }
    } else {
        let arr = [
            path.indexOf('/operate') >= 0,
            path.indexOf('/agent') >= 0,
            path.indexOf('/customer') >= 0,
            path.indexOf('/project') >= 0,
            path.indexOf('/call') >= 0,
            path.indexOf('/expense') >= 0,
            path.indexOf('/doc/index') >= 0
        ]
        //权限配置
        if (path != '/login') {
            if (user.type == 0 && (arr[1] || arr[2] || arr[3] || arr[4] || arr[5])) {
                next({ path: '/error?code=403' })
            }
            if (user.type == 1 && (arr[0]||arr[6])) {
                next({ path: '/error?code=403' })
            }
            if (user.type == 2 && (arr[0] || arr[1] || arr[3] || arr[4] || arr[5]||arr[6])) {
                next({ path: '/error?code=403' })
            }
            if (user.type == 3 && (arr[0] || arr[1] || arr[2]||arr[6])) {
                next({ path: '/error?code=403' })
            }
            if (user.type == 4 && (arr[0] || arr[1] || arr[2] || arr[5]||arr[6])) {
                next({ path: '/error?code=403' })
            }
        }
        next()
    }
})

export default mRouter
