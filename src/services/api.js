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
    get_operate_info: API_PRE + '/operation/modifyinfo',
    update_operate: API_PRE + '/operation/operationmodifyinfomessage',
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
    project_set_sms: API_PRE + '/project/start_gj_sms',
    project_get_nodial_clues: API_PRE + '/project/getNoDialClues',
    project_recovery_clues: API_PRE + '/project/recoverClues',
    seat_list: API_PRE + '/project/seatlist',
    seat_binding: API_PRE + '/project/binding',
    seat_status: API_PRE + '/seat/status',
    seat_tobind: API_PRE + '/project/bindingSeat',
    call_list: API_PRE + '/teltraffic/list',
    call_cate: API_PRE + '/teltraffic/category',
    call_head: API_PRE + '/teltraffic/heads',
    call_audio: API_PRE + '/teltraffic/proSeatList',
    call_phone_audio: API_PRE + '/teltraffic/proSeatPhoneList',
    call_audio_export: API_PRE + '/teltraffic/proSeatList_export',
    call_audio_phone_export: API_PRE + '/teltraffic/proSeatPhone_export',
    get_seat_sign: API_PRE + '/callCenter/getSignInData',
    save_call_uuid: API_PRE + '/callCenter/saveCallUuid',
    add_call_job: API_PRE + '/callCenter/addJob',
    doc_list: API_PRE + '/doc/list',
    doc_upload: API_PRE + '/doc/upload',
    doc_download: API_PRE + '/doc/download',
    get_myclient_balance: API_PRE + '/seat/balance',
    get_tel: API_PRE + '/seat/getseatphone',
    get_tel_prefix: API_PRE + '/callCenter/getPhonePrefix',
    filter_product_1: API_PRE + '/filtertag/products',
    filter_product_2: API_PRE + '/filtertag/product',
    filter_prefer_1: API_PRE + '/filtertag/preferences',
    filter_prefer_2: API_PRE + '/filtertag/preference',
    filter_area: API_PRE + '/filtertag/region',
    filter_customers: API_PRE + '/filtertag/selectnumber',
    filter_save: API_PRE + '/filtertag/save',
    get_login_status: API_PRE + '/user/status',
    change_price: API_PRE + '/operate/modifyprice',
    dial_pre: API_PRE + '/seat/changestatus',
    save_dial_history: API_PRE + '/callCenter/saveTelephoneRecord',
    no_sms_template_customer: API_PRE + '/sms/no_client_list',
    sms_record_list: API_PRE + '/sms/record_list',
    sms_record_export: API_PRE + '/sms/record_list_export',
    sms_template_list: API_PRE + '/sms/template_list',
    sms_template_add: API_PRE + '/sms/template_save',
    sms_template_detail: API_PRE + '/sms/template_find',
    sms_client_list: API_PRE + '/sms/client_select',
    seat_list_by_project: API_PRE + '/project/getSeatByProject',
    left_info_list: API_PRE + '/sms/capital_list'
}
