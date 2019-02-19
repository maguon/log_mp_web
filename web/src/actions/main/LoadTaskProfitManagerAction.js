import {apiHost} from '../../config/HostConfig';
import {LoadTaskProfitManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getLoadTaskProfitList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().LoadTaskProfitManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().LoadTaskProfitManagerReducer.size;

        // 检索条件：VIN
        const conditionVin = getState().LoadTaskProfitManagerReducer.conditionVin.trim();
        // 检索条件：起始城市
        const conditionStartCity = getState().LoadTaskProfitManagerReducer.conditionStartCity;
        // 检索条件：目的城市
        const conditionEndCity = getState().LoadTaskProfitManagerReducer.conditionEndCity;
        // 检索条件：服务方式
        const conditionServiceType = getState().LoadTaskProfitManagerReducer.conditionServiceType;
        // 检索条件：订单编号
        const conditionOrderId = getState().LoadTaskProfitManagerReducer.conditionOrderId.trim();
        // 检索条件：需求创建时间
        const conditionCreatedOnStart = getState().LoadTaskProfitManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().LoadTaskProfitManagerReducer.conditionCreatedOnEnd;
        // 检索条件：状态
        const conditionStatus = getState().LoadTaskProfitManagerReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/loadTaskProfitOfCar?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：VIN
            vin: conditionVin,
            // 检索条件：起始城市
            routeStartId: conditionStartCity === null ? '' : conditionStartCity.value,
            // 检索条件：目的城市
            routeEndId: conditionEndCity === null ? '' : conditionEndCity.value,
            // 检索条件：服务方式
            serviceType: conditionServiceType === null ? '' : conditionServiceType.value,
            // 检索条件：订单编号
            orderId: conditionOrderId,
            // 检索条件：创建时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：状态
            budgetStatus: conditionStatus === null ? '' : conditionStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LoadTaskProfitManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: LoadTaskProfitManagerActionType.getLoadTaskProfitArray, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取车辆运输利润列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};