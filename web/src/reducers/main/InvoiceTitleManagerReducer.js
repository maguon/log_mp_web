import {handleActions} from 'redux-actions';
import {InvoiceTitleManagerActionType} from '../../actionTypes';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：发票抬头编号
    conditionInvoiceNo: '',
    // 检索条件：企业抬头
    conditionCompany: '',
    // 检索条件：企业税号
    conditionCompanyTax: '',
    // 检索条件：所属用户
    conditionUser: '',

    // 发票列表
    invoiceArray: []
};

export default handleActions({
    [InvoiceTitleManagerActionType.getInvoiceList]: (state, action) => {
        return {
            ...state,
            invoiceArray: action.payload
        }
    },
    [InvoiceTitleManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [InvoiceTitleManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [InvoiceTitleManagerActionType.setConditionInvoiceNo]: (state, action) => {
        return {
            ...state,
            conditionInvoiceNo: action.payload
        }
    },
    [InvoiceTitleManagerActionType.setConditionCompany]: (state, action) => {
        return {
            ...state,
            conditionCompany: action.payload
        }
    },
    [InvoiceTitleManagerActionType.setConditionCompanyTax]: (state, action) => {
        return {
            ...state,
            conditionCompanyTax: action.payload
        }
    },
    [InvoiceTitleManagerActionType.setConditionUser]: (state, action) => {
        return {
            ...state,
            conditionUser: action.payload
        }
    }
}, initialState)