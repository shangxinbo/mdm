let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "count": 10,
        "list|10": [
            {
                "id": '@natural',
                "created_at": "@ctitle",
                "dial_status": '@int(1,10)',
                "telephone_crypt": "ca6b594c5feb0d33",
                "file_mp3_url": "http://61.182.143.234/mp3.9ku.com/m4a/66985.m4a?@int(1,100)",
                "file_down_url": "http://61.182.143.234/mp3.9ku.com/m4a/66985.m4a",
                "call_time": "0分钟"
            }
        ]
    })
}