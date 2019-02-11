import {TransDemandManagerDetailActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getTransDemandInfo = (requireId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/requireTask?requireId=' + requireId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: TransDemandManagerDetailActionType.getTransDemandInfo, payload: res.result});
            // 若 有数据
            if (res.result.length > 0) {
                // 安排线路列表
                dispatch(getLoadTaskList(res.result[0].order_id, requireId));
            }
        } else if (res.success === false) {
            swal('获取运输需求详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 安排线路列表
export const getLoadTaskList = (orderId, requireId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + orderId + '/require/' + requireId + '/loadTask';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: TransDemandManagerDetailActionType.getLoadTaskList, payload: res.result});
        } else if (res.success === false) {
            swal('获取线路安排列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 更新线路状态
export const changeStatus = (requireId) => async (dispatch) => {
    swal({
        title: "确定将状态变更为已安排？",
        text: "状态变更后将不可修改",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/requireTask/' + requireId + '/status/' + sysConst.TRANS_DEMAND_STATUS[1].value;
            const res = await httpUtil.httpPut(url, {});
            if (res.success === true) {
                dispatch(getTransDemandInfo(requireId));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

// 删除指定线路
export const deleteLoadTask = (orderId, requireId, loadTaskId) => async (dispatch) => {
    try {
        swal({
            title: "确定删除该线路？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本检索URL
                const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/order/' + orderId + '/require/' + requireId + '/loadTask/' + loadTaskId;
                const res = await httpUtil.httpDelete(url);
                if (res.success === true) {
                    dispatch(getTransDemandInfo(requireId));
                } else if (res.success === false) {
                    swal('删除运输线路失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 更新线路状态
export const changeLoadTaskStatus = (requireId, loadTaskId, status) => async (dispatch) => {
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
                dispatch(getTransDemandInfo(requireId));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};