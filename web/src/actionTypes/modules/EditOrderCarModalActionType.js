import {createAction} from 'redux-actions';

export const setPageType = createAction('SET_EDIT_ORDER_CAR_PAGE_TYPE');
export const setOrderInfo = createAction('SET_ORDER_INFO');

export const setVin = createAction('SET_VIN_CODE');
export const setCarModel = createAction('SET_CAR_MODEL');
export const setCarFlag = createAction('SET_CAR_FLAG');
export const setValuation = createAction('SET_VALUATION');
export const setInsuranceFlag = createAction('SET_ORDER_CAR_INSURANCE_FLAG');

export const setFreight = createAction('SET_FREIGHT');
export const setActFreight = createAction('SET_ACT_FREIGHT');