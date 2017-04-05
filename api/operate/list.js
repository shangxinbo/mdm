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
                    "balance": "@int(0,100)",
                    "conduct_project":"@int(0,100)",
                    "seat_num":"@int(0,10)",
                    "created_at": '@date("yyyy-MM-dd HH:mm:ss")'
                }
            ]
        }
    })
}