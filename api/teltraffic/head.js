let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return Mock.mock({
        "data": 
            {
                "effect_call_times" : "@int(0,1000)",
                "charge_time" : "@int(0,1000)",
                "avg_time" : "@int(0,1000)",
                "effect_call_rate" : "@int(0,100)",
                "seat_num" : "@int(1,10)",
            }
    
    })
}
