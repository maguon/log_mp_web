import {handleActions} from 'redux-actions';
import {OrderManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 订单信息TAB：订单信息
    orderInfo: [],
    // 订单信息TAB：订单备注
    orderRemark: '',
    // 支付信息TAB：已支付
    orderPaymentPaid: 0,
    // 支付信息TAB：已退款
    orderPaymentRefund: 0,
    // 支付信息TAB：支付列表
    orderPaymentArray: [],
    // 支付信息TAB：支付列表
    orderRefundApplyArray: [],


    // 银行卡TAB：列表
    bankCardArray: [],
    // 发票信息TAB：列表
    invoiceArray: []
};

export default handleActions({
    [OrderManagerDetailActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [OrderManagerDetailActionType.setOrderRemark]: (state, action) => {
        return {
            ...state,
            orderRemark: action.payload
        }
    },
    [OrderManagerDetailActionType.setOrderPaymentPaid]: (state, action) => {
        return {
            ...state,
            orderPaymentPaid: action.payload
        }
    },
    [OrderManagerDetailActionType.setOrderPaymentRefund]: (state, action) => {
        return {
            ...state,
            orderPaymentRefund: action.payload
        }
    },
    [OrderManagerDetailActionType.getOrderPaymentArray]: (state, action) => {
        return {
            ...state,
            orderPaymentArray: action.payload
        }
    },
    [OrderManagerDetailActionType.getOrderRefundApplyArray]: (state, action) => {
        return {
            ...state,
            orderRefundApplyArray: action.payload
        }
    }
}, initialState)