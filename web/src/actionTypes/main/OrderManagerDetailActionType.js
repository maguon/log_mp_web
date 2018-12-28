import {createAction} from 'redux-actions';

export const getOrderInfo = createAction('GET_ORDER_INFO');
export const setOrderRemark = createAction('SET_ORDER_REMARK');
export const setOrderPaymentPaid = createAction('SET_ORDER_PAYMENT_PAID');
export const setOrderPaymentRefund = createAction('SET_ORDER_PAYMENT_REFUND');
export const getOrderPaymentArray = createAction('GET_ORDER_PAYMENT_DATA_ARRAY');
export const getOrderRefundApplyArray = createAction('GET_ORDER_REFUND_APPLY_ARRAY');



export const setInquiryConditionServiceType = createAction('SET_INQUIRY_CONDITION_SERVICE_TYPE');
export const setInquiryConditionStatus = createAction('SET_INQUIRY_CONDITION_STATUS');
export const getUserInquiryList = createAction('GET_USER_INQUIRY_LIST');
export const setInquiryStartNumber = createAction('SET_INQUIRY_START_NUMBER');
export const setInquiryDataSize = createAction('SET_INQUIRY_DATA_SIZE');
export const getLogInfoList = createAction('GET_LOG_INFO_LIST');
export const getBankCardList = createAction('GET_BANK_CARD_LIST');
export const getInvoiceList = createAction('GET_INVOICE_LIST');