import {createAction} from 'redux-actions';

export const getInvoiceList = createAction('GET_INVOICE_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionInvoiceNo = createAction('SET_CONDITION_INVOICE_NO');
export const setConditionCompany = createAction('SET_CONDITION_COMPANY');
export const setConditionCompanyTax = createAction('SET_CONDITION_COMPANY_TAX');
export const setConditionUser = createAction('SET_CONDITION_USER');