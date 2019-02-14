import {handleActions} from 'redux-actions';
import {SyncInfoModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 线路ID
    loadTaskId : '',
    // 供应商 取得 需求基本信息
    syncRequireInfo: [],
    // 供应商 取得 需求任务列表信息
    routeLoadTaskList: [],
    // 需求任务车辆
    loadTaskCarList: []
};

export default handleActions({
    [SyncInfoModalActionType.setLoadTaskId]: (state, action) => {
        return {
            ...state,
            loadTaskId: action.payload
        }
    },
    [SyncInfoModalActionType.getSyncRequireInfo]: (state, action) => {
        return {
            ...state,
            syncRequireInfo: action.payload
        }
    },
    [SyncInfoModalActionType.getRouteLoadTaskList]: (state, action) => {
        return {
            ...state,
            routeLoadTaskList: action.payload
        }
    },
    [SyncInfoModalActionType.getLoadTaskCarList]: (state, action) => {
        return {
            ...state,
            loadTaskCarList: action.payload
        }
    }
}, initialState)