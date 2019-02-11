import {createAction} from 'redux-actions';

export const setPageId = createAction('SET_NEW_LOAD_TASK_PAGE_ID');
export const setTabId = createAction('SET_NEW_LOAD_TASK_TAB_ID');
export const setOrderId = createAction('SET_NEW_LOAD_TASK_ORDER_ID');
export const setRequireId = createAction('SET_NEW_LOAD_TASK_REQUIRE_ID');
export const setLoadTaskId = createAction('SET_NEW_LOAD_TASK_EDIT_ID');

export const setStartCity = createAction('SET_NEW_LOAD_TASK_START_CITY');
export const setEndCity= createAction('SET_NEW_LOAD_TASK_END_CITY');
export const setSupplier= createAction('SET_NEW_LOAD_TASK_SUPPLIER');
export const setTransportMode= createAction('SET_NEW_LOAD_TASK_TRANSPORT_MODE');
export const setTransportModeList= createAction('SET_NEW_LOAD_TASK_TRANSPORT_MODE_LIST');
export const setPlanDate= createAction('SET_NEW_LOAD_TASK_PLAN_DATE');
export const setRemark = createAction('SET_NEW_LOAD_TASK_REMARK');

export const getLoadTaskInfo = createAction('GET_NEW_LOAD_TASK_DETAIL_INFO');
export const getUnscheduledCarList = createAction('SET_NEW_LOAD_TASK_UNSCHEDULED_CAR_LIST');
export const getScheduledCarList = createAction('SET_NEW_LOAD_TASK_SCHEDULED_CAR_LIST');

export const setSyncFlag = createAction('SET_NEW_LOAD_TASK_SYNC_FLAG');