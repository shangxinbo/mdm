let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    var obj = {}
    for(let i=0;i<10;i++){
        obj[i] = Random.cname()
    }
    return Mock.mock(obj)
}