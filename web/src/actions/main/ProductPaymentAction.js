import {apiHost} from '../../config/HostConfig';
import {ProductPaymentActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getProductPaymentList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().ProductPaymentReducer.start;
        // 检索条件：每页数量
        const size = getState().ProductPaymentReducer.size;

        // 检索条件：编号
        const conditionNo = getState().ProductPaymentReducer.conditionNo.trim();
        // 检索条件：订单编号
        const conditionOrderId = getState().ProductPaymentReducer.conditionOrderId.trim();
        // 检索条件：支付类型
        const conditionPaymentType = getState().ProductPaymentReducer.conditionPaymentType;
        // 检索条件：支付状态
        const conditionPaymentStatus = getState().ProductPaymentReducer.conditionPaymentStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/productOrderPayment?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            productPaymentId: conditionNo,
            // 检索条件：订单编号
            productOrderId: conditionOrderId,
            // 检索条件：交易类型
            type: conditionPaymentType === null ? '' : conditionPaymentType.value,
            // 检索条件：支付状态
            statusArr: conditionPaymentStatus === null ? '' : conditionPaymentStatus.value

        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ProductPaymentActionType.setDataSize, payload: res.result.length});
            dispatch({type: ProductPaymentActionType.getProductPaymentList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取商品支付列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};