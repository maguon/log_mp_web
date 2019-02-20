import {handleActions} from 'redux-actions';
import {OrderProfitManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：订单编号
    conditionOrderId: '',
    // 检索条件：起始城市
    conditionStartCity: null,
    // 检索条件：目的城市
    conditionEndCity: null,
    // 检索条件：服务方式
    conditionServiceType: null,
    // 检索条件：订单创建人
    conditionOrderCreatedUser: null,
    // 检索条件：创建时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：创建时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：状态
    conditionStatus: null,

    // 订单利润列表
    orderProfitArray: []
};

export default handleActions({
    [OrderProfitManagerActionType.getOrderProfitArray]: (state, action) => {
        return {
            ...state,
            orderProfitArray: action.payload
        }
    },
    [OrderProfitManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [OrderProfitManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [OrderProfitManagerActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [OrderProfitManagerActionType.setConditionStartCity]: (state, action) => {
        return {
            ...state,
            conditionStartCity: action.payload
        }
    },
    [OrderProfitManagerActionType.setConditionEndCity]: (state, action) => {
        return {
            ...state,
            conditionEndCity: action.payload
        }
    },
    [OrderProfitManagerActionType.setConditionServiceType]: (state, action) => {
        return {
            ...state,
            conditionServiceType: action.payload
        }
    },
    [OrderProfitManagerActionType.setConditionOrderCreatedUser]: (state, action) => {
        return {
            ...state,
            conditionOrderCreatedUser: action.payload
        }
    },
    [OrderProfitManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [OrderProfitManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [OrderProfitManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)