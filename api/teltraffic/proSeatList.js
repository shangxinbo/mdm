let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "count": {
            "call_num": 51,              //呼叫次数
            "effect_call_num": 28,       //拨通次数
            "effect_call_rate": 54.9,    //拨通率
            "call_time": "0天0时28分",   //拨通时长
            "avg_call_time": "0天0时1分" //平均时长
        },
        "list":{
            "total": 120,
            "per_page": 15,
            "current_page": 1,
            "last_page": 1,
            "next_page_url": null,
            "prev_page_url": null,
            "from": 1,
            "to": 1,
            "data|10": [
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
        }
    })
}