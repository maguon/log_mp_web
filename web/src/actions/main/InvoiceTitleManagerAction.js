import {apiHost} from '../../config/HostConfig';
import {InvoiceTitleManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInvoiceList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().InvoiceTitleManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().InvoiceTitleManagerReducer.size;

        // 检索条件：发票抬头编号
        const conditionInvoiceNo = getState().InvoiceTitleManagerReducer.conditionInvoiceNo.trim();
        // 检索条件：企业抬头
        const conditionCompany = getState().InvoiceTitleManagerReducer.conditionCompany.trim();
        // 检索条件：企业税号
        const conditionCompanyTax = getState().InvoiceTitleManagerReducer.conditionCompanyTax.trim();
        // 检索条件：所属用户
        const conditionUser = getState().InvoiceTitleManagerReducer.conditionUser.trim();

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/invoice?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：发票抬头编号
            inquiryInvoiceId: conditionInvoiceNo,
            // 检索条件：企业抬头
            companyName: conditionCompany,
            // 检索条件：企业税号
            taxNumber: conditionCompanyTax,
            // 检索条件：所属用户
            userName: conditionUser
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InvoiceTitleManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: InvoiceTitleManagerActionType.getInvoiceList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户发票列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};