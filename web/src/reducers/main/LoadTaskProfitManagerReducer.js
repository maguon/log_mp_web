import {handleActions} from 'redux-actions';
import {LoadTaskProfitManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：VIN
    conditionVin: '',
    // 检索条件：起始城市
    conditionStartCity: null,
    // 检索条件：目的城市
    conditionEndCity: null,
    // 检索条件：服务方式
    conditionServiceType: null,
    // 检索条件：订单编号
    conditionOrderId: '',
    // 检索条件：创建时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：创建时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：状态
    conditionStatus: null,

    // 车辆利润列表
    loadTaskProfitArray: []
};

export default handleActions({
    [LoadTaskProfitManagerActionType.getLoadTaskProfitArray]: (state, action) => {
        return {
            ...state,
            loadTaskProfitArray: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setConditionVin]: (state, action) => {
        return {
            ...state,
            conditionVin: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setConditionStartCity]: (state, action) => {
        return {
            ...state,
            conditionStartCity: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setConditionEndCity]: (state, action) => {
        return {
            ...state,
            conditionEndCity: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setConditionServiceType]: (state, action) => {
        return {
            ...state,
            conditionServiceType: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [LoadTaskProfitManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)