let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return Mock.mock({
            "effect_call_times": 201,
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
            "effect_call_rate": 66,
            "seat_num": 8
    })
}
