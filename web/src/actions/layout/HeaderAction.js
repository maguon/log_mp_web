import {HeaderActionType} from '../../actionTypes';
import {apiHost} from '../../config/HostConfig';

const sysConst = require('../../util/SysConst');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');

export const getUserDetail = (params) => async (dispatch) => {
    try {
        // admin用户 检索 URL
        const url = apiHost + '/api/admin/' + params.userId;

        // 发送 get 请求
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: HeaderActionType.getUserInfo, payload: res.result[0]})
        } else if (res.success === false) {
            swal('查询失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// export const checkUser = () => {
// };

export const logout = () => async () => {
    swal({
        title: "注销账号",
        text: "是否确认退出登录",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            localUtil.removeSessionStore(sysConst.USER_ID);
            localUtil.removeSessionStore(sysConst.USER_TYPE);
            localUtil.removeSessionStore(sysConst.AUTH_TOKEN);
            window.location.href = '/login.html';
        }
    });
};