import {createAction} from 'redux-actions';

export const getInquiryList = createAction('GET_INQUIRY_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionUser = createAction('SET_CONDITION_USER');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionStartCity = createAction('SET_CONDITION_START_CITY');
export const setConditionEndCity = createAction('SET_CONDITION_END_CITY');
export const setConditionServiceType = createAction('SET_CONDITION_SERVICE_TYPE');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionInquiryStatus = createAction('SET_CONDITION_INQUIRY_STATUS');