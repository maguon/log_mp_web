import {createAction} from 'redux-actions';

export const getInvoiceList = createAction('GET_INVOICE_APPLY_LIST');
export const setInvoiceStartNumber = createAction('SET_INVOICE_APPLY_START_NUMBER');
export const setInvoiceDataSize = createAction('SET_INVOICE_APPLY_DATA_SIZE');
export const setConditionInvoiceApplyNo = createAction('SET_COND_INVOICE_APPLY_NO');
export const setConditionInvoiceOrderNo = createAction('SET_COND_INVOICE_APPLY_ORDER_NO');
export const setConditionCompanyTax = createAction('SET_COND_INVOICE_COMPANY_TAX');
export const setConditionInvoiceTitle = createAction('SET_COND_INVOICE_TITLE');
export const setConditionInvoiceOrderCreateUser = createAction('SET_COND_INVOICE_APPLY_ORDER_CREATE_USER');
export const setConditionCreatedOnStart = createAction('SET_COND_INVOICE_APPLY_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_COND_INVOICE_APPLY_CREATED_ON_END');
export const setConditionInvoiceCreatedOnStart = createAction('SET_COND_INVOICE_APPLY_UPDATED_ON_START');
export const setConditionInvoiceCreatedOnEnd = createAction('SET_COND_INVOICE_APPLY_UPDATED_ON_END');
export const setConditionInvoiceApplyStatus = createAction('SET_COND_INVOICE_APPLY_STATUS');