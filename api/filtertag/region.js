let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let s = Mock.mock({
        "data|30": [
            {
                "code": '@natural(10000,100000)',
                "name": '@city',
                "num":'@int(0,100000)'
            }
        ]
    })
    return s.data
}