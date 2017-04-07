let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "id": '@natural',
        "user": '@name',
        "company": '@ctitle',
        "type": "汽车",
        "audit_status": 1,
        "balance_alarm": 0,
        "audit_advice": "",
        "balance":123,
        "legal": "小狗",
        "scope": "答复",
        "store_addr": "xiamin",
        "licence": "@url",
        "qualification": "@url",
        "user_name": '@email',
        "nickname": '@cname',
        "mail": "@email",
        "tel": "18923156486",
        "location": "dsfgfdg",
        "regoin": "狗熊了",
        "application_addr": "我的老家在东北",
        "created_at": '@date("yyyy-MM-dd HH:mm:ss")'
    })
}