let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "1": "失败",
        "2": "待跟进",
        "3": "成功"
    })
}
