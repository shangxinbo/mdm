module.exports = function (req, res) {
    return {
        "id": 54,
        "telephone": "13811000053",
        "project_id": 1,
        "dial_status": 0,    //拨打结果 拨打状态 1已接通 2空号 3错号 4停机 5关机 6占线 7无人接听 8其他未接通
        "clue_status": 0,     //线索状态 0未完成 1 完成
        "remarks": "asdfasdf",         //备注
        "name": "项目名称",   //项目名称
        "telephone_crypt": "138****0053" //加密电话}
    }
}