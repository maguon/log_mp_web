import {createAction} from 'redux-actions';

export const setPageType = createAction('SET_EDIT_ORDER_CAR_PAGE_TYPE');
export const setOrderInfo = createAction('SET_ORDER_ITEM_ORDER_INFO');
export const setOrderItemId = createAction('SET_ORDER_ITEM_ID');
export const setVin = createAction('SET_ORDER_ITEM_VIN');
export const setCarModel = createAction('SET_ORDER_ITEM_CAR_MODEL');
export const setCarFlag = createAction('SET_ORDER_ITEM_CAR_FLAG');
export const setValuation = createAction('SET_ORDER_ITEM_VALUATION');
export const setInsuranceFlag = createAction('SET_ORDER_ITEM_INSURANCE_FLAG');
export const setFreight = createAction('SET_ORDER_ITEM_FREIGHT');
export const setInsureFee = createAction('SET_ORDER_ITEM_INSURE_FEE');
export const setActFreight = createAction('SET_ORDER_ITEM_ACT_FREIGHT');
export const setActInsureFee = createAction('SET_ORDER_ITEM_ACT_INSURE_FEE');