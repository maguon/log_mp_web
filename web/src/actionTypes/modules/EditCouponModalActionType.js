import {createAction} from 'redux-actions';

export const setCouponId = createAction('SET_EDIT_COUPON_ID');
export const setCouponStatus = createAction('SET_EDIT_COUPON_STATUS');
export const setCouponName = createAction('SET_EDIT_COUPON_NAME');
export const setCouponAmount = createAction('SET_EDIT_COUPON_AMOUNT');
export const setCouponThreshold = createAction('SET_EDIT_COUPON_THRESHOLD');
export const setValidityPeriodType = createAction('SET_EDIT_COUPON_VALIDITY_PERIOD_TYPE');
export const setEffectiveDays = createAction('SET_EDIT_COUPON_EFFECTIVE_DAYS');
export const setValidityPeriodStart = createAction('SET_EDIT_COUPON_VALIDITY_PERIOD_START');
export const setValidityPeriodEnd = createAction('SET_EDIT_COUPON_VALIDITY_PERIOD_END');
export const setRemark = createAction('SET_EDIT_COUPON_REMARK');
export const setReceiveNum = createAction('SET_EDIT_COUPON_RECEIVE_NUM');
export const setUseNum = createAction('SET_EDIT_COUPON_USE_NUM');