import {handleActions} from 'redux-actions';
import {EditCompanyBankModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 银行ID
    companyBankId: '',
    // 银行名称
    companyBank: '',
    // 卡号
    companyBankCode: '',
    // 收款人
    companyBankUser: '',
};

export default handleActions({
    [EditCompanyBankModalActionType.setCompanyBankId]: (state, action) => {
        return {
            ...state,
            companyBankId: action.payload
        }
    },
    [EditCompanyBankModalActionType.setCompanyBank]: (state, action) => {
        return {
            ...state,
            companyBank: action.payload
        }
    },
    [EditCompanyBankModalActionType.setCompanyBankCode]: (state, action) => {
        return {
            ...state,
            companyBankCode: action.payload
        }
    },
    [EditCompanyBankModalActionType.setCompanyBankUser]: (state, action) => {
        return {
            ...state,
            companyBankUser: action.payload
        }
    }
}, initialState)