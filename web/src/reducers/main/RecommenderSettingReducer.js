import {handleActions} from 'redux-actions';
import {RecommenderSettingActionType} from '../../actionTypes';

const initialState = {
    // 推荐人编号
    recommendId: '',
    // 推荐人
    recommendName: '',
    // 推荐人列表
    recommendArray: []
};

export default handleActions({
    [RecommenderSettingActionType.getRecommendList]: (state, action) => {
        return {
            ...state,
            recommendArray: action.payload
        }
    },
    [RecommenderSettingActionType.setRecommendId]: (state, action) => {
        return {
            ...state,
            recommendId: action.payload
        }
    },
    [RecommenderSettingActionType.setRecommendName]: (state, action) => {
        return {
            ...state,
            recommendName: action.payload
        }
    }
}, initialState)