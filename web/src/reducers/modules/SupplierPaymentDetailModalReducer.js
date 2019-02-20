import {handleActions} from 'redux-actions';
import {SupplierPaymentDetailModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 线路安排基本信息
    loadTaskInfo: [],
    // 供应商运费
    supplierTransPrice: 0,
    // 供应商保费
    supplierInsurePrice: 0,
    // 支付供应商
    supplierPrice: 0
};

export default handleActions({
    [SupplierPaymentDetailModalActionType.getLoadTaskInfo]: (state, action) => {
        return {
            ...state,
            loadTaskInfo: action.payload
        }
    },
    [SupplierPaymentDetailModalActionType.setSupplierTransPrice]: (state, action) => {
        return {
            ...state,
            supplierTransPrice: action.payload
        }
    },
    [SupplierPaymentDetailModalActionType.setSupplierInsurePrice]: (state, action) => {
        return {
            ...state,
            supplierInsurePrice: action.payload
        }
    },
    [SupplierPaymentDetailModalActionType.setSupplierPrice]: (state, action) => {
        return {
            ...state,
            supplierPrice: action.payload
        }
    }
}, initialState)