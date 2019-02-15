import {handleActions} from 'redux-actions';
import {LoadTaskManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：线路编号
    conditionLoadTaskId: '',
    // 检索条件：订单编号
    conditionOrderId: '',
    // 检索条件：服务方式
    conditionServiceType: null,
    // 检索条件：起始城市
    conditionStartCity: null,
    // 检索条件：目的城市
    conditionEndCity: null,
    // 检索条件：运输方式
    conditionTransMode: null,
    // 检索条件：供应商
    conditionSupplier: null,
    // 检索条件：创建时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：创建时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：计划发运日期(始)
    conditionPlanStart: '',
    // 检索条件：计划发运日期(终)
    conditionPlanEnd: '',
    // 检索条件：状态
    conditionStatus: null,

    // 线路列表
    loadTaskArray: []
};

export default handleActions({
    [LoadTaskManagerActionType.getLoadTaskList]: (state, action) => {
        return {
            ...state,
            loadTaskArray: action.payload
        }
    },
    [LoadTaskManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [LoadTaskManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionLoadTaskId]: (state, action) => {
        return {
            ...state,
            conditionLoadTaskId: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionServiceType]: (state, action) => {
        return {
            ...state,
            conditionServiceType: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionStartCity]: (state, action) => {
        return {
            ...state,
            conditionStartCity: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionEndCity]: (state, action) => {
        return {
            ...state,
            conditionEndCity: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionTransMode]: (state, action) => {
        return {
            ...state,
            conditionTransMode: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionSupplier]: (state, action) => {
        return {
            ...state,
            conditionSupplier: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionPlanStart]: (state, action) => {
        return {
            ...state,
            conditionPlanStart: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionPlanEnd]: (state, action) => {
        return {
            ...state,
            conditionPlanEnd: action.payload
        }
    },
    [LoadTaskManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)