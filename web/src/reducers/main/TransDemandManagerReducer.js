import {handleActions} from 'redux-actions';
import {TransDemandManagerActionType} from '../../actionTypes';

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
    // 检索条件：需求创建时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：需求创建时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：状态
    conditionStatus: null,

    // 运输需求列表
    transDemandArray: []
};

export default handleActions({
    [TransDemandManagerActionType.getTransDemandList]: (state, action) => {
        return {
            ...state,
            transDemandArray: action.payload
        }
    },
    [TransDemandManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [TransDemandManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    
    
    
    [TransDemandManagerActionType.setConditionOrderId]: (state, action) => {
        return {
            ...state,
            conditionOrderId: action.payload
        }
    },
    [TransDemandManagerActionType.setConditionStartCity]: (state, action) => {
        return {
            ...state,
            conditionStartCity: action.payload
        }
    },
    [TransDemandManagerActionType.setConditionEndCity]: (state, action) => {
        return {
            ...state,
            conditionEndCity: action.payload
        }
    },
    [TransDemandManagerActionType.setConditionServiceType]: (state, action) => {
        return {
            ...state,
            conditionServiceType: action.payload
        }
    },





    [TransDemandManagerActionType.setConditionOrderCreatedUser]: (state, action) => {
        return {
            ...state,
            conditionOrderCreatedUser: action.payload
        }
    },
    [TransDemandManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [TransDemandManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [TransDemandManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)