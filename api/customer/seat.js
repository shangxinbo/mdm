let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "exist_seat": "@int(0,100)", //开通数量
        "expire_seat": "@int(0,100)", //开通数量
        "seat": {
            "total": 50,
            "per_page": 15,
            "current_page": 1,
            "last_page": 4,
            "next_page_url": "http://mdm.geotmt.com/customer/seat?page=2",
            "prev_page_url": null,
            "from": 1,
            "to": 15,
            "data|10": [{
                "id": '@natural',
                "user": "@title",
                "status": '@date("yyyy-MM-dd HH:mm:ss")', //开通日期
                "user_name": "@cname", //开通坐席数
                "open_month": "@int(0,10)", //开通月数
                "expire_time": '@date("yyyy-MM-dd HH:mm:ss")', //失效日期
                "created_at": '@date("yyyy-MM-dd HH:mm:ss")'
            }]
        }
    })
}