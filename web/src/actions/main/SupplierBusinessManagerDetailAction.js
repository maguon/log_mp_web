import {apiHost} from '../../config/HostConfig';
import {SupplierBusinessManagerDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getSupplierBusinessDetail = (supplierId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/supplierBusiness?supplierId=' + supplierId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierBusinessManagerDetailActionType.getSupplierBusinessInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取供应商业务详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getLoadTaskList = (supplierId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().SupplierBusinessManagerDetailReducer.detailStart;
        // 检索条件：每页数量
        const size = getState().SupplierBusinessManagerDetailReducer.detailSize;

        // 检索条件：线路编号
        const conditionLoadTaskId = getState().SupplierBusinessManagerDetailReducer.conditionLoadTaskId.trim();
        // 检索条件：订单编号
        const conditionOrderId = getState().SupplierBusinessManagerDetailReducer.conditionOrderId.trim();
        // 检索条件：起始城市
        const conditionStartCity = getState().SupplierBusinessManagerDetailReducer.conditionStartCity;
        // 检索条件：目的城市
        const conditionEndCity = getState().SupplierBusinessManagerDetailReducer.conditionEndCity;
        // 检索条件：运输状态
        const conditionTransMode = getState().SupplierBusinessManagerDetailReducer.conditionTransMode;

        // 检索条件：创建时间
        const conditionCreatedOnStart = getState().SupplierBusinessManagerDetailReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().SupplierBusinessManagerDetailReducer.conditionCreatedOnEnd;
        // 检索条件：送达日期
        const conditionArriveStart = getState().SupplierBusinessManagerDetailReducer.conditionArriveStart;
        const conditionArriveEnd = getState().SupplierBusinessManagerDetailReducer.conditionArriveEnd;
        // 检索条件：状态
        const conditionPaymentStatus = getState().SupplierBusinessManagerDetailReducer.conditionPaymentStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/routeLoadTask?start=' + start + '&size=' + size + '&supplierId=' + supplierId;

        // 检索条件
        let conditionsObj = {
            // 检索条件：线路编号
            loadTaskId: conditionLoadTaskId,
            // 检索条件：订单编号
            orderId: conditionOrderId,
            // 检索条件：起始城市
            routeStartId: conditionStartCity === null ? '' : conditionStartCity.value,
            // 检索条件：目的城市
            routeEndId: conditionEndCity === null ? '' : conditionEndCity.value,
            // 检索条件：运输状态
            transType: conditionTransMode === null ? '' : conditionTransMode.value,

            // 检索条件：创建时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：送达日期
            arriveDateStart: conditionArriveStart,
            arriveDateEnd: conditionArriveEnd,
            // 检索条件：状态
            paymentFlag: conditionPaymentStatus === null ? '' : conditionPaymentStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierBusinessManagerDetailActionType.setDetailDataSize, payload: res.result.length});
            dispatch({type: SupplierBusinessManagerDetailActionType.getLoadTaskList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取线路列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};