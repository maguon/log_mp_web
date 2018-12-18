import {apiHost} from '../../config/HostConfig';
import {OrderManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getOrderList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().OrderManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().OrderManagerReducer.size;

        // 检索条件：编号
        const conditionNo = getState().OrderManagerReducer.conditionNo.trim();
        // 检索条件：下单人
        const conditionOrderUser = getState().OrderManagerReducer.conditionOrderUser.trim();
        // 检索条件：电话
        const conditionPhone = getState().OrderManagerReducer.conditionPhone.trim();
        // 检索条件：起始城市
        const conditionStartCity = getState().OrderManagerReducer.conditionStartCity;
        // 检索条件：目的城市
        const conditionEndCity = getState().OrderManagerReducer.conditionEndCity;
        // 检索条件：服务方式
        const conditionServiceType = getState().OrderManagerReducer.conditionServiceType;

        // 检索条件：订单类型
        const conditionOrderType = getState().OrderManagerReducer.conditionOrderType;
        // 检索条件：创建时间
        const conditionCreatedOnStart = getState().OrderManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().OrderManagerReducer.conditionCreatedOnEnd;
        // 检索条件：物流状态
        const conditionLogStatus = getState().OrderManagerReducer.conditionLogStatus;
        // 检索条件：支付状态
        const conditionPaymentStatus = getState().OrderManagerReducer.conditionPaymentStatus;
        // 检索条件：订单状态
        const conditionOrderStatus = getState().OrderManagerReducer.conditionOrderStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            orderId: conditionNo,
            // 检索条件：下单人
            userName: conditionOrderUser,
            // 检索条件：手机
            phone: conditionPhone,
            // 检索条件：起始城市
            startCityId: conditionStartCity === null ? '' : conditionStartCity.value,
            // 检索条件：目的城市
            endCityId: conditionEndCity === null ? '' : conditionEndCity.value,
            // 检索条件：服务方式
            serviceType: conditionServiceType === null ? '' : conditionServiceType.value,
            // 检索条件：订单类型
            createdType: conditionOrderType === null ? '' : conditionOrderType.value,
            // 检索条件：创建时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：物流状态
            logStatus: conditionLogStatus === null ? '' : conditionLogStatus.value,
            // 检索条件：支付状态
            paymentStatus: conditionPaymentStatus === null ? '' : conditionPaymentStatus.value,
            // 检索条件：订单状态
            status: conditionOrderStatus === null ? '' : conditionOrderStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: OrderManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: OrderManagerActionType.getOrderList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取订单列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};