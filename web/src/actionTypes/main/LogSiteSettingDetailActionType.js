import {createAction} from 'redux-actions';

export const setLogSiteId = createAction('SET_LOG_SITE_ID');
export const setLogSiteName = createAction('SET_LOG_SITE_NAME');
export const setLogSiteCity = createAction('SET_LOG_SITE_CITY');
export const setLogSiteAddress = createAction('SET_LOG_SITE_ADDRESS');
export const setLogSiteRemark = createAction('SET_LOG_SITE_REMARK');
export const setLogSiteLon = createAction('SET_LOG_SITE_LON');
export const setLogSiteLat = createAction('SET_LOG_SITE_LAT');
export const getLogSiteContactList = createAction('GET_LOG_SITE_CONTACT_LIST');