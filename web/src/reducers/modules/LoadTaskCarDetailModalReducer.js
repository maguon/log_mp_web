import {handleActions} from 'redux-actions';
import {LoadTaskCarDetailModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 线路安排基本信息
    loadTaskInfo: [],
    // 已安排车辆
    scheduledCarList: []
};

export default handleActions({
    [LoadTaskCarDetailModalActionType.getLoadTaskInfo]: (state, action) => {
        return {
            ...state,
            loadTaskInfo: action.payload
        }
    },
    [LoadTaskCarDetailModalActionType.getScheduledCarList]: (state, action) => {
        return {
            ...state,
            scheduledCarList: action.payload
        }
    }
}, initialState)