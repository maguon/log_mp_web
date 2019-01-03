import {createAction} from 'redux-actions';

export const setPageType = createAction('SET_NEW_REFUND_PAGE_TYPE');
export const setRefundApplyId = createAction('SET_NEW_REFUND_APPLY_ID');
export const setOrderId = createAction('SET_NEW_REFUND_ORDER_ID');
export const setRefundFee = createAction('SET_NEW_REFUND_FEE');
export const getPaymentArray = createAction('GET_NEW_REFUND_PAYMENT_LIST');
export const setSelectedItem = createAction('SET_NEW_REFUND_SELECTED_ITEM');
export const setRemark = createAction('SET_NEW_REFUND_REMARK');