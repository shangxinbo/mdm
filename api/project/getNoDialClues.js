let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return Mock.mock([
        {
            "id": Random.int(0, 10),
            "name": Random.cname(),
            "num": Random.int(0,1000)
        },
        {
            "id": Random.int(0, 10),
            "name": Random.cname(),
            "num": Random.int(0,1000)
        },
        {
            "id": Random.int(0, 10),
            "name": Random.cname(),
            "num": Random.int(0,1000)
        },
        {
            "id": Random.int(0, 10),
            "name": Random.cname(),
            "num": Random.int(0,1000)
        }
    ])
}