let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    let data = Mock.mock({
        "data|10": [
            {
                "id": '@natural',
                "name": '@ctitle',
                "preview_content": '@ctitle'
            }
        ]
    })
    return data.data
}