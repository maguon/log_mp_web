import {handleActions} from 'redux-actions';
import {ProductOrderRefundModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 商品订单编号
    productOrderId: '',
    // 商品订单支付编号
    productPaymentId: '',
    // 退款金额
    refundFee: ''
};

export default handleActions({
    [ProductOrderRefundModalActionType.setProductOrderId]: (state, action) => {
        return {
            ...state,
            productOrderId: action.payload
        }
    },
    [ProductOrderRefundModalActionType.setProductPaymentId]: (state, action) => {
        return {
            ...state,
            productPaymentId: action.payload
        }
    },
    [ProductOrderRefundModalActionType.setRefundFee]: (state, action) => {
        return {
            ...state,
            refundFee: action.payload
        }
    }
}, initialState)