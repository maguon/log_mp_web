import {handleActions} from 'redux-actions';
import {SupplierSettingDetailActionType} from '../../actionTypes';

const initialState = {
    // 供应商信息
    supplierInfo: [],
    // 联系方式列表
    contactArray: [],
    // 银行列表
    bankArray: [],

    // URL
    appUrl: '',
    // ID
    appId: '',
    // 密钥
    appSecret: '',
    // 发运地ID
    baseAddrId: '',
    // 经销商ID
    receiveId: '',
    // 品牌ID
    carModuleId: ''
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
    },
    [SupplierSettingDetailActionType.setAppUrl]: (state, action) => {
        return {
            ...state,
            appUrl: action.payload
        }
    },
    [SupplierSettingDetailActionType.setAppId]: (state, action) => {
        return {
            ...state,
            appId: action.payload
        }
    },
    [SupplierSettingDetailActionType.setAppSecret]: (state, action) => {
        return {
            ...state,
            appSecret: action.payload
        }
    },
    [SupplierSettingDetailActionType.setBaseAddrId]: (state, action) => {
        return {
            ...state,
            baseAddrId: action.payload
        }
    },
    [SupplierSettingDetailActionType.setReceiveId]: (state, action) => {
        return {
            ...state,
            receiveId: action.payload
        }
    },
    [SupplierSettingDetailActionType.setCarModuleId]: (state, action) => {
        return {
            ...state,
            carModuleId: action.payload
        }
    }
}, initialState)