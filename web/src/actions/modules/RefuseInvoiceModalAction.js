import {apiHost} from '../../config/HostConfig';
import {RefuseInvoiceModalActionType} from "../../actionTypes";

const invoiceManagerDetailAction = require('../../actions/main/InvoiceManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 拒绝开票 模态画面 初期
export const initRefuseInvoiceModal = (invoiceApplyInfo) => async (dispatch) => {
    // 退款申请 基本信息
    dispatch({type: RefuseInvoiceModalActionType.setInvoiceApplyInfo, payload: invoiceApplyInfo});
    // 拒绝原因
    dispatch({type: RefuseInvoiceModalActionType.setRefuseReason, payload: ''});
};

export const refuseInvoice = () => async (dispatch, getState) => {
    try {
        // 发票申请 基本信息
        const invoiceApplyInfo = getState().RefuseInvoiceModalReducer.invoiceApplyInfo;
        // 拒绝原因
        const refuseReason = getState().RefuseInvoiceModalReducer.refuseReason;

        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/controlInvoices/' + invoiceApplyInfo.invoice_apply_id + '/refuseApply';

        const params = {
            refuseReason: refuseReason
        };

        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            $('#refuseInvoiceModal').modal('close');
            swal("拒绝开票成功", "", "success");
            // 保存成功后，重新检索画面数据
            dispatch(invoiceManagerDetailAction.getInvoiceApplyInfo(invoiceApplyInfo.invoice_apply_id));
        } else if (res.success === false) {
            swal('拒绝开票失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};