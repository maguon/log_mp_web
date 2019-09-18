import {handleActions} from 'redux-actions';
import {RecommenderSettingDetailActionType} from '../../actionTypes';

const initialState = {
    // 推荐人编号
    recommendId: '',
    // 推荐人名称
    recommendName: '',
    // 推荐人简介
    introduction: '',
    // 二维码首页URL
    pageUrl: '',
    // 小程序码
    mpUrl: '',
    // 广告语
    content: ''
};

export default handleActions({
    [RecommenderSettingDetailActionType.setRecommendId]: (state, action) => {
        return {
            ...state,
            recommendId: action.payload
        }
    },
    [RecommenderSettingDetailActionType.setRecommendName]: (state, action) => {
        return {
            ...state,
            recommendName: action.payload
        }
    },
    [RecommenderSettingDetailActionType.setIntroduction]: (state, action) => {
        return {
            ...state,
            introduction: action.payload
        }
    },
    [RecommenderSettingDetailActionType.setPageUrl]: (state, action) => {
        return {
            ...state,
            pageUrl: action.payload
        }
    },
    [RecommenderSettingDetailActionType.setMpUrl]: (state, action) => {
        return {
            ...state,
            mpUrl: action.payload
        }
    },
    [RecommenderSettingDetailActionType.setContent]: (state, action) => {
        return {
            ...state,
            content: action.payload
        }
    }
}, initialState)