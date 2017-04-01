<template>
    <div class="dialog" id="resetEdit">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭"></a>
        <div class="dialog-header">
            <h4>修改信息</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>账号</label>
                    <div class="input-warp">
                        <input class="text disabled" type="text" value="CCCWWW1" disabled="disabled">
                    </div>
                </li>
                <li>
                    <label>姓名</label>
                    <div class="input-warp">
                        <input class="text" type="text" value="alinea">
                    </div>
                </li>
                <li>
                    <label>邮箱</label>
                    <div class="input-warp">
                        <input class="text" type="email" value="zhangsan@133.com">
                    </div>
                </li>
                <li>
                    <label>手机号</label>
                    <div class="input-warp">
                        <input class="text" type="text" value="13811145569">
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" onclick="getWindow('resetEditSucc','tips-succ');">确定</a>
            <a class="btn" href="javascript:void(0);" onclick="hideDialog('resetEdit');">取消</a>
        </div>
    </div>
</template>