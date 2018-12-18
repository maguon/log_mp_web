import {createAction} from 'redux-actions';

export const getOrderList = createAction('GET_ORDER_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionOrderUser = createAction('SET_CONDITION_ORDER_USER');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionStartCity = createAction('SET_CONDITION_START_CITY');
export const setConditionEndCity = createAction('SET_CONDITION_END_CITY');
export const setConditionServiceType = createAction('SET_CONDITION_SERVICE_TYPE');
export const setConditionOrderType = createAction('SET_CONDITION_ORDER_TYPE');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionLogStatus = createAction('SET_CONDITION_LOG_STATUS');
export const setConditionPaymentStatus = createAction('SET_CONDITION_PAYMENT_STATUS');
export const setConditionOrderStatus = createAction('SET_CONDITION_ORDER_STATUS');