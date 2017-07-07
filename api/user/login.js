
module.exports = function (req, res) {
    var param = req.body
    if (!param.username) {
        return 'username null'
    }
    if (!param.password) {
        return 'password null'
    }
    return {
        "id": 1,
        "user": "shangxinbo",
        "user_name": "shangxinbo",
        "nick_name": "尚新波",
        "tel": "18612119498",
        "mail": "314911714@qq.com",
        "type": "4",  //账号类型：超管、运营、代理、客户、座席
        "status": 0,   //用户状态
        "modify_status":1,
        "rule":'1,2,3,4,5'
    }
}