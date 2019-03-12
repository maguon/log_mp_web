import {createAction} from 'redux-actions';

export const setStartCity = createAction('SET_ORDER_START_CITY');
export const setEndCity = createAction('SET_ORDER_END_CITY');
export const setServiceType = createAction('SET_ORDER_SERVICE_TYPE');
export const setDepartDate = createAction('SET_DEPART_DATE');
export const setErrorRouteFlg = createAction('SET_ERROR_ROUTE_FLAG');
export const setNewOrderId = createAction('SET_NEW_ORDER_ID');