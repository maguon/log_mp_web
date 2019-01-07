import {handleActions} from 'redux-actions';
import {InvoiceTitleManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 发票信息
    invoiceInfo: []
};

export default handleActions({
    [InvoiceTitleManagerDetailActionType.getInvoiceInfo]: (state, action) => {
        return {
            ...state,
            invoiceInfo: action.payload
        }
    }
}, initialState)