let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "page": 10,
        "data|10": [
            {
                "id": '@natural',
                "name": "@ctitle",
                "client_name": "@cname",
                "client_id": "@int(0,100)",
                "agency_id": "@int(0,100)",
                "agency_name": "@cname",
                "call_times": "@int(0,1000)",
                "effect_call_times": "@int(0,1000)",
                "charge_time": "4分钟",
                "avg_time": "4分钟",
                "effect_call_rate": "@int(0,100)",
                "uneffect_call_rate": "@int(0,100)",
                "uneffect_call_times": "@int(0,1000)",
                "seat_num": "@int(1,10)",
                "message_num": 1000, //挂机短信数，
                "info_num": 0  //留资数
            }
        ]
    })
}