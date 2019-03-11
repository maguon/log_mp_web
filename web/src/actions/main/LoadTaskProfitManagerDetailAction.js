import {LoadTaskProfitManagerDetailActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 取得车辆利润基本信息
export const getLoadTaskProfitInfo = (orderItemId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/loadTaskProfitOfCar?orderItemId=' + orderItemId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LoadTaskProfitManagerDetailActionType.getLoadTaskProfitInfo, payload: res.result});
            // 若 有数据
            if (res.result.length > 0) {
                // 订单信息
                dispatch(commonAction.getOrderInfo(res.result[0].order_id));
            }
        } else if (res.success === false) {
            swal('获取车辆利润详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 取得安排线路列表
export const getLoadTaskList = (orderItemId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/orderItem/' + orderItemId + '/loadTask';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LoadTaskProfitManagerDetailActionType.getLoadTaskList, payload: res.result});
        } else if (res.success === false) {
            swal('获取线路安排列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};