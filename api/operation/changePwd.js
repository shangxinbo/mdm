
module.exports = function (req, res) {
    var param = req.body
    if (!param.id) {
        return 'id null'
    }
    if (!param.new_pwd) {
        return 'new_pwd null'
    }
    if (!param.confirm_pwd) {
        return 'confirm_pwd null'
    }
    return {}
}