import {handleActions} from 'redux-actions';
import {ProductOrderDetailActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 订单详细信息
    productOrderInfo: [],
    // 订单备注
    orderRemark: '',
    // 订单支付信息
    productOrderPaymentInfo: []
};

export default handleActions({
    [ProductOrderDetailActionType.getProductOrderInfo]: (state, action) => {
        return {
            ...state,
            productOrderInfo: action.payload
        }
    },
    [ProductOrderDetailActionType.setProductOrderRemark]: (state, action) => {
        return {
            ...state,
            orderRemark: action.payload
        }
    },
    [ProductOrderDetailActionType.getProductOrderPaymentInfo]: (state, action) => {
        return {
            ...state,
            productOrderPaymentInfo: action.payload
        }
    }
}, initialState)