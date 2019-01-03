import {createAction} from 'redux-actions';

export const getOrderInfo = createAction('GET_ORDER_INFO');
export const setOrderRemark = createAction('SET_ORDER_REMARK');
export const setOrderPaymentPaid = createAction('SET_ORDER_PAYMENT_PAID');
export const setOrderPaymentRefund = createAction('SET_ORDER_PAYMENT_REFUND');
export const setOrderPaymentPaidSize = createAction('SET_ORDER_PAYMENT_PAID_SIZE');
export const getOrderPaymentArray = createAction('GET_ORDER_PAYMENT_DATA_ARRAY');
export const getOrderRefundApplyArray = createAction('GET_ORDER_REFUND_APPLY_ARRAY');
export const setOrderPaymentRemark = createAction('SET_ORDER_PAYMENT_REMARK');


export const getInvoiceArray = createAction('GET_INVOICE_LIST');