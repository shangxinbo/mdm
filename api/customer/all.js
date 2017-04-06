let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return Mock.mock({
        "1": "用户1",
        "2": "用户2",
        "3": "用户3",
        "4": "用户4"
    })
}