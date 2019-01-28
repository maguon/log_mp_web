import {createAction} from 'redux-actions';

export const getSupplierInfo = createAction('GET_SUPPLIER_INFO');
export const getSupplierContactList = createAction('GET_SUPPLIER_CONTACT_LIST');
export const getSupplierBankList = createAction('GET_SUPPLIER_BANK_LIST');
export const setAdvancedStatus = createAction('SET_SUPPLIER_ADVANCED_STATUS');
export const setAppUrl = createAction('SET_SUPPLIER_APP_URL');
export const setAppId = createAction('SET_SUPPLIER_APP_ID');
export const setAppSecret = createAction('SET_SUPPLIER_APP_SECRET');
export const setBaseAddrId = createAction('SET_SUPPLIER_BASE_ADDRESS_ID');
export const setReceiveId = createAction('SET_SUPPLIER_RECEIVE_ID');
export const setCarModuleId = createAction('SET_SUPPLIER_CAR_MODULE_ID');