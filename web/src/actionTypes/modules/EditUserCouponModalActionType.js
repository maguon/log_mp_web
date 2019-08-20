import {createAction} from 'redux-actions';

export const setUserCouponId = createAction('SET_EDIT_USER_COUPON_ID');
export const setUserCouponInfo = createAction('SET_EDIT_USER_COUPON_INFO');
export const setUserPhone = createAction('SET_EDIT_USER_COUPON_PHONE');
export const setUserInfo = createAction('SET_EDIT_USER_COUPON_USER_INFO');
export const setCouponAmount = createAction('SET_EDIT_USER_COUPON_AMOUNT');
export const setCouponThreshold = createAction('SET_EDIT_USER_COUPON_THRESHOLD');
export const setValidityPeriodType = createAction('SET_EDIT_USER_COUPON_VALIDITY_PERIOD_TYPE');
export const setEffectiveDays = createAction('SET_EDIT_USER_COUPON_EFFECTIVE_DAYS');
export const setValidityPeriodStart = createAction('SET_EDIT_USER_COUPON_VALIDITY_PERIOD_START');
export const setValidityPeriodEnd = createAction('SET_EDIT_USER_COUPON_VALIDITY_PERIOD_END');
export const setRemark = createAction('SET_EDIT_USER_COUPON_REMARK');