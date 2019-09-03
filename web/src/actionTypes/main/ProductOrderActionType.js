import {createAction} from 'redux-actions';

export const getProductOrderList = createAction('GET_PRODUCT_ORDER_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionId = createAction('SET_CONDITION_PRODUCT_ORDER_ID');
export const setConditionProduct = createAction('SET_CONDITION_PRODUCT_ORDER_PRODUCT_ID');
export const setConditionCity = createAction('SET_CONDITION_PRODUCT_ORDER_CITY');
export const setConditionOrderStatus = createAction('SET_CONDITION_PRODUCT_ORDER_STATUS');
export const setConditionUserId = createAction('SET_CONDITION_PRODUCT_ORDER_USER_ID');
export const setConditionNickname = createAction('SET_CONDITION_PRODUCT_ORDER_NICKNAME');
export const setConditionPhone = createAction('SET_CONDITION_PRODUCT_ORDER_PHONE');
export const setConditionPaymentStatus = createAction('SET_CONDITION_PRODUCT_ORDER_PAYMENT_STATUS');