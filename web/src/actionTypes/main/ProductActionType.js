import {createAction} from 'redux-actions';

export const getProductList = createAction('GET_PRODUCT_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_NO');
export const setConditionSaleType = createAction('SET_CONDITION_SALE_TYPE');
export const setConditionSaleStatus = createAction('SET_CONDITION_SALE_STATUS');