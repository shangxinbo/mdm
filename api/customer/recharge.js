let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "total": 100,
        "per_page": 10,
        "current_page": 1,
        "last_page": 3,
        "next_page_url": "http://mdm.geotmt.com/customer/recharge?page=2",
        "prev_page_url": null,
        "from": 1,
        "to": 1,
        "data|10": [{
            "id": '@natural',
            "date": '@date("yyyy-MM-dd HH:mm:ss")',  //消费日期
            "recharge_cost": "@int(0,100)",   //消费类型
            "recharge_before_balance": "@int(0,100)", //消费金额
            "recharge_after_balance": "@int(0,100)"   //消费前金额
        }]
    })
}
