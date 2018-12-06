import {createAction} from 'redux-actions';

export const getSupplierList = createAction('GET_SUPPLIER_LIST');
export const setConditionSupplierShort = createAction('SET_CONDITION_SUPPLIER_SHORT');
export const setConditionSupplierName = createAction('SET_CONDITION_SUPPLIER_NAME');
export const setConditionTransportMode = createAction('SET_CONDITION_TRANSPORT_MODE');