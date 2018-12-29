import {handleActions} from 'redux-actions';
import {PaymentManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：编号
    conditionNo: '',
    // 检索条件：订单编号
    conditionOrderId: '',
    // 检索条件：支付方式
    conditionPaymentMode: null,
    // 检索条件：支付类型
    conditionPaymentType: null,
    // 检索条件：创建人
    conditionCreateUser: '',
    // 检索条件：付款银行
    conditionBank: '',
    // 检索条件：户主
    conditionBankUser: '',
    // 检索条件：提交时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：提交时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：支付状态
    conditionPaymentStatus: null,

    // 支付检索结果列表
    paymentArray: []
};

export default handleActions({
    [PaymentManagerActionType.getPaymentList]: (state, action) => {
        return {
            ...state,
            paymentArray: action.payload
        }
    },
    [PaymentManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [PaymentManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [PaymentManagerActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [PaymentManagerActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [PaymentManagerActionType.setConditionPaymentMode]: (state, action) => {
        return {
            ...state,
            conditionPaymentMode: action.payload
        }
    },
    [PaymentManagerActionType.setConditionPaymentType]: (state, action) => {
        return {
            ...state,
            conditionPaymentType: action.payload
        }
    },
    [PaymentManagerActionType.setConditionCreateUser]: (state, action) => {
        return {
            ...state,
            conditionCreateUser: action.payload
        }
    },
    [PaymentManagerActionType.setConditionBank]: (state, action) => {
        return {
            ...state,
            conditionBank: action.payload
        }
    },
    [PaymentManagerActionType.setConditionBankUser]: (state, action) => {
        return {
            ...state,
            conditionBankUser: action.payload
        }
    },
    [PaymentManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [PaymentManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [PaymentManagerActionType.setConditionPaymentStatus]: (state, action) => {
        return {
            ...state,
            conditionPaymentStatus: action.payload
        }
    }
}, initialState)