import {createAction} from 'redux-actions';

export const getCityList = createAction('GET_CITY_LIST');
export const getOrderInfo = createAction('GET_ORDER_INFO');
export const getOrderCarList = createAction('GET_ORDER_CAR_LIST');
export const setTotalValuation = createAction('SET_ORDER_CAR_TOTAL_VALUATION');
export const setTotalActFreight = createAction('SET_ORDER_CAR_TOTAL_ACT_FREIGHT');
export const setTotalInsuranceFee = createAction('SET_ORDER_CAR_TOTAL_ACT_INSURANCE_FEE');