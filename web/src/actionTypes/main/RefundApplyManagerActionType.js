import {createAction} from 'redux-actions';

export const getRefundApplyList = createAction('GET_REFUND_APPLY_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionOrderId = createAction('SET_CONDITION_ORDER_ID');
export const setConditionOrderType = createAction('SET_CONDITION_ORDER_TYPE');
export const setConditionRefundMode = createAction('SET_CONDITION_REFUND_MODE');
export const setConditionCreateUser = createAction('SET_CONDITION_CREATE_USER');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionOperationStart = createAction('SET_CONDITION_OPERATION_START');
export const setConditionOperationEnd = createAction('SET_CONDITION_OPERATION_END');
export const setConditionStatus = createAction('SET_CONDITION_STATUS');