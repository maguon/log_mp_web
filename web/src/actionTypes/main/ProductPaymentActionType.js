import {createAction} from 'redux-actions';

export const getProductPaymentList = createAction('GET_PRODUCT_PAYMENT_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_PRODUCT_PAYMENT_NO');
export const setConditionOrderId = createAction('SET_CONDITION_PRODUCT_PAYMENT_ORDER_ID');
export const setConditionPaymentType = createAction('SET_CONDITION_PRODUCT_PAYMENT_TYPE');
export const setConditionPaymentStatus = createAction('SET_CONDITION_PRODUCT_PAYMENT_STATUS');