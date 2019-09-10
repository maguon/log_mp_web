import {apiHost} from '../../config/HostConfig';
import {ProductOrderActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getProductOrderList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().ProductOrderReducer.start;
        // 检索条件：每页数量
        const size = getState().ProductOrderReducer.size;

        // 检索条件：编号
        const conditionId = getState().ProductOrderReducer.conditionId.trim();
        // 检索条件：商品
        const conditionProduct = getState().ProductOrderReducer.conditionProduct;
        // 检索条件：城市
        const conditionCity = getState().ProductOrderReducer.conditionCity;
        // 检索条件：订单状态
        const conditionOrderStatus = getState().ProductOrderReducer.conditionOrderStatus;

        // 检索条件：用户ID
        const conditionUserId = getState().ProductOrderReducer.conditionUserId.trim();
        // 检索条件：昵称
        const conditionNickname = getState().ProductOrderReducer.conditionNickname.trim();
        // 检索条件：手机
        const conditionPhone = getState().ProductOrderReducer.conditionPhone.trim();
        // 检索条件：支付状态
        const conditionPaymentStatus = getState().ProductOrderReducer.conditionPaymentStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/productOrder?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            productOrderId: conditionId,
            // 检索条件：商品
            commodityId: conditionProduct === null ? '' : conditionProduct.value,
            // 检索条件：城市
            cityId: conditionCity === null ? '' : conditionCity.value,
            // 检索条件：订单状态
            status: conditionOrderStatus === null ? '' : conditionOrderStatus.value,
            // 检索条件：用户ID
            userId: conditionUserId,
            // 检索条件：昵称
            userName: conditionNickname,
            // 检索条件：手机
            phone: conditionPhone,
            // 检索条件：支付状态
            paymentStatus: conditionPaymentStatus === null ? '' : conditionPaymentStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ProductOrderActionType.setDataSize, payload: res.result.length});
            dispatch({type: ProductOrderActionType.getProductOrderList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取商品列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};