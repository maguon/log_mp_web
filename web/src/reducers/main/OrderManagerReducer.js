import {handleActions} from 'redux-actions';
import {OrderManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：编号
    conditionNo: '',
    // 检索条件：下单人
    conditionOrderUser: '',
    // 检索条件：电话
    conditionPhone: '',
    // 检索条件：起始城市
    conditionStartCity: null,
    // 检索条件：目的城市
    conditionEndCity: null,
    // 检索条件：服务方式
    conditionServiceType: null,

    // 检索条件：订单类型
    conditionOrderType: null,
    // 检索条件：创建时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：创建时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：物流状态
    conditionLogStatus: null,
    // 检索条件：支付状态
    conditionPaymentStatus: null,
    // 检索条件：订单状态
    conditionOrderStatus: null,

    // 订单检索结果列表
    orderArray: []
};

export default handleActions({
    [OrderManagerActionType.getOrderList]: (state, action) => {
        return {
            ...state,
            orderArray: action.payload
        }
    },
    [OrderManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [OrderManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [OrderManagerActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [OrderManagerActionType.setConditionOrderUser]: (state, action) => {
        return {
            ...state,
            conditionOrderUser: action.payload
        }
    },
    [OrderManagerActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [OrderManagerActionType.setConditionStartCity]: (state, action) => {
        return {
            ...state,
            conditionStartCity: action.payload
        }
    },
    [OrderManagerActionType.setConditionEndCity]: (state, action) => {
        return {
            ...state,
            conditionEndCity: action.payload
        }
    },
    [OrderManagerActionType.setConditionServiceType]: (state, action) => {
        return {
            ...state,
            conditionServiceType: action.payload
        }
    },
    [OrderManagerActionType.setConditionOrderType]: (state, action) => {
        return {
            ...state,
            conditionOrderType: action.payload
        }
    },
    [OrderManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [OrderManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [OrderManagerActionType.setConditionLogStatus]: (state, action) => {
        return {
            ...state,
            conditionLogStatus: action.payload
        }
    },
    [OrderManagerActionType.setConditionPaymentStatus]: (state, action) => {
        return {
            ...state,
            conditionPaymentStatus: action.payload
        }
    },
    [OrderManagerActionType.setConditionOrderStatus]: (state, action) => {
        return {
            ...state,
            conditionOrderStatus: action.payload
        }
    },
}, initialState)