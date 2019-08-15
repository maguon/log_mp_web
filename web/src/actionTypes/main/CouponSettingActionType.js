import {createAction} from 'redux-actions';

export const getCouponList = createAction('GET_COUPON_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_COUPON_NO');
export const setConditionStatus = createAction('SET_CONDITION_COUPON_STATUS');