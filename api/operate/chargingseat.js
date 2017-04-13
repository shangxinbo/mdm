let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "seat_num": "@int(0,100)",
        "seat_price": "@int(0,100)",
        "data": {
            "total": 100,
            "per_page": 10,
            "current_page": 1,
            "last_page": 4,
            "next_page_url": "http://mdm.geotmt.com/operate/chargingseat?page=2",
            "prev_page_url": null,
            "from": 1,
            "to": 2,
            "data|10": [{
                "id": '@natural',
                "company": "@cname", //客户名称
                "superior_id": "@int(0,100)", //所属代理id
                "seat_price": 200,
                "ask_time": '@date("yyyy-MM-dd HH:mm:ss")',  //开通日期
                "seat_num": 2,
                "price": "@int(0,100)", //坐席单价
                "months": 1,
                "stop_time": '@date("yyyy-MM-dd HH:mm:ss")',  //失效日期
                "name": "smallldaili", //所属代理名
                "cost": 400   //开通费用
            }]
        }
    })
}
