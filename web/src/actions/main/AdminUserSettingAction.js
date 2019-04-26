import {apiHost} from '../../config/HostConfig';
import {AdminUserSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');

export const getAdminList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().AdminUserSettingReducer.start;
        // 检索条件：每页数量
        const size = getState().AdminUserSettingReducer.size;

        // 检索条件：员工编号
        const conditionNo = getState().AdminUserSettingReducer.conditionNo.trim();
        // 检索条件：姓名
        const conditionAdminName = getState().AdminUserSettingReducer.conditionAdminName.trim();
        // 检索条件：部门
        const conditionDepartment = getState().AdminUserSettingReducer.conditionDepartment;
        // 检索条件：状态
        const conditionStatus = getState().AdminUserSettingReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin?isSuperUserFlag=0&start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：员工编号
            adminId: conditionNo,
            // 检索条件：姓名
            realName: conditionAdminName,
            // 检索条件：部门
            department: conditionDepartment === null ? '' : conditionDepartment.value,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: AdminUserSettingActionType.setDataSize, payload: res.result.length});
            dispatch({type: AdminUserSettingActionType.getAdminList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取员工列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};