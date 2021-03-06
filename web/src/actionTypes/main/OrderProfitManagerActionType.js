import {createAction} from 'redux-actions';

export const getOrderProfitArray = createAction('GET_ORDER_PROFIT_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionOrderId = createAction('SET_CONDITION_ORDER_ID');
export const setConditionStartCity = createAction('SET_CONDITION_START_CITY');
export const setConditionEndCity = createAction('SET_CONDITION_END_CITY');
export const setConditionServiceType = createAction('SET_CONDITION_SERVICE_TYPE');
export const setConditionOrderCreatedUser = createAction('SET_CONDITION_ORDER_CREATED_USER');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionStatus = createAction('SET_CONDITION_STATUS');