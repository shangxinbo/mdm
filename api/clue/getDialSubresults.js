let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let pid = param.pid
    if (pid) {
        let data = {}
        if (pid == 1) {
            data = {
                "1": "有意向-销售机会",
                "2": "有意向-条件不符",
                "3": "其他"
            }
        }else if (pid==2){
            data = {
                "4": "4",
                "5": "5-条件不符",
                "6": "6"
            }
        }else{
            data = {
                "7": "7",
                "8": "8-条件不符",
                "9": "9"
            }
        }

        return Mock.mock(data)
    } else {
        return ''
    }

}
