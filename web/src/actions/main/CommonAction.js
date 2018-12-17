import {apiHost} from '../../config/HostConfig';
import {CommonActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getCityList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/city';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getCityList, payload: res.result})
        } else if (res.success === false) {
            swal('获取城市信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};