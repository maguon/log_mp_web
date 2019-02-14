import {createAction} from 'redux-actions';

export const setLoadTaskId = createAction('SET_SYNC_LOAD_TASK_ID');
export const getSyncRequireInfo = createAction('GET_SYNC_REQUIRE_INFO');
export const getRouteLoadTaskList = createAction('GET_SYNC_ROUTE_LOAD_TASK_LIST');
export const getLoadTaskCarList = createAction('GET_SYNC_LOAD_TASK_CAR_LIST');