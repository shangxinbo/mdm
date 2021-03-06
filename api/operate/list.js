let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "customer_num": 2,
        "conduct_project": 3,
        "seat_num": 2,
        "customer": {
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
                    "company": '@ctitle',
                    "type": '@ctitle',
                    "agent_name": "@cname",    //代理名词
                    "audit_status": '@int(0,2)',
                    "audit_advice":"@ctitle",
                    "balance": "@int(0,100)",
                    "superior_id": "@int(0,100)",   //代理id
                    "conduct_project":"@int(0,100)",
                    "seat_num":"@int(0,10)",
                    "expire_seat_num":"@int(0,1)",
                    "is_hang_up_message": "@int(0,1)",   //是否开启挂机短信
                    "seat_price":"200",
                    "tel_price": "12",
                    "clue_price":"1",
                    "hang_up_message_price":"123",
                    "created_at": '@date("yyyy-MM-dd HH:mm:ss")',
                    "balance_alarm":123
                }
            ]
        }
    })
}