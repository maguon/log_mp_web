import {handleActions} from 'redux-actions';
import {InvoiceManagerActionType} from '../../actionTypes';

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
    [InvoiceManagerActionType.getInvoiceList]: (state, action) => {
        return {
            ...state,
            invoiceArray: action.payload
        }
    },
    [InvoiceManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [InvoiceManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionInvoiceNo]: (state, action) => {
        return {
            ...state,
            conditionInvoiceNo: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionCompany]: (state, action) => {
        return {
            ...state,
            conditionCompany: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionCompanyTax]: (state, action) => {
        return {
            ...state,
            conditionCompanyTax: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionUser]: (state, action) => {
        return {
            ...state,
            conditionUser: action.payload
        }
    }
}, initialState)