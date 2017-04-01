
const API_PRE = process.env.NODE_ENV == 'production' ? '' : '/api'
export default {
    login: API_PRE + '/user/login',
    operate_list: API_PRE + '/operation/list'
}