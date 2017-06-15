let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return Random.int(0,10000000)
}