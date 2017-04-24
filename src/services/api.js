const API_PRE = process.env.NODE_ENV == 'production' ? '' : '/api'
export default {
    login: API_PRE + '/user/login',
    logout: API_PRE + '/user/logout',
    customer_info: API_PRE + '/customer/allinfo',
    customer_alarm: API_PRE + '/customer/balancealarm',
    update_pass: API_PRE + '/user/modifypwd',
    operate_list: API_PRE + '/operation/list',
    operate_addagent: API_PRE + '/operate/addagent',
    operate_getagent: API_PRE + '/operate/getagent',
    operate_upagent: API_PRE + '/operate/modifyagin',
    operate_pwdagent: API_PRE + '/operate/modifypwd',
    operate_expire_seat_list: API_PRE + '/operate/expireseat',
    operate_active_seat: API_PRE + '/seat/recharge',
    agent_list: API_PRE + '/operate/aginuserinfo',
    reset_operate_pass: API_PRE + '/operation/changePwd',
    create_operate: API_PRE + '/operation/add',
    update_operate: API_PRE + '/operation/modifyinfo',
    customer_list: API_PRE + '/agent/list',
    customer_list_all: API_PRE + '/customer/all',
    customer_list_by_operate: API_PRE + '/operate/list',
    customer_type_list: API_PRE + '/operate/usertype',
    customer_add: API_PRE + '/agent/add',
    customer_modify: API_PRE + '/agent/modify',
    customer_detail: API_PRE + '/agent/agininfo',
    agent_my_info: API_PRE + '/agent/info',
    agent_modify_myinfo: API_PRE + '/agent/modifyself',
    customer_detail_by_operate: API_PRE + '/operate/agentinfo',
    customer_edit: API_PRE + '/agent/modifyinfo',
    customer_upself: API_PRE + '/customer/modify',
    customer_check: API_PRE + '/operate/examine',
    customer_renew_seat: API_PRE + '/customer/renewseatinfo',
    angent_list_all: API_PRE + '/operate/agent',
    add_seat: API_PRE + '/operate/seatmodify',
    recharge: API_PRE + '/operate/recharge',
    project_status: API_PRE + '/project/status',
    project_list: API_PRE + '/project/list',
    project_stop: API_PRE + '/project/pause',
    project_start: API_PRE + '/project/start',
    project_detail: API_PRE + '/project/detail',
    preject_audit: API_PRE + '/project/audit',
    project_recheck: API_PRE + '/project/againaudit',
    expense_project: API_PRE + '/operate/chargingproject',
    expense_project_user: API_PRE + '/operate/charginuser',
    expense_project_agent: API_PRE + '/operate/chargingagent',
    expense_seat: API_PRE + '/operate/chargingseat',
    expense_seat_count: API_PRE + '/operate/chargingseatcount',
    expense_seat_agent: API_PRE + '/operate/chargingagentseat',
    expense_balance_in: API_PRE + '/customer/recharge',
    expense_balance_out: API_PRE + '/customer/consume',
    customer_expense_project: API_PRE + '/customer/chargingproject',
    customer_seat: API_PRE + '/customer/chargingseat',
    customer_seat_count: API_PRE + '/customer/chargingseatcount',
    customer_my_seat_list: API_PRE + '/customer/seat',
    project_type_list: API_PRE + '/project/type',
    project_add: API_PRE + '/project/create',
    project_call_list: API_PRE + '/seat/outbound',
    project_call_modify: API_PRE + '/seat/modify',
    project_clue_info: API_PRE + '/seat/clueinfo',
    seat_list: API_PRE + '/project/seatlist',
    seat_binding: API_PRE + '/project/binding',
    seat_status: API_PRE + '/seat/status',
    seat_tobind: API_PRE + '/project/bindingSeat',
    call_list: API_PRE + '/teltraffic/list',
    call_cate: API_PRE + '/teltraffic/category',
    call_head: API_PRE + '/teltraffic/heads',
    //call_export : API_PRE + '/teltraffic/export',
    get_seat_sign: API_PRE + '/callCenter/getSignInData',
    save_call_uuid: API_PRE + '/callCenter/saveCallUuid',
    add_call_job: API_PRE + '/callCenter/addJob',
    doc_list: API_PRE + '/doc/list',
    doc_upload: API_PRE + '/doc/upload',
    doc_download: API_PRE + '/doc/download'
}
