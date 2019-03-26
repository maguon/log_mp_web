import {createAction} from 'redux-actions';

export const setIncome = createAction('set_Income');
export const setProfit = createAction('set_Profit');
export const setPayment = createAction('set_Payment');
export const setWaitForPayCnt = createAction('SET_WAIT_FOR_PAY_CNT');
export const setWaitForPayMoney = createAction('SET_WAIT_FOR_PAY_MONEY');
export const setWaitForRefundCnt = createAction('SET_WAIT_FOR_REFUND_CNT');
export const setWaitForRefundMoney = createAction('SET_WAIT_FOR_REFUND_MONEY');
export const setWaitForInvoiceCnt = createAction('SET_WAIT_FOR_INVOICE_CNT');
export const setWaitForInvoiceMoney = createAction('SET_WAIT_FOR_INVOICE_MONEY');
export const setWaitForPayLoadTask = createAction('SET_WAIT_FOR_PAY_LOADTASK');
export const setWaitForPaySupplier = createAction('SET_WAIT_FOR_PAY_SUPPLIER');