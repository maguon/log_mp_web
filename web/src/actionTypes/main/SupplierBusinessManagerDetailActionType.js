import {createAction} from 'redux-actions';

export const getSupplierBusinessInfo = createAction('GET_SUPPLIER_BUSINESS_INFO');
export const getLoadTaskList = createAction('GET_SUPPLIER_BUSINESS_DETAIL_LOAD_TASK_LIST');
export const setDetailStartNumber = createAction('SET_SUPPLIER_BUSINESS_DETAIL_START_NUMBER');
export const setDetailDataSize = createAction('SET_SUPPLIER_BUSINESS_DETAIL_DATA_SIZE');
export const setConditionLoadTaskId = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_LOAD_TASK_ID');
export const setConditionOrderId = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_ORDER_ID');
export const setConditionStartCity = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_START_CITY');
export const setConditionEndCity = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_END_CITY');
export const setConditionTransMode = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_TRANSPORT_TYPE');
export const setConditionCreatedOnStart = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_CREATED_ON_END');
export const setConditionArriveStart = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_ARRIVE_START');
export const setConditionArriveEnd = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_ARRIVE_END');
export const setConditionPaymentStatus = createAction('SET_SUPPLIER_BUSINESS_DETAIL_CONDITION_PAYMENT_STATUS');