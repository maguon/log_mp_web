import {createAction} from 'redux-actions';

export const setPageType = createAction('SET_PAGE_TYPE');
export const setSupplierId = createAction('SET_SUPPLIER_ID');
export const setSupplierShort = createAction('SET_SUPPLIER_SHORT');
export const setSupplierName = createAction('SET_SUPPLIER_NAME');
export const setTransportModeRoad = createAction('SET_TRANSPORT_MODE_ROAD');
export const setTransportModeShip = createAction('SET_TRANSPORT_MODE_SHIP');
export const setRemark = createAction('SET_REMARK');