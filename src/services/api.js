
const API_PRE = process.env.NODE_ENV == 'production' ? '' : '/api'
export default {
    login: API_PRE + '/user/login',
    logout:API_PRE + '/user/logout',
    update_pass:API_PRE + '/user/modifypwd',
    operate_list: API_PRE + '/operation/list',
    agent_list: API_PRE + '/operation/aginuserinfo',
    reset_operate_pass: API_PRE + '/operation/changePwd',
    create_operate:API_PRE + '/operation/add',
    update_operate:API_PRE + '/operation/modifyinfo',
    customer_list:API_PRE + '/agent/list',
    customer_list_by_operate:API_PRE + '/operate/list',
    customer_type_list:API_PRE + '/operate/usertype',
    customer_add : API_PRE + '/agent/add',
    customer_detail: API_PRE + '/agent/agininfo',
    customer_edit: API_PRE + '/agent/modifyinfo',
    angent_list_all:API_PRE + '/operate/agent',
    add_seat:API_PRE + '/operate/seatmodify',
    seat_project:API_PRE + '/operate/seatmodify',
    seat_search:API_PRE + '/teltraffic/search',
    seat_traffic:API_PRE + '/teltraffic/list',
}