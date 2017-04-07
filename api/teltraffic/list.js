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
            "clueValidPercent": "@int(1000,10000)"
        },
        "page": {
            "total": 100
        },
        "data|10": [
            {
                "id": '@natural',
                "name": "@ctitle",
                "client_id":'@natural',
                "client": "@cname",
                "agency_id": "@int(0,100)",
                "agency" : "@cname",
                "call_times": "@int(0,1000)",
                "effect_call_times" : "@int(0,1000)",
                "charge_time" : "@int(0,1000)",
                "avg_time" : "@int(0,1000)",
                "effect_call_rate" : "@int(0,100)",
                "uneffect_call_rate" : "@int(0,100)",
                "uneffect_call_times" : "@int(0,1000)",
                "seat_num" : "@int(1,10)",
            }
        ]
    })
}