let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    let data = Mock.mock({
        "data|4": [
            {
                "id": '@natural',
                "updated_at": '@date("yyyy-MM-dd HH:mm:ss")',
                "call_time": '@date("yyyy-MM-dd HH:mm:ss")',
                "charge_time": '@date("yyyy-MM-dd HH:mm:ss")',
                "remarks": '@ctitle',
                "dial_result_first": '@cword',
                "dial_result_second": '@cword',
                "telephone_crypt":'@natural'
            }
        ]
    })
    return data.data
}