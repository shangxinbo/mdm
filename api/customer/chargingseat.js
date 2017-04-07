let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function(req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "count":"@int(0,100)", //开通数量
        "page": {
            "total": 100 //分页信息
        },
        "data|10": [{
            "id": '@natural',
            "client_id": "@int(0,100)",
            "ask_time": '@date("yyyy-MM-dd HH:mm:ss")', //开通日期
            "seat_num": "@int(0,100)", //开通坐席数
            "price": "@int(0,100)", //坐席单价
            "months": 1, //开通月数
            "stop_time": '@date("yyyy-MM-dd HH:mm:ss")', //失效日期
            "created_at": '@date("yyyy-MM-dd HH:mm:ss")',
            "updated_at": '@date("yyyy-MM-dd HH:mm:ss")',
            "cost": 1200 //开通费用
        }]
    })
}
