let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let code = param.code[0]
    let s = Mock.mock({
        "data|10": [
            {
                "code": code + '@natural(10000,100000)',
                "name": '@ctitle',
                "num":'@int(0,100000)'
            }
        ]
    })
    return s.data
}