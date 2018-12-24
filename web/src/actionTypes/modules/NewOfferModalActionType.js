import {createAction} from 'redux-actions';

export const setInquiryId = createAction('SET_INQUIRY_ID');
export const setUserId = createAction('SET_USER_ID');
export const setFreight= createAction('SET_OFFER_FREIGHT');
export const setInsuranceFee= createAction('SET_OFFER_INSURANCE_FEE');
export const setActFreight= createAction('SET_OFFER_ACT_FREIGHT');
export const setActInsuranceFee= createAction('SET_OFFER_ACT_INSURANCE_FEE');
export const setRemark = createAction('SET_OFFER_REMARK');