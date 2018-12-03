import {createAction} from 'redux-actions';

export const getUserList = createAction('GET_USER_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');

export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionWeChatNm = createAction('SET_CONDITION_WE_CHAT_NAME');
// export const setConditionUser = createAction('SET_CONDITION_USER');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionWeStatus = createAction('SET_CONDITION_WE_STATUS');
export const setConditionAuthStatus = createAction('SET_CONDITION_AUTH_STATUS');

export const setConditionAuthTimeStart = createAction('SET_CONDITION_AUTH_TIME_START');
export const setConditionAuthTimeEnd = createAction('SET_CONDITION_AUTH_TIME_END');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');

