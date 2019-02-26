import {createAction} from 'redux-actions';

export const getRecommendInfo = createAction('GET_RECOMMEND_BUSINESS_DETAIL_INFO');
export const getUserList = createAction('GET_RECOMMEND_BUSINESS_DETAIL_USER_LIST');
export const setDetailStartNumber = createAction('SET_RECOMMEND_BUSINESS_DETAIL_START_NUMBER');
export const setDetailDataSize = createAction('SET_RECOMMEND_BUSINESS_DETAIL_DATA_SIZE');
export const setConditionCreatedOnStart = createAction('SET_RECOMMEND_BUSINESS_DETAIL_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_RECOMMEND_BUSINESS_DETAIL_CONDITION_CREATED_ON_END');