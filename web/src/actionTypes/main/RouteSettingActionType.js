import {createAction} from 'redux-actions';

export const setStartCityId = createAction('SET_START_CITY_ID');
export const setStartCityName = createAction('SET_START_CITY_NAME');
export const setEndCityId = createAction('SET_END_CITY_ID');
export const setEndCityName = createAction('SET_END_CITY_NAME');
export const setRouteId = createAction('SET_ROUTE_ID');
export const setDistance = createAction('SET_DISTANCE');
export const getStartCityArray = createAction('GET_START_CITY_ARRAY');
export const getEndCityArray = createAction('GET_END_CITY_ARRAY');
export const setModifyFlag = createAction('SET_MODIFY_FLAG');