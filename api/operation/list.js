let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "total": 100,
        "per_page": 10,
        "current_page": page,
        "last_page": 3,
        "next_page_url": "http://sms.geotmt.com/users/list?page=3",
        "prev_page_url": "http://sms.geotmt.com/users/list?page=1",
        "from": 2,
        "to": 2,
        "data|10": [
            {
                "id": '@natural',
                "user": '@word',
                "user_name": '@cname',
                "nickname": '@cname',
                "mail": "@email",
                "tel": "18923156486",
                "rule":"客户管理",
                "created_at": '@date("yyyy-MM-dd HH:mm:ss")'
            }
        ]
    })
}