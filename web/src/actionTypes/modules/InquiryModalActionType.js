import {createAction} from 'redux-actions';

export const setStartCity = createAction('SET_START_CITY');
export const setEndCity = createAction('SET_END_CITY');
export const setServiceMode = createAction('SET_SERVICE_MODE');
export const setCarModel = createAction('SET_CAR_MODEL');
export const setCarFlag = createAction('SET_CAR_FLAG');
export const setValuation = createAction('SET_VALUATION');
export const setInsuranceFlag = createAction('SET_INSURANCE_FLAG');
export const setErrorRouteFlg = createAction('SET_ERROR_ROUTE_FLAG');
export const setMileage = createAction('SET_MILEAGE');
export const setFreight = createAction('SET_FREIGHT');
export const setInsuranceFee = createAction('SET_INSURANCE_FEE');