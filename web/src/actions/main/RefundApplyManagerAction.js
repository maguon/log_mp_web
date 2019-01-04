import {apiHost} from '../../config/HostConfig';
import {RefundApplyManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getRefundApplyList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().RefundApplyManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().RefundApplyManagerReducer.size;

        // 检索条件：退款编号
        const conditionNo = getState().RefundApplyManagerReducer.conditionNo.trim();
        // 检索条件：订单编号
        const conditionOrderId = getState().RefundApplyManagerReducer.conditionOrderId.trim();
        // 检索条件：订单类型
        const conditionOrderType = getState().RefundApplyManagerReducer.conditionOrderType;
        // 检索条件：退款方式
        const conditionRefundMode = getState().RefundApplyManagerReducer.conditionRefundMode;
        // 检索条件：订单创建人
        const conditionCreateUser = getState().RefundApplyManagerReducer.conditionCreateUser.trim();
        // 检索条件：申请时间
        const conditionCreatedOnStart = getState().RefundApplyManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().RefundApplyManagerReducer.conditionCreatedOnEnd;
        // 检索条件：处理时间
        const conditionOperationStart = getState().RefundApplyManagerReducer.conditionOperationStart;
        const conditionOperationEnd = getState().RefundApplyManagerReducer.conditionOperationEnd;
        // 检索条件：状态
        const conditionStatus = getState().RefundApplyManagerReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/refundApply?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：退款编号
            refundApplyId: conditionNo,
            // 检索条件：订单编号
            orderId: conditionOrderId,
            // 检索条件：订单类型
            orderType: conditionOrderType === null ? '' : conditionOrderType.value,
            // 检索条件：退款方式
            refundMethod: conditionRefundMode === null ? '' : conditionRefundMode.value,
            // 检索条件：创建人
            createOrderUser: conditionCreateUser,
            // 检索条件：申请时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：处理时间
            updateOnStart: conditionOperationStart,
            updateOnEnd: conditionOperationEnd,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: RefundApplyManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: RefundApplyManagerActionType.getRefundApplyList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取退款申请列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};