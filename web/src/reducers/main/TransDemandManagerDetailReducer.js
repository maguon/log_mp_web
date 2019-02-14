import {handleActions} from 'redux-actions';
import {TransDemandManagerDetailActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 运输需求基本信息
    transDemandInfo: [],
    // 线路安排列表
    loadTaskArray: []
};

export default handleActions({
    [TransDemandManagerDetailActionType.getTransDemandInfo]: (state, action) => {
        return {
            ...state,
            transDemandInfo: action.payload
        }
    },
    [TransDemandManagerDetailActionType.getLoadTaskList]: (state, action) => {
        return {
            ...state,
            loadTaskArray: action.payload
        }
    }
}, initialState)