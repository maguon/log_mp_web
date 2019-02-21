import {apiHost} from '../../config/HostConfig';
import {SupplierBusinessManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getSupplierBusinessList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().SupplierBusinessManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().SupplierBusinessManagerReducer.size;

        // 检索条件：供应商
        const conditionSupplier = getState().SupplierBusinessManagerReducer.conditionSupplier;
        // 检索条件：业务生成时间
        const conditionCreatedOnStart = getState().SupplierBusinessManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().SupplierBusinessManagerReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/supplierBusiness?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：供应商
            supplierId: conditionSupplier === null ? '' : conditionSupplier.value,
            // 检索条件：授权时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierBusinessManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: SupplierBusinessManagerActionType.getSupplierBusinessList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取供应商业务列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};