import {apiHost} from '../../config/HostConfig';
import {SyncInfoModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 同步信息 画面 初期化
export const initSyncInfoModal = (loadTaskId) => async (dispatch) => {
    // 线路ID
    dispatch({type: SyncInfoModalActionType.setLoadTaskId, payload: loadTaskId});
    // 已安排车辆列表
    dispatch(getSyncLoadTask(loadTaskId));
};

// 取得 供应商需求信息(和需求安排列表)
export const getSyncLoadTask = (loadTaskId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/loadTask/' + loadTaskId + '/syncLoadTask';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SyncInfoModalActionType.getSyncRequireInfo, payload: res.result.require});
            dispatch({type: SyncInfoModalActionType.getRouteLoadTaskList, payload: res.result.routeLoadTask});
            $(".point").hide();
        } else if (res.success === false) {
            swal('获取同步信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 取得任务车辆列表
export const getLoadTaskCarList = (syncLoadTaskId) => async (dispatch, getState) => {
    try {
        // 线路ID
        const loadTaskId = getState().SyncInfoModalReducer.loadTaskId;
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/loadTask/' + loadTaskId + '/syncLoadTaskDetail/' + syncLoadTaskId;

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            $(".point").hide();
            $(".city-" + syncLoadTaskId).show();
            dispatch({type: SyncInfoModalActionType.getLoadTaskCarList, payload: res.result});
        } else if (res.success === false) {
            swal('获取任务车辆列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 完成线路需求
export const syncComplete = () => async (dispatch, getState) => {
    try {
        swal({
            title: "确定完成该线路需求？",
            text: "需求完成后，信息将不可修改",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 线路ID
                const loadTaskId = getState().SyncInfoModalReducer.loadTaskId;
                // 基本url
                let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/loadTask/' + loadTaskId + '/syncComplete';
                let res = await httpUtil.httpPut(url, {});
                if (res.success === true) {
                    swal("保存成功", "", "success");
                    // 已安排车辆列表
                    dispatch(getSyncLoadTask(loadTaskId));
                } else if (res.success === false) {
                    swal('保存失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};