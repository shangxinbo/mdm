let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "count": {
            "projectNumTotal": "@int(0,100)",
            "projectStatusIngTotal": "@int(0,100)",
            "clueNumTotal": "@int(1000,10000)",
            "oddNumTotal": "@int(1000,10000)",
            "connectNumTotal": "@int(1000,10000)",
            "clueValidPercent": "@int(1000,10000)",
            "hangUpSms":"@int(1000,10000)",
            "leftInfo":"@int(1000,10000)",
        },
        "page": {
            "total": 100
        },
        "data|10": [
            {
                "id": '@natural',
                "client_id":'@natural',
                "client_name": "@cname",
                "outbound_task_id": "@int(0,10)",
                "name": "@ctitle",
                "region": "@city",
                "expect_clue_num": "@int(1000,10000)",
                "expect_begin_time": 1490630400,
                "desc": "@ctitle",
                "type": 1,
                "total_start_time": "",
                "last_pause_time": null,
                "audit_status": '@int(-3,3)',
                "audit_reason": "",
                "auditor": 11,
                "status": '@int(-3,3)',
                "clue_num": 1000,
                "clue_push_time": '@date("yyyy-MM-dd HH:mm:ss")',
                "created_clue_time": '@date("yyyy-MM-dd HH:mm:ss")',
                "expire_time": '@date("yyyy-MM-dd HH:mm:ss")',
                "gdata_client": "@name",
                "deleted_at": null,
                "created_at": '@date("yyyy-MM-dd HH:mm:ss")',
                "updated_at": '@date("yyyy-MM-dd HH:mm:ss")',
                "project_status": "项目状态",
                "project_type": "进行中",
                "project_seat_num": 2,
                "call_time": "0天3时51分",
                "odd_time": "0天3时51分7秒",
                "clue_valid_percent": "33.33",
                "clue_connect_num": 1,
                "clue_odd_num": 998,
                "agency": "代理1",
                "agency_id": 123,
                "hangUpSms":123,
                "leftInfo":123,
                "is_hang_up_message":'@int(0,1)',
                "undistributed":'@int(0,1000)',
                "client_is_hang_up_message":'@int(0,1)',
                "have_nodial_clues":'@int(0,1)'
            }
        ]
    })
}