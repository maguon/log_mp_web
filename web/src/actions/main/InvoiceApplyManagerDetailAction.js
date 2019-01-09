import {apiHost} from '../../config/HostConfig';
import {InvoiceApplyManagerDetailActionType, NewInvoiceModalActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInvoiceApplyInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/invoicesList?invoiceApplyId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InvoiceApplyManagerDetailActionType.getInvoiceApplyInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取发票详情信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeInvoiceApplyOrder = () => async (dispatch, getState) => {
    try {
        // 发票申请编号
        const invoiceApplyId = getState().InvoiceApplyManagerDetailReducer.invoiceApplyInfo[0].invoice_apply_id;
        // 订单编号
        const invoiceOrderId = getState().InvoiceApplyManagerDetailReducer.invoiceOrderId;

        if (invoiceOrderId === '') {
            swal('更新失败', '请输入订单编号！', 'warning');
        } else {
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/controlInvoices/' + invoiceApplyId + '/replaceOrder/' + invoiceOrderId;
            let res = await httpUtil.httpPut(url, {});
            if (res.success === true) {
                swal("更新成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch({type: InvoiceApplyManagerDetailActionType.setInvoiceOrderId, payload: ''});
                dispatch(getInvoiceApplyInfo(invoiceApplyId));
            } else if (res.success === false) {
                swal('更新失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};