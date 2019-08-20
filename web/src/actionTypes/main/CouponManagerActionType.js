import {createAction} from 'redux-actions';

export const getUserCouponList = createAction('GET_USER_COUPON_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionNo = createAction('SET_CONDITION_USER_COUPON_NO');
export const getCouponNoList = createAction('GET_COUPON_NO_LIST');
export const setConditionCouponNo = createAction('SET_CONDITION_COUPON_NO');
export const setConditionGrantUser = createAction('SET_CONDITION_USER_GRANT_USER');
export const setConditionStatus = createAction('SET_CONDITION_COUPON_STATUS');
export const setConditionUserId = createAction('SET_CONDITION_USER_COUPON_USER_ID');
export const setConditionWeChatNm = createAction('SET_CONDITION_USER_COUPON_WECHAT_NM');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_USER_COUPON_CREATEDON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_USER_COUPON_CREATEDON_END');