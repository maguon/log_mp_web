import {handleActions} from 'redux-actions';
import {LoadTaskManagerDetailActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 线路安排基本信息
    loadTaskInfo: [],
    // 安排车辆列表
    scheduledCarList: []
};

export default handleActions({
    [LoadTaskManagerDetailActionType.getLoadTaskInfo]: (state, action) => {
        return {
            ...state,
            loadTaskInfo: action.payload
        }
    },
    [LoadTaskManagerDetailActionType.getScheduledCarList]: (state, action) => {
        return {
            ...state,
            scheduledCarList: action.payload
        }
    }
}, initialState)