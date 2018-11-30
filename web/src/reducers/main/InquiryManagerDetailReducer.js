import {handleActions} from 'redux-actions';
import {InquiryManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 订单信息TAB - 订单详情
    orderInfo: [],
    // 订单信息TAB：订单内，商品列表
    productArray: [],
    // 订单信息TAB - 支付信息
    paymentInfo: [],
    // 订单信息TAB - 发货信息
    logInfo: [],

    // 售后信息TAB：售后信息
    feedBackInfo: [],
    // 售后信息TAB：处理描述
    processRemark: '',
    // 售后信息TAB：处理方法
    processMethod: ''
};

export default handleActions({
    [InquiryManagerDetailActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [InquiryManagerDetailActionType.getProductList]: (state, action) => {
        return {
            ...state,
            productArray: action.payload
        }
    },
    [InquiryManagerDetailActionType.getPaymentInfo]: (state, action) => {
        return {
            ...state,
            paymentInfo: action.payload
        }
    },
    [InquiryManagerDetailActionType.getLogInfo]: (state, action) => {
        return {
            ...state,
            logInfo: action.payload
        }
    },

    [InquiryManagerDetailActionType.getFeedBackInfo]: (state, action) => {
        return {
            ...state,
            feedBackInfo: action.payload
        }
    },
    [InquiryManagerDetailActionType.setProcessRemark]: (state, action) => {
        return {
            ...state,
            processRemark: action.payload
        }
    },
    [InquiryManagerDetailActionType.setProcessMethod]: (state, action) => {
        return {
            ...state,
            processMethod: action.payload
        }
    }
}, initialState)