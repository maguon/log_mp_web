import {apiHost} from '../../config/HostConfig';
import {NewOrderModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

/**
 * 根据开始城市-终到城市，设定画面里程显示。
 */
export const calculateMileage = () => async (dispatch, getState) => {
    try {
        const startCity = getState().NewOrderModalReducer.startCity;
        const endCity = getState().NewOrderModalReducer.endCity;

        // 当 始发城市，终到城市 都选择的时候，调用接口
        if (startCity !== null && startCity.value !== undefined && endCity !== null && endCity.value !== undefined) {
            // 取得 开始城市-终到城市 里程数
            const url = apiHost + '/api/route?routeStartId=' + startCity.value + '&routeEndId=' + endCity.value;
            const res = await httpUtil.httpGet(url);
            if (res.success === true) {
                // 是否存在线路 不存在：true ，存在：false
                dispatch({type: NewOrderModalActionType.setErrorRouteFlg, payload: res.result.length === 0});
            } else if (res.success === false) {
                swal('获取线路信息失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveOrder = () => async (dispatch, getState) => {
    try {
        // 起始城市
        const startCity = getState().NewOrderModalReducer.startCity;
        // 目的城市
        const endCity = getState().NewOrderModalReducer.endCity;
        // 服务方式
        const serviceType = getState().NewOrderModalReducer.serviceType;

        if (startCity == null || startCity.value === undefined
            || endCity == null || endCity.value === undefined
            || serviceType == null || serviceType.value === undefined) {
            swal('保存失败', '请输入完整的订单信息！', 'warning');
        } else {
            const params = {
                routeStartId: startCity.value,
                routeEndId: endCity.value,
                serviceType: serviceType.value
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/order';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newOrderModal').modal('close');
                swal("保存成功", "", "success");
                dispatch({type: NewOrderModalActionType.setNewOrderId, payload: res.id});
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};