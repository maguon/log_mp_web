import {handleActions} from 'redux-actions';
import {NewSupplierBankModalActionType, NewSupplierContactModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 供应商ID
    supplierId: '',
    // 姓名
    name: '',
    // 职务
    position: '',
    // 电话
    phone: ''
};

export default handleActions({
    [NewSupplierBankModalActionType.setSupplierId]: (state, action) => {
        return {
            ...state,
            supplierId: action.payload
        }
    },
    [NewSupplierContactModalActionType.setName]: (state, action) => {
        return {
            ...state,
            name: action.payload
        }
    },
    [NewSupplierContactModalActionType.setPosition]: (state, action) => {
        return {
            ...state,
            position: action.payload
        }
    },
    [NewSupplierContactModalActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    }
}, initialState)