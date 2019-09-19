import {createAction} from 'redux-actions';

export const getProductInfo = createAction('GET_PRODUCT_INFO');
export const setProductId = createAction('SET_PRODUCT_ID');
export const setProductName = createAction('SET_PRODUCT_NAME');
export const setQuantity = createAction('SET_PRODUCT_QUANTITY');
export const setProductCity = createAction('SET_PRODUCT_CITY');
export const setProductionDate = createAction('SET_PRODUCTION_DATE');
export const setStartSaleDate = createAction('SET_START_SALE_DATE');
export const setStartSaleTime = createAction('SET_START_SALE_TIME');
export const setProductSaleType = createAction('SET_PRODUCT_SALE_TYPE');
export const setEarnestMoney = createAction('SET_EARNEST_MONEY');
export const setOriginalPrice = createAction('SET_ORIGINAL_PRICE');
export const setActualPrice = createAction('SET_ACTUAL_PRICE');
export const setProductImg = createAction('SET_PRODUCT_IMG');
export const setProductDescImgList = createAction('SET_PRODUCT_DESC_IMG');
export const setProductDes = createAction('SET_PRODUCT_DES');
export const getProductRecommendList = createAction('GET_PRODUCT_RECOMMEND_LIST');