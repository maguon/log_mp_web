import {createAction} from 'redux-actions';

export const setOrderId = createAction('SET_EDIT_LOG_ADDRESS_ORDER_ID');
export const setSendCity = createAction('SET_EDIT_LOG_ADDRESS_SEND_CITY');
export const getSendAddressList = createAction('GET_EDIT_LOG_ADDRESS_SEND_ADDRESS_ARRAY');
export const setSendAddress = createAction('SET_EDIT_LOG_ADDRESS_SEND_ADDRESS');
export const setRecvCity = createAction('SET_EDIT_LOG_ADDRESS_RECV_CITY');
export const getRecvAddressList = createAction('GET_EDIT_LOG_ADDRESS_RECV_ADDRESS_ARRAY');
export const setRecvAddress = createAction('SET_EDIT_LOG_ADDRESS_RECV_ADDRESS');