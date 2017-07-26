let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function(req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "clue_charging": "@int(0,100)",
        "call_charging": "@int(0,100)",
        "message_charging":23.1,  //挂机短信计费合计
        "charging": {
            "total": 100,
            "per_page": 10,
            "current_page": page,
            "last_page": 3,
            "next_page_url": "http://mdm.geotmt.com/operate/chargingproject?page=2",
            "prev_page_url": null,
            "from": 1,
            "to": 1,
            "data|10": [{
                "id": '@natural',
                "name": "@cname", //项目名称
                "client_id": "@int(0,100)", //用户id
                "agency_id": "@int(0,100)",   //代理id
                "company": "@cname", //客户名称
                "type": "信用卡", //类型
                "created_at": '@date("yyyy-MM-dd HH:mm:ss")',
                "status": "项目状态", //状态
                "agent_name": "@cname", //代理名称
                "clue_charging": "@int(0,100)", //线索费用
                "call_charging": "@int(0,100)", //通话费用
                "message_charging":23.1,  //挂机短信计费合计
            }]
        }
    })
}
