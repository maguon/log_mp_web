import {handleActions} from 'redux-actions';
import {NewRecommenderModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 推荐人名称
    recommendName: '',
    // 推荐人简介
    introduction: '',
    // 保存成功后的推荐人编号
    newRecommendId: ''
};

export default handleActions({
    [NewRecommenderModalActionType.setCommendName]: (state, action) => {
        return {
            ...state,
            recommendName: action.payload
        }
    },
    [NewRecommenderModalActionType.setCommendIntroduction]: (state, action) => {
        return {
            ...state,
            introduction: action.payload
        }
    },
    [NewRecommenderModalActionType.setNewRecommendId]: (state, action) => {
        return {
            ...state,
            newRecommendId: action.payload
        }
    }
}, initialState)