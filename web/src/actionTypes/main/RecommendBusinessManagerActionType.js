import {createAction} from 'redux-actions';

export const getRecommendBusinessList = createAction('GET_RECOMMEND_BUSINESS_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionRecommendId = createAction('SET_CONDITION_RECOMMEND_ID');
export const setConditionRecommendName = createAction('SET_CONDITION_RECOMMEND_NAME');
export const setConditionRecommendOnStart = createAction('SET_CONDITION_RECOMMEND_ON_START');
export const setConditionRecommendOnEnd = createAction('SET_CONDITION_RECOMMEND_ON_END');