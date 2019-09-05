import {handleActions} from 'redux-actions';
import {ProductPaymentActionType} from '../../actionTypes';

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
    // 检索条件：支付类型
    conditionPaymentType: null,
    // 检索条件：支付状态
    conditionPaymentStatus: null,

    // 支付检索结果列表
    productPaymentArray: []
};

export default handleActions({
    [ProductPaymentActionType.getProductPaymentList]: (state, action) => {
        return {
            ...state,
            productPaymentArray: action.payload
        }
    },
    [ProductPaymentActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [ProductPaymentActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [ProductPaymentActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [ProductPaymentActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [ProductPaymentActionType.setConditionPaymentType]: (state, action) => {
        return {
            ...state,
            conditionPaymentType: action.payload
        }
    },
    [ProductPaymentActionType.setConditionPaymentStatus]: (state, action) => {
        return {
            ...state,
            conditionPaymentStatus: action.payload
        }
    }
}, initialState)