let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "data|10": [
            {
                "id": '@natural',
                "user": '@ctitle',
                "user_name": '@ctitle',
                "expire_time": '@date("yyyy-MM-dd HH:mm:ss")',
                "created_at": '@date("yyyy-MM-dd HH:mm:ss")',
                "superior_id":"@int(0,100)"
            }
        ],
        "next_expire": "2017-05-17 23:59:59",
        "price": 250
    })
}