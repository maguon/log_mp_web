import {handleActions} from 'redux-actions';
import {CompanyBankSettingActionType} from '../../actionTypes';

const initialState = {
    // 银行
    companyBank: '',
    // 卡号
    companyBankCode: '',
    // 收款人
    companyBankUser: '',
    // 公司银行账户列表
    companyBankArray: []
};

export default handleActions({
    [CompanyBankSettingActionType.getCompanyBankList]: (state, action) => {
        return {
            ...state,
            companyBankArray: action.payload
        }
    },
    [CompanyBankSettingActionType.setCompanyBank]: (state, action) => {
        return {
            ...state,
            companyBank: action.payload
        }
    },
    [CompanyBankSettingActionType.setCompanyBankCode]: (state, action) => {
        return {
            ...state,
            companyBankCode: action.payload
        }
    },
    [CompanyBankSettingActionType.setCompanyBankUser]: (state, action) => {
        return {
            ...state,
            companyBankUser: action.payload
        }
    }
}, initialState)