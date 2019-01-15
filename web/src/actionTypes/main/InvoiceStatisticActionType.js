import {createAction} from 'redux-actions';

export const setMonthStart = createAction('SET_INVOICE_STAT_MONTH_START');
export const setMonthEnd = createAction('SET_INVOICE_STAT_MONTH_END');
export const setDaySize = createAction('SET_INVOICE_STAT_DAY_SIZE');