import {handleActions} from 'redux-actions';
import {RecommendBusinessManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：推荐人编号
    conditionRecommendId: '',
    // 检索条件：推荐人
    conditionRecommendName: '',
    // 检索条件：推荐时间(始)
    conditionRecommendOnStart: '',
    // 检索条件：推荐时间(终)
    conditionRecommendOnEnd: '',

    // 推荐人业绩 结果列表
    recommendBusinessArray: []
};

export default handleActions({
    [RecommendBusinessManagerActionType.getRecommendBusinessList]: (state, action) => {
        return {
            ...state,
            recommendBusinessArray: action.payload
        }
    },
    [RecommendBusinessManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [RecommendBusinessManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [RecommendBusinessManagerActionType.setConditionRecommendId]: (state, action) => {
        return {
            ...state,
            conditionRecommendId: action.payload
        }
    },
    [RecommendBusinessManagerActionType.setConditionRecommendName]: (state, action) => {
        return {
            ...state,
            conditionRecommendName: action.payload
        }
    },
    [RecommendBusinessManagerActionType.setConditionRecommendOnStart]: (state, action) => {
        return {
            ...state,
            conditionRecommendOnStart: action.payload
        }
    },
    [RecommendBusinessManagerActionType.setConditionRecommendOnEnd]: (state, action) => {
        return {
            ...state,
            conditionRecommendOnEnd: action.payload
        }
    }
}, initialState)