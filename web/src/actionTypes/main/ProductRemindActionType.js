import {createAction} from 'redux-actions';

export const getProductRemindList = createAction('GET_PRODUCT_REMIND_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionProduct = createAction('SET_CONDITION_PRODUCT');
export const setConditionNickname = createAction('SET_CONDITION_NICKNAME');
export const setConditionProductSaleStatus = createAction('SET_CONDITION_PRODUCT_SALE_STATUS');