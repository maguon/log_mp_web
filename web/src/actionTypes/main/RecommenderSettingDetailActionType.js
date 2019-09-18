import {createAction} from 'redux-actions';

export const setRecommendId = createAction('SET_DETAIL_RECOMMEND_ID');
export const setRecommendName = createAction('SET_DETAIL_RECOMMEND_NAME');
export const setIntroduction = createAction('SET_DETAIL_RECOMMEND_INTRODUCTION');
export const setPageUrl = createAction('SET_DETAIL_RECOMMEND_PAGE_URL');
export const setMpUrl = createAction('SET_DETAIL_RECOMMEND_MP_URL');
export const setContent = createAction('SET_DETAIL_RECOMMEND_CONTENT');