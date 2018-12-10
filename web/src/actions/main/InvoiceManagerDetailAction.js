import {apiHost} from '../../config/HostConfig';
import {InvoiceManagerDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInvoiceInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/inquiryInvoice?inquiryInvoiceId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InvoiceManagerDetailActionType.getInvoiceInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取发票信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};