let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let code = param.code.toString()
    switch (code) {
        case '203001':
            return [
                {
                    "code": '20300100100',
                    "name": '美团外卖',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300100200',
                    "name": '百度外卖',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300100300',
                    "name": '饿了么',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300100400',
                    "name": '口碑外卖',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203002':
            return [
                {
                    "code": '20300200100',
                    "name": '天猫',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300200200',
                    "name": '淘宝',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300200300',
                    "name": '京东',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300200400',
                    "name": '苏宁易购',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300200500',
                    "name": '一号店',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203003':
            return [
                {
                    "code": '20300300100',
                    "name": '蜜芽 ',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300300200',
                    "name": '贝贝特卖',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300300300',
                    "name": '麦乐购',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300300400',
                    "name": '妈妈100',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300300500',
                    "name": '母婴之家',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203004':
            return [
                {
                    "code": '20300400100',
                    "name": '网易考拉海购',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300400200',
                    "name": 'HIGO',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300400300',
                    "name": '达令全球好货',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300400400',
                    "name": '小红书',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203005':
            return [
                {
                    "code": '20300500100',
                    "name": '腾讯视频',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300500200',
                    "name": '优酷视频',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203006':
            return [
                {
                    "code": '20300600100',
                    "name": 'QQ音乐',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300600200',
                    "name": '酷我音乐',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300600300',
                    "name": '酷狗音乐',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300600400',
                    "name": '多米音乐',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203007':
            return [
                {
                    "code": '20300700100',
                    "name": '猫眼电影',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300700200',
                    "name": '娱票儿',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300700300',
                    "name": 'QQ电影票',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300700400',
                    "name": '时光网',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203008':
            return [
                {
                    "code": '20300800100',
                    "name": '掌阅iReader',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300800200',
                    "name": 'qq阅读',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300800300',
                    "name": '懒人听书',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300800400',
                    "name": '起点读书',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203009':
            return [
                {
                    "code": '20300900100',
                    "name": '滴滴出行',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300900200',
                    "name": '神州租车',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300900300',
                    "name": 'Uber优步',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20300900400',
                    "name": '易到用车',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203010':
            return [
                {
                    "code": '20301000100',
                    "name": 'Booking',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20301000200',
                    "name": 'Agoda',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20301000300',
                    "name": '途家',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20301000400',
                    "name": '如家',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203011':
            return [
                {
                    "code": '20301100100',
                    "name": '车轮社区',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20301100200',
                    "name": '途虎养车',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20301100300',
                    "name": '车主无忧',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20301100400',
                    "name": '赶集易洗车',
                    "num": Random.int(0, 100000)
                }
            ]
        case '203012':
            return [
                {
                    "code": '20301200100',
                    "name": '携程网',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20301200200',
                    "name": '去哪儿网',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20301200300',
                    "name": '艺龙旅行网',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20301200400',
                    "name": '淘宝旅行',
                    "num": Random.int(0, 100000)
                }
            ]
    }
}