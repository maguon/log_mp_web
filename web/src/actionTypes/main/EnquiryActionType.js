import { createAction } from 'redux-actions';
export const getCityList = createAction('GET_CITY_LIST');

export const setStartCity = createAction('SET_START_CITY');
export const setEndCity = createAction('SET_END_CITY');

export const setMileage = createAction('SET_MILEAGE');
export const setFreight = createAction('SET_FREIGHT');
