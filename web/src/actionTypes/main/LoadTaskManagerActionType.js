import {createAction} from 'redux-actions';

export const getLoadTaskList = createAction('GET_LOAD_TASK_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionLoadTaskId = createAction('SET_CONDITION_LOAD_TASK_ID');
export const setConditionOrderId = createAction('SET_CONDITION_ORDER_ID');
export const setConditionServiceType = createAction('SET_CONDITION_SERVICE_TYPE');
export const setConditionStartCity = createAction('SET_CONDITION_START_CITY');
export const setConditionEndCity = createAction('SET_CONDITION_END_CITY');
export const setConditionTransMode = createAction('SET_CONDITION_TRANSPORT_TYPE');
export const setConditionSupplier = createAction('SET_CONDITION_SUPPLIER');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');
export const setConditionPlanStart = createAction('SET_CONDITION_PLAN_START');
export const setConditionPlanEnd = createAction('SET_CONDITION_PLAN_END');
export const setConditionStatus = createAction('SET_CONDITION_STATUS');