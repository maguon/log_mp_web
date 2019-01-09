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

        // 检索条件：发票申请编号
        const conditionInvoiceApplyNo = getState().InvoiceApplyManagerReducer.conditionInvoiceApplyNo.trim();
        // 检索条件：企业税号
        const conditionCompanyTax = getState().InvoiceApplyManagerReducer.conditionCompanyTax.trim();
        // 检索条件：发票抬头
        const conditionInvoiceTitle = getState().InvoiceApplyManagerReducer.conditionInvoiceTitle.trim();
        // 检索条件：订单创建人
        const conditionInvoiceOrderCreateUser = getState().InvoiceApplyManagerReducer.conditionInvoiceOrderCreateUser.trim();

        // 检索条件：订单编号
        const conditionInvoiceOrderNo = getState().InvoiceApplyManagerReducer.conditionInvoiceOrderNo.trim();
        // 检索条件：开票时间
        const conditionInvoiceCreatedOnStart = getState().InvoiceApplyManagerReducer.conditionInvoiceCreatedOnStart;
        const conditionInvoiceCreatedOnEnd = getState().InvoiceApplyManagerReducer.conditionInvoiceCreatedOnEnd;
        // 检索条件：状态
        const conditionInvoiceApplyStatus = getState().InvoiceApplyManagerReducer.conditionInvoiceApplyStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/invoicesList?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：发票申请编号
            invoiceApplyId: conditionInvoiceApplyNo,
            // 检索条件：企业税号
            taxNumber: conditionCompanyTax,
            // 检索条件：发票抬头
            title: conditionInvoiceTitle,
            // 检索条件：订单创建人
            createOrderUser: conditionInvoiceOrderCreateUser,

            // 检索条件：订单编号
            orderId: conditionInvoiceOrderNo,
            // 检索条件：处理时间
            invoicedTimeStart: conditionInvoiceCreatedOnStart,
            invoicedTimeEnd: conditionInvoiceCreatedOnEnd,
            // 检索条件：物流状态
            invoiceStatus: conditionInvoiceApplyStatus === null ? '' : conditionInvoiceApplyStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InvoiceApplyManagerActionType.setInvoiceDataSize, payload: res.result.length});
            dispatch({type: InvoiceApplyManagerActionType.getInvoiceList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取开票申请列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 取得已完成 并 未开票 订单列表
export const getOrderList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().InvoiceApplyManagerReducer.orderStart;
        // 检索条件：每页数量
        const size = getState().InvoiceApplyManagerReducer.size;

        // 检索条件：订单编号
        const conditionOrderNo = getState().InvoiceApplyManagerReducer.conditionOrderNo.trim();
        // 检索条件：起始城市
        const conditionOrderStartCity = getState().InvoiceApplyManagerReducer.conditionOrderStartCity;
        // 检索条件：目的城市
        const conditionOrderEndCity = getState().InvoiceApplyManagerReducer.conditionOrderEndCity;
        // 检索条件：支付状态
        const conditionOrderPaymentStatus = getState().InvoiceApplyManagerReducer.conditionOrderPaymentStatus;

        // 检索条件：创建时间(始)
        const conditionOrderCreatedOnStart = getState().InvoiceApplyManagerReducer.conditionOrderCreatedOnStart;
        // 检索条件：创建时间(终)
        const conditionOrderCreatedOnEnd = getState().InvoiceApplyManagerReducer.conditionOrderCreatedOnEnd;
        // 检索条件：创建人
        const conditionOrderCreateUser = getState().InvoiceApplyManagerReducer.conditionOrderCreateUser.trim();

        // 基本检索URL 已完成未开票订单检索
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/noInvoiceOrderList?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：订单编号
            orderId: conditionOrderNo,
            // 检索条件：起始城市
            routeStartId: conditionOrderStartCity === null ? '' : conditionOrderStartCity.value,
            // 检索条件：目的城市
            routeEndId: conditionOrderEndCity === null ? '' : conditionOrderEndCity.value,
            // 检索条件：支付状态
            paymentStatus: conditionOrderPaymentStatus === null ? '' : conditionOrderPaymentStatus.value,

            // 检索条件：创建时间
            createdOnStart: conditionOrderCreatedOnStart,
            createdOnEnd: conditionOrderCreatedOnEnd,
            // 检索条件：创建人
            createOrderUser: conditionOrderCreateUser
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InvoiceApplyManagerActionType.setOrderDataSize, payload: res.result.length});
            dispatch({type: InvoiceApplyManagerActionType.getOrderList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取未开票订单列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};