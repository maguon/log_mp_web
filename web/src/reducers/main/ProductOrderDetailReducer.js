import {handleActions} from 'redux-actions';
import {LoadTaskPaymentManagerDetailActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 线路安排基本信息
    loadTaskInfo: [],
    // 安排车辆列表
    scheduledCarList: []
};

export default handleActions({
    [LoadTaskPaymentManagerDetailActionType.getLoadTaskInfo]: (state, action) => {
        return {
            ...state,
            loadTaskInfo: action.payload
        }
    },
    [LoadTaskPaymentManagerDetailActionType.getScheduledCarList]: (state, action) => {
        return {
            ...state,
            scheduledCarList: action.payload
        }
    }
}, initialState)