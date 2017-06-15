let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    return [
        {
            code: 202001,
            name: '金融'
        },
        {
            code: 202002,
            name: '房产'
        },
        {
            code: 202003,
            name: '教育培训'
        },
        {
            code: 202004,
            name: '汽车'
        },
        {
            code: 202005,
            name: '商旅'
        },
        {
            code: 202006,
            name: '生活服务'
        }
    ]
}