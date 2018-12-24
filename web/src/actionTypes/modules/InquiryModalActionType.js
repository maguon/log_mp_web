import {createAction} from 'redux-actions';

export const setStartCity = createAction('SET_INQUIRY_START_CITY');
export const setEndCity = createAction('SET_INQUIRY_END_CITY');
export const setServiceMode = createAction('SET_INQUIRY_SERVICE_MODE');
export const setCarModel = createAction('SET_INQUIRY_CAR_MODEL');
export const setCarFlag = createAction('SET_INQUIRY_CAR_FLAG');
export const setValuation = createAction('SET_INQUIRY_VALUATION');
export const setInsuranceFlag = createAction('SET_INQUIRY_INSURANCE_FLAG');
export const setErrorRouteFlg = createAction('SET_INQUIRY_ERROR_ROUTE_FLAG');
export const setMileage = createAction('SET_INQUIRY_MILEAGE');
export const setFreight = createAction('SET_INQUIRY_FREIGHT');
export const setInsuranceFee = createAction('SET_INQUIRY_INSURANCE_FEE');