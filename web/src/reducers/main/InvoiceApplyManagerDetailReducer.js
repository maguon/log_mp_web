import {handleActions} from 'redux-actions';
import {InvoiceApplyManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 发票申请 详细信息
    invoiceApplyInfo: [],
    // 开票订单(输入)
    invoiceOrderId: ''
};

export default handleActions({
    [InvoiceApplyManagerDetailActionType.getInvoiceApplyInfo]: (state, action) => {
        return {
            ...state,
            invoiceApplyInfo: action.payload
        }
    },
    [InvoiceApplyManagerDetailActionType.setInvoiceOrderId]: (state, action) => {
        return {
            ...state,
            invoiceOrderId: action.payload
        }
    }
}, initialState)