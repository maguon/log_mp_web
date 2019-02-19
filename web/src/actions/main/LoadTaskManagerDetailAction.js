import {LoadTaskManagerDetailActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 取得线路安排基本信息
export const getLoadTaskInfo = (loadTaskId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/routeLoadTask?loadTaskId=' + loadTaskId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LoadTaskManagerDetailActionType.getLoadTaskInfo, payload: res.result});
            // 若 有数据
            if (res.result.length > 0) {
                // 已安排车辆列表
                dispatch(getScheduledCarList(res.result[0].order_id, loadTaskId));
                // 订单信息
                dispatch(commonAction.getOrderInfo(res.result[0].order_id));
            }
        } else if (res.success === false) {
            swal('获取线路安排基本信息失败', res.msg, 'warning');
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
            dispatch({type: LoadTaskManagerDetailActionType.getScheduledCarList, payload: res.result});
        } else if (res.success === false) {
            swal('获取已安排车辆列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 安排线路列表：同步到供应商
export const syncLoadTask = (loadTaskId) => async (dispatch) => {
    try {
        swal({
            title: "确定需求同步至供应商？",
            text: "需求同步后，该线路需求信息将不可修改",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本url
                let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/loadTask/' + loadTaskId + '/supplier';
                let res = await httpUtil.httpPost(url, {});
                if (res.success === true) {
                    swal("同步成功", "", "success");
                    dispatch(getLoadTaskInfo(loadTaskId));
                } else if (res.success === false) {
                    swal('同步失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 更新线路状态
export const changeLoadTaskStatus = (loadTaskId, status) => async (dispatch) => {
    let cusTitle = '';
    let newStatus = 0;
    // 待发运状态时，变更
    if (status === sysConst.LOAD_TASK_STATUS[0].value) {
        cusTitle = '确定将状态变更为已发运？';
        newStatus = sysConst.LOAD_TASK_STATUS[1].value;
    } else {
        cusTitle = '确定将状态变更为已送达？';
        newStatus = sysConst.LOAD_TASK_STATUS[2].value;
    }

    swal({
        title: cusTitle,
        text: "状态变更后将不可修改",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/loadTask/' + loadTaskId + '/status/' + newStatus;
            const res = await httpUtil.httpPut(url, {});
            if (res.success === true) {
                dispatch(getLoadTaskInfo(loadTaskId));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};