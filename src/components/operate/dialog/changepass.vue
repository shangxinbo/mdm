<template>
    <div class="dialog" id="resetPassword">
        <a href="javascript:void(0);" class="icon dialog-close" title="关闭"></a>
        <div class="dialog-header">
            <h4>重置密码</h4>
        </div>
        <div class="dialog-body">
            <ul class="query-warp">
                <li>
                    <label>账号</label>
                    <div class="input-warp">
                        <input class="text" type="text" value="alinea">
                    </div>
                </li>
                <li>
                    <label>新密码</label>
                    <div class="input-warp">
                        <input class="text" type="text" value="">
                    </div>
                </li>
                <li>
                    <label>确认密码</label>
                    <div class="input-warp">
                        <input class="text" type="text" value="">
                    </div>
                </li>
            </ul>
        </div>
        <div class="dialog-footer">
            <a class="btn blue" href="javascript:void(0);" onclick="getWindow('resetPasswordSucc','tips-succ');">确定</a>
            <a class="btn" href="javascript:void(0);" onclick="hideDialog('resetPassword');">取消</a>
        </div>
    </div>
</template>