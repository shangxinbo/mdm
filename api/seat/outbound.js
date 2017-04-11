let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
        return Mock.mock({
        "total": 100,
        "per_page": 10,
        "current_page": page,
        "last_page": 3,
        "next_page_url": "http://sms.geotmt.com/agent/list?page=3",
        "prev_page_url": "http://sms.geotmt.com/agent/list?page=1",
        "from": 2,
        "to": 2,
        "data|10": [
            {
                "id": '@natural',
                "project_id": '@natural',
                "seat_id":'@natural',
                "telephone": '18612119498',
                "distribution_date": '@date("yyyy-MM-dd HH:mm:ss")',
                "is_dial": '@int(0,1)',
                "dial_status": '@int(0,8)',
                "telephone_crypt": '186****9498'
            }
        ]
    })
}