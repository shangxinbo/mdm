let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return Mock.mock({
        "effect_call_times": 201,
        "charge_time": "4分钟",
        "avg_time": "4分钟",
        "effect_call_rate": 66,
        "seat_num": 8
    })
}
