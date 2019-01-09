import {handleActions} from 'redux-actions';
import {InvoiceManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 发票申请 详细信息
    invoiceApplyInfo: [],
};

export default handleActions({
    [InvoiceManagerDetailActionType.getInvoiceApplyInfo]: (state, action) => {
        return {
            ...state,
            invoiceApplyInfo: action.payload
        }
    }
}, initialState)