import {apiHost} from '../../config/HostConfig';
import {InvoiceManagerDetailActionType} from '../../actionTypes';

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
            dispatch({type: InvoiceManagerDetailActionType.getInvoiceApplyInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取发票详情信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const confirmInvoice = () => async (dispatch, getState) => {
    try {
        // 发票申请编号
        const invoiceApplyId = getState().InvoiceManagerDetailReducer.invoiceApplyInfo[0].invoice_apply_id;
        swal({
            title: "确定发票已开出？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本url
                const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/controlInvoices/' + invoiceApplyId + '/Invoiced';
                const res = await httpUtil.httpPut(url, {});
                if (res.success === true) {
                    swal("开票成功", "", "success");
                    // 保存成功后，重新检索画面数据
                    dispatch(getInvoiceApplyInfo(invoiceApplyId));
                } else if (res.success === false) {
                    swal('开票失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};