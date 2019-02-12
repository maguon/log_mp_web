import {apiHost} from '../../config/HostConfig';
import {LoadTaskCarDetailModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 线路安排 初期
export const initLoadTaskCarDetailModal = (orderId, requireId, loadTaskId) => async (dispatch) => {
    // 取得线路安排信息
    dispatch(getLoadTaskInfo(orderId, requireId, loadTaskId));
    // 已安排车辆列表
    dispatch(getScheduledCarList(orderId, loadTaskId));
};

// 取得线路安排信息
export const getLoadTaskInfo = (orderId, requireId, loadTaskId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + orderId + '/require/' + requireId + '/loadTask?loadTaskId=' + loadTaskId;

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LoadTaskCarDetailModalActionType.getLoadTaskInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取线路安排信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 已安排车辆列表
export const getScheduledCarList = (orderId, loadTaskId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + orderId + '/loadTask/' + loadTaskId + '/loadTaskDetail?arrangeFlag=2';

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LoadTaskCarDetailModalActionType.getScheduledCarList, payload: res.result});
        } else if (res.success === false) {
            swal('获取已安排车辆列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};