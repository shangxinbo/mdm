let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return Mock.mock({
        "id": 1,
        "client_id": 1,
        "client_name": "kehu",
        "outbound_task_id": 1,
        "name": "姓名名称",
        "region": "全国",
        "expect_clue_num": 100,
        "expect_begin_time": 1490630400,
        "desc": "项目描述",
        "type": 1,
        "total_start_time": "",
        "last_pause_time": null,
        "audit_status": 0,
        "audit_reason": "啦啦啦啦阿联",
        "auditor": 11,
        "status": 1,
        "clue_num": 1000,
        "clue_push_time": "2017-03-27 15:09:27",
        "created_clue_time": "2017-03-28 15:09:27",
        "expire_time": "2017-03-30 15:09:27",
        "gdata_client": "duanfeng",
        "expect_begin_date":"2017-03-28",
        "deleted_at": null,
        "created_at": "2017-03-28 15:09:27",
        "updated_at": "2017-03-28 15:09:27",
        "project_status": "项目状态",
        "project_type": "项目类型",
        "project_seat_num": 2,
        "call_time": "0天3时51分",
        "odd_time": "0天3时51分7秒",
        "clue_valid_percent": "33.33",
        "clue_connect_num": 1,
        "clue_odd_num": 998,
        "agency": "代理1",
        "agency_id": 123,
        "is_hang_up_message":1,       
        "hang_up_message_num":200       
    })
}