import {apiHost} from '../../config/HostConfig';
import {FinancePanelActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getPaymentInMonth = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/paymentInMonth';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 本月收入
                dispatch({type: FinancePanelActionType.setIncome, payload: res.result[0].income});
                // 支付待审核:笔数
                dispatch({type: FinancePanelActionType.setWaitForPayCnt, payload: res.result[0].unPaid_count});
                // 支付待审核:金额
                dispatch({type: FinancePanelActionType.setWaitForPayMoney, payload: res.result[0].unPaid_price});
            }
        } else if (res.success === false) {
            swal('获取本月收入信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getRefundInMonth = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/refundInMonth';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 待退款:笔数
                dispatch({type: FinancePanelActionType.setWaitForRefundCnt, payload: res.result[0].refund_apply_count});
                // 待退款:金额
                dispatch({type: FinancePanelActionType.setWaitForRefundMoney, payload: res.result[0].apply_fee_price});
            }
        } else if (res.success === false) {
            swal('获取待退款信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getPrice = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/price';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 本月利润
                dispatch({type: FinancePanelActionType.setProfit, payload: res.result[0].profit_price});
                // 本月支付供应商
                dispatch({type: FinancePanelActionType.setPayment, payload: res.result[0].paid_supplier_price});
                // 待支付线路
                dispatch({type: FinancePanelActionType.setWaitForPayLoadTask, payload: res.result[0].unpaid_load_count});
                // 待支付供应商金额
                dispatch({type: FinancePanelActionType.setWaitForPaySupplier, payload: res.result[0].unpaid_supplier_price});
            }
        } else if (res.success === false) {
            swal('获取本月利润信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getUnInvoice = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/unInvoice';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 待开票:笔数
                dispatch({type: FinancePanelActionType.setWaitForInvoiceCnt, payload: res.result[0].unInvoice_count});
                // 待开票:金额
                dispatch({type: FinancePanelActionType.setWaitForInvoiceMoney, payload: res.result[0].invoice_total_price});
            }
        } else if (res.success === false) {
            swal('获取待开票信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};