import {apiHost} from '../../config/HostConfig';
import {InvoiceManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInvoiceList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().InvoiceManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().InvoiceManagerReducer.size;

        // 检索条件：发票申请编号
        const conditionInvoiceApplyNo = getState().InvoiceManagerReducer.conditionInvoiceApplyNo.trim();
        // 检索条件：订单编号
        const conditionInvoiceOrderNo = getState().InvoiceManagerReducer.conditionInvoiceOrderNo.trim();
        // 检索条件：企业税号
        const conditionCompanyTax = getState().InvoiceManagerReducer.conditionCompanyTax.trim();
        // 检索条件：发票抬头
        const conditionInvoiceTitle = getState().InvoiceManagerReducer.conditionInvoiceTitle.trim();
        // 检索条件：订单创建人
        const conditionInvoiceOrderCreateUser = getState().InvoiceManagerReducer.conditionInvoiceOrderCreateUser.trim();

        // 检索条件：申请时间
        const conditionCreatedOnStart = getState().InvoiceManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().InvoiceManagerReducer.conditionCreatedOnEnd;
        // 检索条件：处理时间
        const conditionInvoiceCreatedOnStart = getState().InvoiceManagerReducer.conditionInvoiceCreatedOnStart;
        const conditionInvoiceCreatedOnEnd = getState().InvoiceManagerReducer.conditionInvoiceCreatedOnEnd;
        // 检索条件：状态
        const conditionInvoiceApplyStatus = getState().InvoiceManagerReducer.conditionInvoiceApplyStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/invoicesList?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：发票申请编号
            invoiceApplyId: conditionInvoiceApplyNo,
            // 检索条件：订单编号
            orderId: conditionInvoiceOrderNo,
            // 检索条件：企业税号
            taxNumber: conditionCompanyTax,
            // 检索条件：发票抬头
            title: conditionInvoiceTitle,
            // 检索条件：订单创建人
            createOrderUser: conditionInvoiceOrderCreateUser,

            // 检索条件：申请时间
            invoiceApplyTimeStart: conditionCreatedOnStart,
            invoiceApplyTimeEnd: conditionCreatedOnEnd,
            // 检索条件：处理时间
            invoicedTimeStart: conditionInvoiceCreatedOnStart,
            invoicedTimeEnd: conditionInvoiceCreatedOnEnd,
            // 检索条件：状态
            invoiceStatus: conditionInvoiceApplyStatus === null ? '' : conditionInvoiceApplyStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InvoiceManagerActionType.setInvoiceDataSize, payload: res.result.length});
            dispatch({type: InvoiceManagerActionType.getInvoiceList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取开票申请列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};