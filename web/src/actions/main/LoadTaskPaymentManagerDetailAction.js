import {LoadTaskPaymentManagerDetailActionType} from "../../actionTypes";
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
            dispatch({type: LoadTaskPaymentManagerDetailActionType.getLoadTaskInfo, payload: res.result});
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
            dispatch({type: LoadTaskPaymentManagerDetailActionType.getScheduledCarList, payload: res.result});
        } else if (res.success === false) {
            swal('获取已安排车辆列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 付款指定线路
export const paymentLoadTask = (loadTaskId) => async (dispatch) => {
    try {
        swal({
            title: "确定该线路已付款？",
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
                    + '/loadTask/' + loadTaskId + '/payment';
                const res = await httpUtil.httpPut(url);
                if (res.success === true) {
                    dispatch(getLoadTaskInfo(loadTaskId));
                } else if (res.success === false) {
                    swal('修改线路付款状态失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};