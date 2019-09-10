import {createAction} from 'redux-actions';

export const getProductList = createAction('GET_PRODUCT_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionProduct = createAction('SET_CONDITION_PRODUCT');
export const setConditionCity = createAction('SET_CONDITION_CITY');
export const setConditionSaleType = createAction('SET_CONDITION_SALE_TYPE');
export const setConditionProductSaleStatus = createAction('SET_CONDITION_PRODUCT_SALE_STATUS');