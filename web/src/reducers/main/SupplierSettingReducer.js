import {handleActions} from 'redux-actions';
import {SupplierSettingActionType} from '../../actionTypes';

const initialState = {
    // 检索条件：供应商简称
    conditionSupplierShort: '',
    // 检索条件：供应商全称
    conditionSupplierName: '',
    // 检索条件：运输方式
    conditionTransportMode: null,

    // 供应商列表
    supplierArray: []
};

export default handleActions({
    [SupplierSettingActionType.getSupplierList]: (state, action) => {
        return {
            ...state,
            supplierArray: action.payload
        }
    },
    [SupplierSettingActionType.setConditionSupplierShort]: (state, action) => {
        return {
            ...state,
            conditionSupplierShort: action.payload
        }
    },
    [SupplierSettingActionType.setConditionSupplierName]: (state, action) => {
        return {
            ...state,
            conditionSupplierName: action.payload
        }
    },
    [SupplierSettingActionType.setConditionTransportMode]: (state, action) => {
        return {
            ...state,
            conditionTransportMode: action.payload
        }
    }
}, initialState)