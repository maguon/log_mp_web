import {handleActions} from 'redux-actions';
import {OrderProfitManagerDetailActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 订单利润 详情
    orderProfitInfo: []
};

export default handleActions({
    [OrderProfitManagerDetailActionType.getOrderProfitInfo]: (state, action) => {
        return {
            ...state,
            orderProfitInfo: action.payload
        }
    }
}, initialState)