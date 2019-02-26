import {handleActions} from 'redux-actions';
import {RecommendBusinessManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 推广人基本信息
    recommendInfo: [],

    // 开始位置
    detailStart: 0,
    // 每页数量
    detailSize: 8,
    // 检索结果数量
    detailDataSize: 0,
    // 检索条件：选择时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：选择时间(终)
    conditionCreatedOnEnd: '',

    // 线路列表
    userArray: []
};

export default handleActions({
    [RecommendBusinessManagerDetailActionType.getRecommendInfo]: (state, action) => {
        return {
            ...state,
            recommendInfo: action.payload
        }
    },
    [RecommendBusinessManagerDetailActionType.getUserList]: (state, action) => {
        return {
            ...state,
            userArray: action.payload
        }
    },
    [RecommendBusinessManagerDetailActionType.setDetailStartNumber]: (state, action) => {
        return {
            ...state,
            detailStart: action.payload
        }
    },
    [RecommendBusinessManagerDetailActionType.setDetailDataSize]: (state, action) => {
        return {
            ...state,
            detailDataSize: action.payload
        }
    },
    [RecommendBusinessManagerDetailActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [RecommendBusinessManagerDetailActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)