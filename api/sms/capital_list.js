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
        "next_page_url": "http://sms.geotmt.com/agent/list?page=3",
        "prev_page_url": "http://sms.geotmt.com/agent/list?page=1",
        "from": 2,
        "to": 2,
        "data|10": [
            {
                "project_id":'@natural',
                "telephone": '@natural',
                "email": '@email',
                "name": '@cname',
                "extend": "",  //扩展字段，json格式
                "created_at": '@date("yyyy-MM-dd HH:mm:ss")',
                "updated_at": '@date("yyyy-MM-dd HH:mm:ss")'
            }
        ]
    })
}