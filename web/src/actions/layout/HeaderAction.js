import {HeaderActionType} from '../../actionTypes';
import {apiHost} from '../../config/HostConfig';

const SysConst = require('../../util/SysConst');
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

export const logout = () => {
    localUtil.removeSessionStore(SysConst.USER_ID);
    localUtil.removeSessionStore(SysConst.USER_TYPE);
    localUtil.removeSessionStore(SysConst.AUTH_TOKEN);
    window.location.href = '/login.html';
};