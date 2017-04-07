let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "waring": "@boolean"   //返回true 就是该充值了  false 余额比预警值高
    })
}
