import {handleActions} from 'redux-actions';
import {SupplierSettingDetailActionType} from '../../actionTypes';

const initialState = {
    // 供应商信息
    supplierInfo: [],
    // 联系方式列表
    contactArray: [],
    // 银行列表
    bankArray: []
};

export default handleActions({
    [SupplierSettingDetailActionType.getSupplierInfo]: (state, action) => {
        return {
            ...state,
            supplierInfo: action.payload
        }
    },
    [SupplierSettingDetailActionType.getSupplierContactList]: (state, action) => {
        return {
            ...state,
            contactArray: action.payload
        }
    },
    [SupplierSettingDetailActionType.getSupplierBankList]: (state, action) => {
        return {
            ...state,
            bankArray: action.payload
        }
    }
}, initialState)