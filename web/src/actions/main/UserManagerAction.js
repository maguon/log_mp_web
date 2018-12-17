import {apiHost} from '../../config/HostConfig';
import {UserManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().UserManagerReducer.size;

        // 检索条件：用户ID
        const conditionNo = getState().UserManagerReducer.conditionNo.trim();
        // 检索条件：昵称
        const conditionWeChatNm = getState().UserManagerReducer.conditionWeChatNm.trim();
        // 检索条件：手机号码
        const conditionPhone = getState().UserManagerReducer.conditionPhone.trim();
        // 检索条件：微信状态
        const conditionWeStatus = getState().UserManagerReducer.conditionWeStatus;
        // 检索条件：认证状态
        const conditionAuthStatus = getState().UserManagerReducer.conditionAuthStatus;

        // 检索条件：授权时间
        const conditionCreatedOnStart = getState().UserManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().UserManagerReducer.conditionCreatedOnEnd;
        // 检索条件：认证时间
        const conditionAuthTimeStart = getState().UserManagerReducer.conditionAuthTimeStart;
        const conditionAuthTimeEnd = getState().UserManagerReducer.conditionAuthTimeEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/user?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            userId: conditionNo,
            // 检索条件：微信昵称
            wechatName: conditionWeChatNm,
            // 检索条件：手机
            phone: conditionPhone,
            // 检索条件：认证状态
            authStatus: conditionAuthStatus === null ? '' : conditionAuthStatus.value,
            // 检索条件：关注状态
            wechatStatus: conditionWeStatus === null ? '' : conditionWeStatus.value,
            // 检索条件：授权时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：认证时间
            authStartTime: conditionAuthTimeStart,
            authEndTime: conditionAuthTimeEnd
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: UserManagerActionType.getUserList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};