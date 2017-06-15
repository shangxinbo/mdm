let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return [
        {
            "name": "购物",
            "code": "2031",
            "list": [
                { "code": "203001", "name": "外卖团购" },
                { "code": "203002", "name": "综合商城" },
                { "code": "203003", "name": "母婴用品" },
                { "code": "203004", "name": "海淘" }
            ]
        },
        {
            "name": "休闲娱乐",
            "code": "2032",
            "list": [
                { "code": "203005", "name": "视频" },
                { "code": "203006", "name": "音乐" },
                { "code": "203007", "name": "票务演出" },
                { "code": "203008", "name": "阅读" }
            ]
        },
        {
            "name": "商旅出行",
            "code": "2033",
            "list": [
                { "code": "203009", "name": "打车" },
                { "code": "203010", "name": "酒店" },
                { "code": "203011", "name": "汽车保养" },
                { "code": "203012", "name": "综合旅游" }
            ]
        }
    ]
}