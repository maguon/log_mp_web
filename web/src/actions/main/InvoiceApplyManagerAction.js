import {apiHost} from '../../config/HostConfig';
import {InvoiceApplyManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInvoiceList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().InvoiceApplyManagerReducer.invoiceStart;
        // 检索条件：每页数量
        const size = getState().InvoiceApplyManagerReducer.size;

        // 检索条件：发票抬头编号
        const conditionInvoiceNo = getState().InvoiceApplyManagerReducer.conditionInvoiceNo.trim();
        // 检索条件：企业抬头
        const conditionCompany = getState().InvoiceApplyManagerReducer.conditionCompany.trim();
        // 检索条件：企业税号
        const conditionCompanyTax = getState().InvoiceApplyManagerReducer.conditionCompanyTax.trim();
        // 检索条件：所属用户
        const conditionUser = getState().InvoiceApplyManagerReducer.conditionUser.trim();

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
            dispatch({type: InvoiceApplyManagerActionType.setInvoiceDataSize, payload: res.result.length});
            dispatch({type: InvoiceApplyManagerActionType.getInvoiceList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户发票列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};









// 取得已完成 并 未开票 订单列表
export const getOrderList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().InvoiceApplyManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().InvoiceApplyManagerReducer.size;

        // 检索条件：发票抬头编号
        const conditionInvoiceNo = getState().InvoiceApplyManagerReducer.conditionInvoiceNo.trim();
        // 检索条件：企业抬头
        const conditionCompany = getState().InvoiceApplyManagerReducer.conditionCompany.trim();
        // 检索条件：企业税号
        const conditionCompanyTax = getState().InvoiceApplyManagerReducer.conditionCompanyTax.trim();
        // 检索条件：所属用户
        const conditionUser = getState().InvoiceApplyManagerReducer.conditionUser.trim();

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
            dispatch({type: InvoiceApplyManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: InvoiceApplyManagerActionType.getInvoiceList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户发票列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};