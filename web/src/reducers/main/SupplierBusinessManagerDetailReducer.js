import {handleActions} from 'redux-actions';
import {SupplierBusinessManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 供应商业务：业务详情
    supplierBusinessInfo: [],

    // 开始位置
    detailStart: 0,
    // 每页数量
    detailSize: 8,
    // 检索结果数量
    detailDataSize: 0,
    // 检索条件：线路编号
    conditionLoadTaskId: '',
    // 检索条件：订单编号
    conditionOrderId: '',
    // 检索条件：起始城市
    conditionStartCity: null,
    // 检索条件：目的城市
    conditionEndCity: null,
    // 检索条件：运输方式
    conditionTransMode: null,
    // 检索条件：创建时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：创建时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：送达日期(始)
    conditionArriveStart: '',
    // 检索条件：送达日期(终)
    conditionArriveEnd: '',
    // 检索条件：状态
    conditionPaymentStatus: null,

    // 线路列表
    loadTaskArray: []
};

export default handleActions({
    [SupplierBusinessManagerDetailActionType.getSupplierBusinessInfo]: (state, action) => {
        return {
            ...state,
            supplierBusinessInfo: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.getLoadTaskList]: (state, action) => {
        return {
            ...state,
            loadTaskArray: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setDetailStartNumber]: (state, action) => {
        return {
            ...state,
            detailStart: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setDetailDataSize]: (state, action) => {
        return {
            ...state,
            detailDataSize: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionLoadTaskId]: (state, action) => {
        return {
            ...state,
            conditionLoadTaskId: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionStartCity]: (state, action) => {
        return {
            ...state,
            conditionStartCity: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionEndCity]: (state, action) => {
        return {
            ...state,
            conditionEndCity: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionTransMode]: (state, action) => {
        return {
            ...state,
            conditionTransMode: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionArriveStart]: (state, action) => {
        return {
            ...state,
            conditionArriveStart: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionArriveEnd]: (state, action) => {
        return {
            ...state,
            conditionArriveEnd: action.payload
        }
    },
    [SupplierBusinessManagerDetailActionType.setConditionPaymentStatus]: (state, action) => {
        return {
            ...state,
            conditionPaymentStatus: action.payload
        }
    }
}, initialState)