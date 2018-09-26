import { createAction } from 'redux-actions';

export const setStartCityName = createAction('SET_START_CITY_NAME');
export const setEndCityName = createAction('SET_END_CITY_NAME');
export const setDistance = createAction('SET_DISTANCE');
export const getStartCityArray = createAction('GET_START_CITY_ARRAY');
export const getEndCityArray = createAction('GET_END_CITY_ARRAY');