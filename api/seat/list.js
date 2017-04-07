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
                "name": '@ctitle',
                "call_times":'@ctitle',
                "effect_call_times": '@int(0,2)',
                "effect_call_rate": "@int(0,100)",
                "uneffect_call_times": '@int(0,100)',
                "uneffect_call_rate": '@int(0,100)',
                "charge_time": '@date("yyyy-MM-dd HH:mm:ss")',
                "avg_time": '@date("yyyy-MM-dd HH:mm:ss")',
            }
        ]
    })
}