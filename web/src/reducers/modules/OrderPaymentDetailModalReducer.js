import {handleActions} from 'redux-actions';
import {OrderPaymentDetailModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 订单编号
    orderId: ''
};

export default handleActions({
    [OrderPaymentDetailModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    }
}, initialState)