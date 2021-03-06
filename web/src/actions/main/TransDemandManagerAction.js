import {apiHost} from '../../config/HostConfig';
import {TransDemandManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getTransDemandList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().TransDemandManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().TransDemandManagerReducer.size;

        // 检索条件：订单编号
        const conditionOrderId = getState().TransDemandManagerReducer.conditionOrderId.trim();
        // 检索条件：起始城市
        const conditionStartCity = getState().TransDemandManagerReducer.conditionStartCity;
        // 检索条件：目的城市
        const conditionEndCity = getState().TransDemandManagerReducer.conditionEndCity;
        // 检索条件：服务方式
        const conditionServiceType = getState().TransDemandManagerReducer.conditionServiceType;

        // 检索条件：订单创建人
        const conditionOrderCreatedUser = getState().TransDemandManagerReducer.conditionOrderCreatedUser;
        // 检索条件：需求创建时间
        const conditionCreatedOnStart = getState().TransDemandManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().TransDemandManagerReducer.conditionCreatedOnEnd;
        // 检索条件：状态
        const conditionStatus = getState().TransDemandManagerReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/requireTask?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：订单编号
            orderId: conditionOrderId,
            // 检索条件：起始城市
            routeStartId: conditionStartCity === null ? '' : conditionStartCity.value,
            // 检索条件：目的城市
            routeEndId: conditionEndCity === null ? '' : conditionEndCity.value,
            // 检索条件：服务方式
            serviceType: conditionServiceType === null ? '' : conditionServiceType.value,

            // 检索条件：订单创建人
            createOrderUserId: conditionOrderCreatedUser === null ? '' : conditionOrderCreatedUser.value,
            // 检索条件：需求创建时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: TransDemandManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: TransDemandManagerActionType.getTransDemandList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取运输需求列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};