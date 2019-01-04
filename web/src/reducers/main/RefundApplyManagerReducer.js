import {handleActions} from 'redux-actions';
import {RefundApplyManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：退款编号
    conditionNo: '',
    // 检索条件：订单编号
    conditionOrderId: '',
    // 检索条件：订单类型
    conditionOrderType: null,
    // 检索条件：退款方式
    conditionRefundMode: null,
    // 检索条件：订单创建人
    conditionCreateUser: '',

    // 检索条件：申请时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：申请时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：处理时间(始)
    conditionOperationStart: '',
    // 检索条件：处理时间(终)
    conditionOperationEnd: '',
    // 检索条件：支付状态
    conditionStatus: null,

    // 退款申请检索结果列表
    refundApplyArray: []
};

export default handleActions({
    [RefundApplyManagerActionType.getRefundApplyList]: (state, action) => {
        return {
            ...state,
            refundApplyArray: action.payload
        }
    },
    [RefundApplyManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [RefundApplyManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionNo]: (state, action) => {
        return {
            ...state,
            conditionNo: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionOrderType]: (state, action) => {
        return {
            ...state,
            conditionOrderType: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionRefundMode]: (state, action) => {
        return {
            ...state,
            conditionRefundMode: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionCreateUser]: (state, action) => {
        return {
            ...state,
            conditionCreateUser: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionOperationStart]: (state, action) => {
        return {
            ...state,
            conditionOperationStart: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionOperationEnd]: (state, action) => {
        return {
            ...state,
            conditionOperationEnd: action.payload
        }
    },
    [RefundApplyManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)