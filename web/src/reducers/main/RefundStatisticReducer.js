import {handleActions} from 'redux-actions';
import {RefundStatisticActionType} from '../../actionTypes';

const initialState = {
    // 按月统计：开始月
    monthStart: '',
    // 按月统计：终了月
    monthEnd: '',
    // 按日统计：统计日数
    daySize: ''
};

export default handleActions({
    [RefundStatisticActionType.setMonthStart]: (state, action) => {
        return {
            ...state,
            monthStart: action.payload
        }
    },
    [RefundStatisticActionType.setMonthEnd]: (state, action) => {
        return {
            ...state,
            monthEnd: action.payload
        }
    },
    [RefundStatisticActionType.setDaySize]: (state, action) => {
        return {
            ...state,
            daySize: action.payload
        }
    }
}, initialState)