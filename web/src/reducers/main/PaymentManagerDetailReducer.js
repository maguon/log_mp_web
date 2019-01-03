import {handleActions} from 'redux-actions';
import {PaymentManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 支付信息
    paymentInfo: []
};

export default handleActions({
    [PaymentManagerDetailActionType.getPaymentInfo]: (state, action) => {
        return {
            ...state,
            paymentInfo: action.payload
        }
    }
}, initialState)