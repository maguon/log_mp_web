import {handleActions} from 'redux-actions';
import {NewSupplierBankModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 供应商ID
    supplierId: '',
    // 银行
    bank: '',
    // 银行账号
    bankCode: '',
    // 姓名
    accountName: ''
};

export default handleActions({
    [NewSupplierBankModalActionType.setSupplierId]: (state, action) => {
        return {
            ...state,
            supplierId: action.payload
        }
    },
    [NewSupplierBankModalActionType.setBank]: (state, action) => {
        return {
            ...state,
            bank: action.payload
        }
    },
    [NewSupplierBankModalActionType.setBankCode]: (state, action) => {
        return {
            ...state,
            bankCode: action.payload
        }
    },
    [NewSupplierBankModalActionType.setAccountName]: (state, action) => {
        return {
            ...state,
            accountName: action.payload
        }
    }
}, initialState)