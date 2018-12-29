import {handleActions} from 'redux-actions';
import {PaymentManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 支付信息
    paymentInfo: [],
    // 订单信息
    orderInfo: []
};

export default handleActions({
    [PaymentManagerDetailActionType.getPaymentInfo]: (state, action) => {
        return {
            ...state,
            paymentInfo: action.payload
        }
    },
    [PaymentManagerDetailActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    }
}, initialState)