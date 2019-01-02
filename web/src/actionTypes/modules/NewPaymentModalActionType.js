import {createAction} from 'redux-actions';

export const setPageType = createAction('SET_NEW_PAYMENT_PAGE_TYPE');
export const setOrderId = createAction('SET_NEW_PAYMENT_ORDER_ID');
export const setPaymentId = createAction('SET_NEW_PAYMENT_ID');
export const setFreight = createAction('SET_NEW_PAYMENT_FREIGHT');
export const setInsuranceFee = createAction('SET_NEW_PAYMENT_INSURANCE_FEE');
export const setTotalFee = createAction('SET_NEW_PAYMENT_TOTAL_FEE');
export const setLeftPayment = createAction('SET_NEW_PAYMENT_LEFT_PAYMENT');
export const setPaymentBank = createAction('SET_NEW_PAYMENT_BANK');
export const setBankNum = createAction('SET_NEW_PAYMENT_BANK_NUM');
export const setBankUser = createAction('SET_NEW_PAYMENT_BANK_USER');
export const setPaymentFee = createAction('SET_NEW_PAYMENT_FEE');