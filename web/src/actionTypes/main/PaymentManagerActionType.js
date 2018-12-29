import {createAction} from 'redux-actions';

export const getPaymentList = createAction('GET_PAYMENT_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionOrderId = createAction('SET_CONDITION_ORDER_ID');
export const setConditionPaymentMode = createAction('SET_CONDITION_PAYMENT_MODE');
export const setConditionPaymentType = createAction('SET_CONDITION_PAYMENT_TYPE');
export const setConditionCreateUser = createAction('SET_CONDITION_CREATE_USER');
export const setConditionBank = createAction('SET_CONDITION_BANK');
export const setConditionBankUser = createAction('SET_CONDITION_BANK_USER');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionPaymentStatus = createAction('SET_CONDITION_PAYMENT_STATUS');