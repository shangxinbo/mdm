let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let code = param.code.toString()
    switch (code) {
        case '202001':
            return [
                {
                    "code": '20200100100',
                    "name": '信用卡',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200100200',
                    "name": '投资理财',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200100300',
                    "name": '保险',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200100400',
                    "name": '投资移民',
                    "num": Random.int(0, 100000)
                }
            ]
        case '202002':
            return [
                {
                    "code": '20200200100',
                    "name": '租房',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200200200',
                    "name": '新房',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200200300',
                    "name": '园区写字楼',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200200400',
                    "name": '家装',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200200500',
                    "name": '二手房',
                    "num": Random.int(0, 100000)
                }
            ]
        case '202003':
            return [
                {
                    "code": '20200300100',
                    "name": '少儿英语 ',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200300200',
                    "name": '成人英语',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200300300',
                    "name": '出国留学',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200300400',
                    "name": 'K12教育',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200300500',
                    "name": '职业教育',
                    "num": Random.int(0, 100000)
                }
            ]
        case '202004':
            return [
                {
                    "code": '20200400100',
                    "name": '新车 ',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200400200',
                    "name": '二手车 ',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200400300',
                    "name": '驾驶培训 ',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200400400',
                    "name": '保养维修',
                    "num": Random.int(0, 100000)
                }
            ]
        case '202005':
            return [
                {
                    "code": '20200500100',
                    "name": '商旅出行  ',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200500200',
                    "name": '境外游 ',
                    "num": Random.int(0, 100000)
                }
            ]
        case '202006':
            return [
                {
                    "code": '20200600100',
                    "name": '求职',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200600200',
                    "name": '婚恋交友',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200600300',
                    "name": '家政服务',
                    "num": Random.int(0, 100000)
                },
                {
                    "code": '20200600400',
                    "name": '母婴亲子',
                    "num": Random.int(0, 100000)
                }
            ]
    }
}