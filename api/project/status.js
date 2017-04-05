let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return Mock.mock([
      {"code":0,"desc":"准备中"},
      {"code":1,"desc":"进行中"},
      {"code":2,"desc":"已暂停"},
      {"code":3,"desc":"已结束"}
  ])
}