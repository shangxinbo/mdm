let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return Mock.mock({ "1": "电商", "2": "网销", "3": "大数据" })
}