import {handleActions} from 'redux-actions';
import {NewSupplierModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 画面类型(新建/编辑)
    pageType: '',
    // 供应商编号
    supplierId: '',
    // 供应商简称
    supplierShort: '',
    // 供应商全称
    supplierName: '',
    // 运输方式：陆运
    transportModeRoad: false,
    // 运输方式：海运
    transportModeShip: false,
    // 备注
    remark: ''
};

export default handleActions({
    [NewSupplierModalActionType.setPageType]: (state, action) => {
        return {
            ...state,
            pageType: action.payload
        }
    },
    [NewSupplierModalActionType.setSupplierId]: (state, action) => {
        return {
            ...state,
            supplierId: action.payload
        }
    },
    [NewSupplierModalActionType.setSupplierShort]: (state, action) => {
        return {
            ...state,
            supplierShort: action.payload
        }
    },
    [NewSupplierModalActionType.setSupplierName]: (state, action) => {
        return {
            ...state,
            supplierName: action.payload
        }
    },
    [NewSupplierModalActionType.setTransportModeRoad]: (state, action) => {
        return {
            ...state,
            transportModeRoad: action.payload
        }
    },
    [NewSupplierModalActionType.setTransportModeShip]: (state, action) => {
        return {
            ...state,
            transportModeShip: action.payload
        }
    },
    [NewSupplierModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)