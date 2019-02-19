import {handleActions} from 'redux-actions';
import {LoadTaskProfitManagerDetailActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 车辆运输利润 详情
    loadTaskProfitInfo: [],
    // 线路安排列表
    loadTaskArray: []
};

export default handleActions({
    [LoadTaskProfitManagerDetailActionType.getLoadTaskProfitInfo]: (state, action) => {
        return {
            ...state,
            loadTaskProfitInfo: action.payload
        }
    },
    [LoadTaskProfitManagerDetailActionType.getLoadTaskList]: (state, action) => {
        return {
            ...state,
            loadTaskArray: action.payload
        }
    }
}, initialState)