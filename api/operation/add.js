module.exports = function (req, res) {
    var param = req.body
    if (!param.user) {
        return 'id null'
    }
    if (!param.user_name) {
        return 'user_name null'
    }
    if (!param.mail) {
        return 'mail null'
    }
    if (!param.tel) {
        return 'tel null'
    }
    return {}
}