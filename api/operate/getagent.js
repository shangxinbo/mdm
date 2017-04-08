let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "id": '@natural',
        "user": '@ctitle',
        "name": "大森林公司",  //代理名称
        "user_name": '@ctitle',
        "mail": "@email",
        "tel": "18923156486",
        "regoin": "狗熊了",
        "application_addr": "我的老家在东北",
        "created_at": '@date("yyyy-MM-dd HH:mm:ss")'
    })
}
