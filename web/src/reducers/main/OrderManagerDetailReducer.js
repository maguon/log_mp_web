import {handleActions} from 'redux-actions';
import {OrderManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 订单信息TAB：订单信息
    orderInfo: [],
    // 订单信息TAB：订单备注
    orderRemark: '',


    // 收发货信息TAB：列表
    logInfoArray: [],
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



    [OrderManagerDetailActionType.getLogInfoList]: (state, action) => {
        return {
            ...state,
            logInfoArray: action.payload
        }
    },
    [OrderManagerDetailActionType.getBankCardList]: (state, action) => {
        return {
            ...state,
            bankCardArray: action.payload
        }
    },
    [OrderManagerDetailActionType.getInvoiceList]: (state, action) => {
        return {
            ...state,
            invoiceArray: action.payload
        }
    }
}, initialState)