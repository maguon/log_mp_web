import {apiHost} from '../../config/HostConfig';
import {SupplierPaymentDetailModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 线路安排 初期
export const initSupplierPaymentDetailModal = (orderId, supplierTransPrice, supplierInsurePrice, supplierPrice) => async (dispatch) => {
    // 取得线路安排信息
    dispatch(getLoadTaskInfo(orderId));
    // 供应商运费
    dispatch({type: SupplierPaymentDetailModalActionType.setSupplierTransPrice, payload: supplierTransPrice});
    // 供应商保费
    dispatch({type: SupplierPaymentDetailModalActionType.setSupplierInsurePrice, payload: supplierInsurePrice});
    // 支付供应商
    dispatch({type: SupplierPaymentDetailModalActionType.setSupplierPrice, payload: supplierPrice});
};

// 取得线路安排信息
export const getLoadTaskInfo = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/routeLoadTask?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierPaymentDetailModalActionType.getLoadTaskInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取线路安排信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};