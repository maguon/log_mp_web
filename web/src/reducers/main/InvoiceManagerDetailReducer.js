import {handleActions} from 'redux-actions';
import {InvoiceManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 发票信息
    invoiceInfo: []
};

export default handleActions({
    [InvoiceManagerDetailActionType.getInvoiceInfo]: (state, action) => {
        return {
            ...state,
            invoiceInfo: action.payload
        }
    }
}, initialState)