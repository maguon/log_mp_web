import {createAction} from 'redux-actions';

export const getLoadTaskList = createAction('GET_LOAD_TASK_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionLoadTaskId = createAction('SET_CONDITION_LOAD_TASK_ID');
export const setConditionSupplier = createAction('SET_CONDITION_SUPPLIER');
export const setConditionStartCity = createAction('SET_CONDITION_START_CITY');
export const setConditionEndCity = createAction('SET_CONDITION_END_CITY');
export const setConditionOrderId = createAction('SET_CONDITION_ORDER_ID');
export const setConditionPaymentOnStart = createAction('SET_CONDITION_PAYMENT_ON_START');
export const setConditionPaymentOnEnd = createAction('SET_CONDITION_PAYMENT_ON_END');
export const setConditionPaymentStatus = createAction('SET_CONDITION_PAYMENT_STATUS');