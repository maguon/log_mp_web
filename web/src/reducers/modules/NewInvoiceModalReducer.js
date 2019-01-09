import {handleActions} from 'redux-actions';
import {NewInvoiceModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 前画面区分
    prePage: '',

    // 发票申请编号
    invoiceApplyId: '',
    // 订单编号
    orderId: '',
    // 发票抬头
    invoiceTitle: '',
    // 税号
    companyTax: '',
    // 电话号码
    companyPhone: '',
    // 开户银行
    bank: '',
    // 银行账号
    bankNum: '',
    // 单位地址
    companyAddress: '',
    // 备注
    remark: ''
};

export default handleActions({
    [NewInvoiceModalActionType.setPrePage]: (state, action) => {
        return {
            ...state,
            prePage: action.payload
        }
    },
    [NewInvoiceModalActionType.setInvoiceApplyId]: (state, action) => {
        return {
            ...state,
            invoiceApplyId: action.payload
        }
    },
    [NewInvoiceModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    },
    [NewInvoiceModalActionType.setInvoiceTitle]: (state, action) => {
        return {
            ...state,
            invoiceTitle: action.payload
        }
    },
    [NewInvoiceModalActionType.setCompanyTax]: (state, action) => {
        return {
            ...state,
            companyTax: action.payload
        }
    },
    [NewInvoiceModalActionType.setCompanyPhone]: (state, action) => {
        return {
            ...state,
            companyPhone: action.payload
        }
    },
    [NewInvoiceModalActionType.setBank]: (state, action) => {
        return {
            ...state,
            bank: action.payload
        }
    },
    [NewInvoiceModalActionType.setBankNum]: (state, action) => {
        return {
            ...state,
            bankNum: action.payload
        }
    },
    [NewInvoiceModalActionType.setCompanyAddress]: (state, action) => {
        return {
            ...state,
            companyAddress: action.payload
        }
    },
    [NewInvoiceModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)