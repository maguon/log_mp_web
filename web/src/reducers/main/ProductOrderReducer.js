import {handleActions} from 'redux-actions';
import {ProductOrderActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：编号
    conditionId: '',
    // 检索条件：商品
    conditionProduct: null,
    // 检索条件：城市
    conditionCity: null,
    // 检索条件：订单状态
    conditionOrderStatus: null,
    // 检索条件：用户ID
    conditionUserId: '',
    // 检索条件：昵称
    conditionNickname: '',
    // 检索条件：手机
    conditionPhone: '',
    // 检索条件：支付状态
    conditionPaymentStatus: null,

    // 商品订单列表
    productOrderArray: []
};

export default handleActions({
    [ProductOrderActionType.getProductOrderList]: (state, action) => {
        return {
            ...state,
            productOrderArray: action.payload
        }
    },
    [ProductOrderActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [ProductOrderActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [ProductOrderActionType.setConditionId]: (state, action) => {
        return {
            ...state,
            conditionId: action.payload
        }
    },
    [ProductOrderActionType.setConditionProduct]: (state, action) => {
        return {
            ...state,
            conditionProduct: action.payload
        }
    },
    [ProductOrderActionType.setConditionCity]: (state, action) => {
        return {
            ...state,
            conditionCity: action.payload
        }
    },
    [ProductOrderActionType.setConditionOrderStatus]: (state, action) => {
        return {
            ...state,
            conditionOrderStatus: action.payload
        }
    },
    [ProductOrderActionType.setConditionUserId]: (state, action) => {
        return {
            ...state,
            conditionUserId: action.payload
        }
    },
    [ProductOrderActionType.setConditionNickname]: (state, action) => {
        return {
            ...state,
            conditionNickname: action.payload
        }
    },
    [ProductOrderActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [ProductOrderActionType.setConditionPaymentStatus]: (state, action) => {
        return {
            ...state,
            conditionPaymentStatus: action.payload
        }
    }
}, initialState)