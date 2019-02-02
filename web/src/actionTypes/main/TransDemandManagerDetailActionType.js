import {createAction} from 'redux-actions';

export const getTransDemandInfo = createAction('GET_TRANS_DEMAND_INFO');
export const getLoadTaskList = createAction('GET_LOAD_TASK_LIST');



export const setTotalValuation = createAction('SET_TOTAL_VALUATION');
export const setTotalFreight = createAction('SET_TOTAL_FREIGHT');
export const setTotalInsuranceFee = createAction('SET_TOTAL_INSURANCE_FEE');
export const getOrderInfo = createAction('GET_ORDER_INFO');