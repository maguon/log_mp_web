import {apiHost} from '../../config/HostConfig';
import {PaymentManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getPaymentList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().PaymentManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().PaymentManagerReducer.size;

        // 检索条件：编号
        const conditionNo = getState().PaymentManagerReducer.conditionNo.trim();
        // 检索条件：订单编号
        const conditionOrderId = getState().PaymentManagerReducer.conditionOrderId.trim();
        // 检索条件：支付方式
        const conditionPaymentMode = getState().PaymentManagerReducer.conditionPaymentMode;
        // 检索条件：支付类型
        const conditionPaymentType = getState().PaymentManagerReducer.conditionPaymentType;
        // 检索条件：创建人
        const conditionCreateUser = getState().PaymentManagerReducer.conditionCreateUser.trim();

        // 检索条件：付款银行
        const conditionBank = getState().PaymentManagerReducer.conditionBank.trim();
        // 检索条件：户主
        const conditionBankUser = getState().PaymentManagerReducer.conditionBankUser.trim();
        // 检索条件：提交时间
        const conditionCreatedOnStart = getState().PaymentManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().PaymentManagerReducer.conditionCreatedOnEnd;
        // 检索条件：支付状态
        const conditionPaymentStatus = getState().PaymentManagerReducer.conditionPaymentStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/payment?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            paymentId: conditionNo,
            // 检索条件：订单编号
            orderId: conditionOrderId,
            // 检索条件：支付方式
            paymentType: conditionPaymentMode === null ? '' : conditionPaymentMode.value,
            // 检索条件：支付类型
            type: conditionPaymentType === null ? '' : conditionPaymentType.value,
            // 检索条件：创建人
            createOrderUser: conditionCreateUser,

            // 检索条件：付款银行
            bank: conditionBank,
            // 检索条件：户主
            accountUser: conditionBankUser,
            // 检索条件：提交时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：状态
            status: conditionPaymentStatus === null ? '' : conditionPaymentStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: PaymentManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: PaymentManagerActionType.getPaymentList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取支付列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};