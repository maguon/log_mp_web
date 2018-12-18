import {createAction} from 'redux-actions';

export const getOrderInfo = createAction('GET_ORDER_INFO');



export const setInquiryConditionStartCity = createAction('SET_INQUIRY_CONDITION_START_CITY');
export const setInquiryConditionEndCity = createAction('SET_INQUIRY_CONDITION_END_CITY');
export const setInquiryConditionServiceType = createAction('SET_INQUIRY_CONDITION_SERVICE_TYPE');
export const setInquiryConditionStatus = createAction('SET_INQUIRY_CONDITION_STATUS');
export const getUserInquiryList = createAction('GET_USER_INQUIRY_LIST');
export const setInquiryStartNumber = createAction('SET_INQUIRY_START_NUMBER');
export const setInquiryDataSize = createAction('SET_INQUIRY_DATA_SIZE');
export const getLogInfoList = createAction('GET_LOG_INFO_LIST');
export const getBankCardList = createAction('GET_BANK_CARD_LIST');
export const getInvoiceList = createAction('GET_INVOICE_LIST');