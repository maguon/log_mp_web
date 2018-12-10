import {createAction} from 'redux-actions';

export const getInquiryInfo = createAction('GET_INQUIRY_INFO');
export const getInquiryCarList = createAction('GET_INQUIRY_CAR_LIST');
export const setTotalValuation = createAction('SET_TOTAL_VALUATION');
export const setTotalFreight = createAction('SET_TOTAL_FREIGHT');
export const setShowOrderInfoFlag = createAction('SET_ORDER_INFO_FLAG');
export const getOrderInfo = createAction('GET_ORDER_INFO');
export const getOrderCarList = createAction('GET_ORDER_CAR_LIST');
export const setTotalActFreight = createAction('SET_TOTAL_ACT_FREIGHT');