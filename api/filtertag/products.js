let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let s = Mock.mock({
        "data|10": [
            {
                "code": '@natural',
                "name": '@ctitle'
            }
        ]
    })
    return s.data
}