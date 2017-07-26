let Mock = require('mockjs')
let Random = Mock.Random
module.exports = function (req, res) {
    let param = req.body
    let page = param.page ? param.page : 1
    return Mock.mock({
        "rows": {
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
                    "client_id": '@natural',
                    "client_name": '@ctitle',
                    "name": '@ctitle',
                    "content": '@ctitle',
                    "url": "http://bd.kuwo.cn/yinyue/2773010?from=baidu",
                    "sign": '@ctitle',
                    "channel": "",
                    "type": 1,       //短信类型: 1挂机短信,2营销短信
                    "status": '@int(1,3)',    //模板状态: 1审核中,2使用中,3已禁用
                    "preview_content": '@ctitle',
                    "sms_account": "",
                    "sms_key": "",
                    "channel_extend": "",
                    "operate_id": '@natural',
                    "created_at": '@date("yyyy-MM-dd HH:mm:ss")',
                    "updated_at": '@date("yyyy-MM-dd HH:mm:ss")',
                    "channel_name": ""
                }
            ]
        },
        "total_all": Random.int(1000),
        "tatal_use": Random.int(100)
    })
}