import {apiHost} from '../../config/HostConfig';
import {CommonActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 取得系统 城市列表
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

// 取得系统 部门列表
export const getDepartmentList = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/department?status=0';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getDepartmentList, payload: res.result})
        } else if (res.success === false) {
            swal('获取部门列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 取得系统 员工列表
export const getAdminUserList = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/adminUser?isSuperUserFlag=0';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getAdminUserList, payload: res.result})
        } else if (res.success === false) {
            swal('获取员工列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 检索订单基本信息
export const getOrderInfo = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getOrderInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderCarList = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/orderItem?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getOrderCarList, payload: res.result});
            // 估值
            let totalValuation = 0;
            // 实际运费
            let totalActFreight = 0;
            // 实际保费
            let totalInsuranceFee = 0;
            res.result.forEach((item) => {
                totalValuation = totalValuation + item.valuation;
                totalActFreight = totalActFreight + item.act_trans_price;
                totalInsuranceFee = totalInsuranceFee + item.act_insure_price;
            });
            dispatch({type: CommonActionType.setTotalValuation, payload: totalValuation});
            dispatch({type: CommonActionType.setTotalActFreight, payload: totalActFreight});
            dispatch({type: CommonActionType.setTotalInsuranceFee, payload: totalInsuranceFee});
        } else if (res.success === false) {
            swal('获取订单车辆详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 检索订单 支付信息列表(已支付)
export const getOrderPaymentList = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL 已支付
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/payment?orderId=' + orderId + '&status=' + sysConst.PAYMENT_STATUS[1].value;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getOrderPaymentList, payload: res.result});
            // 支付金额
            let totalPayment = 0;
            // 退款金额
            let totalRefund = 0;
            res.result.forEach((item) => {
                // 退款
                if (item.type === sysConst.PAYMENT_TYPE[0].value) {
                    totalRefund = totalRefund + item.total_fee;
                } else {
                    totalPayment = totalPayment + item.total_fee;
                }
            });
            dispatch({type: CommonActionType.setOrderTotalPayment, payload: totalPayment});
            dispatch({type: CommonActionType.setOrderTotalRefund, payload: totalRefund});
        } else if (res.success === false) {
            swal('获取订单支付详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};