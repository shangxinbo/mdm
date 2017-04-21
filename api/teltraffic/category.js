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
                "client_id":'@natural',
                "client_name": "@cname",
                "call_times": "@int(0,1000)",
                "effect_call_times" : "@int(0,1000)",
                 "charge_time" :  {
                    'hour' : "@int(0,12)",
                    'day'  : "@int(0,12)",
                    'min'  : "@int(0,12)",
                    },
                "avg_time" : {
                    'hour' : "@int(0,12)",
                    'day'  : "@int(0,12)",
                    'min'  : "@int(0,12)",
                    },
                "effect_call_rate" : "@int(0,100)",
                "uneffect_call_rate" : "@int(0,100)",
                "uneffect_call_times" : "@int(0,1000)",
                "seat_num" : "@int(1,10)",
                "seat_id" : "@int(10000,100000)",
            }
        ]
    })
}