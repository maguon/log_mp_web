import {handleActions} from 'redux-actions';
import {LoadTaskPaymentManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：线路编号
    conditionLoadTaskId: '',
    // 检索条件：供应商
    conditionSupplier: null,
    // 检索条件：起始城市
    conditionStartCity: null,
    // 检索条件：目的城市
    conditionEndCity: null,
    // 检索条件：订单编号
    conditionOrderId: '',
    // 检索条件：付款时间(始)
    conditionPaymentOnStart: '',
    // 检索条件：付款时间(终)
    conditionPaymentOnEnd: '',
    // 检索条件：状态
    conditionPaymentStatus: null,

    // 线路列表
    loadTaskArray: []
};

export default handleActions({
    [LoadTaskPaymentManagerActionType.getLoadTaskList]: (state, action) => {
        return {
            ...state,
            loadTaskArray: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setConditionLoadTaskId]: (state, action) => {
        return {
            ...state,
            conditionLoadTaskId: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setConditionSupplier]: (state, action) => {
        return {
            ...state,
            conditionSupplier: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setConditionStartCity]: (state, action) => {
        return {
            ...state,
            conditionStartCity: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setConditionEndCity]: (state, action) => {
        return {
            ...state,
            conditionEndCity: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setConditionPaymentOnStart]: (state, action) => {
        return {
            ...state,
            conditionPaymentOnStart: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setConditionPaymentOnEnd]: (state, action) => {
        return {
            ...state,
            conditionPaymentOnEnd: action.payload
        }
    },
    [LoadTaskPaymentManagerActionType.setConditionPaymentStatus]: (state, action) => {
        return {
            ...state,
            conditionPaymentStatus: action.payload
        }
    }
}, initialState)