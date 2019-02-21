import {createAction} from 'redux-actions';

export const getSupplierBusinessList = createAction('GET_SUPPLIER_BUSINESS_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionSupplier = createAction('SET_CONDITION_SUPPLIER');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');