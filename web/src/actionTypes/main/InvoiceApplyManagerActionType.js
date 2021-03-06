import {createAction} from 'redux-actions';

export const getInvoiceList = createAction('GET_INVOICE_LIST');
export const setInvoiceStartNumber = createAction('SET_INVOICE_START_NUMBER');
export const setInvoiceDataSize = createAction('SET_INVOICE_DATA_SIZE');
export const setConditionInvoiceApplyNo = createAction('SET_CONDITION_INVOICE_APPLY_NO');
export const setConditionCompanyTax = createAction('SET_CONDITION_INVOICE_COMPANY_TAX');
export const setConditionInvoiceTitle = createAction('SET_CONDITION_INVOICE_TITLE');
export const setConditionInvoiceOrderCreateUser = createAction('SET_CONDITION_INVOICE_APPLY_ORDER_CREATE_USER');
export const setConditionInvoiceOrderNo = createAction('SET_CONDITION_INVOICE_APPLY_ORDER_NO');
export const setConditionInvoiceCreatedOnStart = createAction('SET_CONDITION_INVOICE_APPLY_CREATED_ON_START');
export const setConditionInvoiceCreatedOnEnd = createAction('SET_CONDITION_INVOICE_APPLY_CREATED_ON_END');
export const setConditionInvoiceApplyStatus = createAction('SET_CONDITION_INVOICE_APPLY_STATUS');

export const getOrderList = createAction('GET_INVOICE_ORDER_LIST');
export const setOrderStartNumber = createAction('SET_INVOICE_ORDER_START_NUMBER');
export const setOrderDataSize = createAction('SET_INVOICE_ORDER_DATA_SIZE');
export const setConditionOrderNo = createAction('SET_CONDITION_INVOICE_ORDER_NO');
export const setConditionOrderStartCity = createAction('SET_CONDITION_INVOICE_ORDER_START_CITY');
export const setConditionOrderEndCity = createAction('SET_CONDITION_INVOICE_ORDER_END_CITY');
export const setConditionOrderPaymentStatus = createAction('SET_CONDITION_INVOICE_ORDER_PAYMENT_STATUS');
export const setConditionOrderCreatedOnStart = createAction('SET_CONDITION_INVOICE_ORDER_CREATED_ON_START');
export const setConditionOrderCreatedOnEnd = createAction('SET_CONDITION_INVOICE_ORDER_CREATED_ON_END');
export const setConditionOrderCreateUser = createAction('SET_CONDITION_INVOICE_ORDER_CREATE_USER');