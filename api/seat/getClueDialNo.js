let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
        return Mock.mock({
        "total": 100,
        "per_page": 10,
        "current_page": page,
        "last_page": 3,
        "next_page_url": "http://sms.geotmt.com/agent/list?page=3",
        "prev_page_url": "http://sms.geotmt.com/agent/list?page=1",
        "from": 2,
        "to": 2,
        "data|10": [
            {
                "id": '@natural',
                "project_id": 119,
                "seat_id": 205,
                "telephone_crypt": '@natural',
                "city":'@city()',
                "call": "",
                "dial_num": 0,
                "connect_num": 0,
                "updated_at":'@date("yyyy-MM-dd HH:mm:ss")',
                "call_time": 0,
                "charge_time": 0,
                "remarks": "",
                "dial_result_first": "失败",
                "dial_result_second": "拒绝",
                "distribution_date": '@date("yyyy-MM-dd HH:mm:ss")'
            }
        ]
    })
}