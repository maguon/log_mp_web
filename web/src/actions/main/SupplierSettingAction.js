import {apiHost} from '../../config/HostConfig';
import {SupplierSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getSupplierSettingList = () => async (dispatch, getState) => {
    try {
        // 检索条件：供应商简称
        const conditionSupplierShort = getState().SupplierSettingReducer.conditionSupplierShort.trim();
        // 检索条件：供应商全称
        const conditionSupplierName = getState().SupplierSettingReducer.conditionSupplierName.trim();
        // 检索条件：运输方式
        const conditionTransportMode = getState().SupplierSettingReducer.conditionTransportMode;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/supplier?start=0';

        // 检索条件
        let conditionsObj = {
            // 检索条件：供应商简称
            supplierShort: conditionSupplierShort,
            // 检索条件：供应商全称
            supplierFull: conditionSupplierName,
            // 检索条件：运输方式
            transType: conditionTransportMode === null ? '' : conditionTransportMode.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierSettingActionType.getSupplierList, payload: res.result})
        } else if (res.success === false) {
            swal('获取供应商列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};