import {createAction} from 'redux-actions';

export const getAdminList = createAction('GET_ADMIN_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_ADMIN_NO');
export const setConditionAdminName = createAction('SET_CONDITION_ADMIN_NAME');
export const setConditionDepartment = createAction('SET_CONDITION_ADMIN_DEPARTMENT');
export const setConditionStatus = createAction('SET_CONDITION_ADMIN_STATUS');