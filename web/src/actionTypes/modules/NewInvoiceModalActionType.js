import {createAction} from 'redux-actions';

export const setPrePage = createAction('SET_NEW_INVOICE_PRE_PAGE_ID');
export const setInvoiceApplyId = createAction('SET_NEW_INVOICE_APPLY_ID');
export const setOrderId = createAction('SET_NEW_INVOICE_ORDER_ID');
export const setInvoiceTitle = createAction('SET_NEW_INVOICE_TITLE');
export const setCompanyTax = createAction('SET_NEW_INVOICE_COMPANY_TAX');
export const setCompanyPhone = createAction('SET_NEW_INVOICE_COMPANY_PHONE');
export const setBank = createAction('SET_NEW_INVOICE_BANK');
export const setBankNum = createAction('SET_NEW_INVOICE_BANK_NUM');
export const setCompanyAddress = createAction('SET_NEW_INVOICE_COMPANY_ADDRESS');
export const setRemark = createAction('SET_NEW_INVOICE_REMARK');