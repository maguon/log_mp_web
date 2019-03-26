import {createAction} from 'redux-actions';

export const setUnConsultOrderCount = createAction('SET_UN_CONSULT_ORDER_COUNT');
export const setMsgImproved = createAction('SET_MSG_IMPROVED');
export const setPriceImproved = createAction('SET_PRICE_IMPROVED');
export const setUnGenerated = createAction('SET_UN_GENERATED');
export const setUnExecuted = createAction('SET_UN_EXECUTED');
export const setInExecution = createAction('SET_IN_EXECUTION');
export const setArrange = createAction('SET_ARRANGE');
export const setArranging = createAction('SET_ARRANGING');
export const setNoLoadCarCount = createAction('SET_NO_LOAD_CAR_COUNT');
export const setLoadingCarCount = createAction('SET_LOADING_CAR_COUNT');