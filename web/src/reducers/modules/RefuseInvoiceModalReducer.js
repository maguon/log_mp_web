import {handleActions} from 'redux-actions';
import {RefuseInvoiceModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 发票申请 基本信息
    invoiceApplyInfo: [],
    // 拒绝原因
    refuseReason: ''
};

export default handleActions({
    [RefuseInvoiceModalActionType.setInvoiceApplyInfo]: (state, action) => {
        return {
            ...state,
            invoiceApplyInfo: action.payload
        }
    },
    [RefuseInvoiceModalActionType.setRefuseReason]: (state, action) => {
        return {
            ...state,
            refuseReason: action.payload
        }
    }
}, initialState)