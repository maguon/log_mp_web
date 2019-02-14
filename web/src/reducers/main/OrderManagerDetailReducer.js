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
    // 支付信息TAB：申请退款 列表长度
    orderPaymentSize: 0,
    // 支付信息TAB：支付列表
    orderPaymentArray: [],
    // 支付信息TAB：支付列表
    orderRefundApplyArray: [],
    // 订单信息TAB：订单的支付备注
    orderPaymentRemark: '',

    // // 运输信息TAB：运输需求基本信息
    // transDemandInfo: [],
    // // 运输信息TAB：线路安排列表
    // loadTaskArray: [],

    // 发票信息TAB：列表
    invoiceArray: [],
    // 操作记录TAB：列表
    operationArray: []
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
    [OrderManagerDetailActionType.setOrderPaymentPaidSize]: (state, action) => {
        return {
            ...state,
            orderPaymentSize: action.payload
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
    },
    [OrderManagerDetailActionType.setOrderPaymentRemark]: (state, action) => {
        return {
            ...state,
            orderPaymentRemark: action.payload
        }
    },

    // [OrderManagerDetailActionType.getTransDemandInfo]: (state, action) => {
    //     return {
    //         ...state,
    //         transDemandInfo: action.payload
    //     }
    // },
    // [OrderManagerDetailActionType.getLoadTaskList]: (state, action) => {
    //     return {
    //         ...state,
    //         loadTaskArray: action.payload
    //     }
    // },

    [OrderManagerDetailActionType.getInvoiceArray]: (state, action) => {
        return {
            ...state,
            invoiceArray: action.payload
        }
    }
}, initialState)