import {createAction} from 'redux-actions';

export const setNewProductId = createAction('SET_NEW_PRODUCT_ID');
export const setProductName = createAction('SET_NEW_PRODUCT_NAME');
export const setQuantity = createAction('SET_NEW_PRODUCT_QUANTITY');
export const setProductCity = createAction('SET_NEW_PRODUCT_CITY');
export const setProductionDate = createAction('SET_NEW_PRODUCTION_DATE');
export const setStartSaleDate = createAction('SET_NEW_PRODUCT_START_SALE_DATE');
export const setStartSaleTime = createAction('SET_NEW_PRODUCT_START_SALE_TIME');
export const setProductSaleType = createAction('SET_NEW_PRODUCT_SALE_TYPE');
export const setEarnestMoney = createAction('SET_NEW_PRODUCT_EARNEST_MONEY');
export const setOriginalPrice = createAction('SET_NEW_PRODUCT_ORIGINAL_PRICE');
export const setActualPrice = createAction('SET_NEW_PRODUCT_ACTUAL_PRICE');