import {handleActions} from 'redux-actions';
import {ProductPaymentDetailActionType} from '../../actionTypes';

const initialState = {
    // 支付信息
    productPaymentInfo: []
};

export default handleActions({
    [ProductPaymentDetailActionType.getProductPaymentInfo]: (state, action) => {
        return {
            ...state,
            productPaymentInfo: action.payload
        }
    }
}, initialState)