import {createAction} from 'redux-actions';

export const getUserInfo = createAction('GET_USER_INFO');

export const getUserCarList = createAction('GET_USER_CAR_LIST');

export const setMsgConditionType = createAction('SET_MSG_CONDITION_TYPE');
export const setMsgConditionStartDate = createAction('SET_MSG_CONDITION_START_DATE');
export const setMsgConditionEndDate = createAction('SET_MSG_CONDITION_END_DATE');
export const getMessageList = createAction('GET_CHECK_CAR_LIST');
export const setMsgStartNumber = createAction('SET_MSG_START_NUMBER');
export const setMsgDataSize = createAction('SET_MSG_DATA_SIZE');

export const getOrderList = createAction('GET_ORDER_LIST');
export const getProductList = createAction('GET_PRODUCT_LIST');

export const getAddressList = createAction('GET_ADDRESS_LIST');