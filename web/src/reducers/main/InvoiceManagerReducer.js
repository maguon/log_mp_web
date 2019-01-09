import {handleActions} from 'redux-actions';
import {InvoiceManagerActionType} from '../../actionTypes';

const initialState = {
    // 每页数量
    size: 11,
    // 开始位置
    start: 0,
    // 检索结果数量
    dataSize: 0,

    // 检索条件 发票申请编号
    conditionInvoiceApplyNo: '',
    // 检索条件：订单编号
    conditionInvoiceOrderNo: '',
    // 检索条件 企业税号
    conditionCompanyTax: '',
    // 检索条件 发票抬头
    conditionInvoiceTitle: '',
    // 检索条件 创建人
    conditionInvoiceOrderCreateUser: '',

    // 检索条件：申请时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：申请时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：处理时间(始)
    conditionInvoiceCreatedOnStart: '',
    // 检索条件：处理时间(终)
    conditionInvoiceCreatedOnEnd: '',
    // 检索条件：状态
    conditionInvoiceApplyStatus: null,

    // 发票申请列表
    invoiceArray: []
};

export default handleActions({
    [InvoiceManagerActionType.getInvoiceList]: (state, action) => {
        return {
            ...state,
            invoiceArray: action.payload
        }
    },
    [InvoiceManagerActionType.setInvoiceStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [InvoiceManagerActionType.setInvoiceDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionInvoiceApplyNo]: (state, action) => {
        return {
            ...state,
            conditionInvoiceApplyNo: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionInvoiceOrderNo]: (state, action) => {
        return {
            ...state,
            conditionInvoiceOrderNo: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionCompanyTax]: (state, action) => {
        return {
            ...state,
            conditionCompanyTax: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionInvoiceTitle]: (state, action) => {
        return {
            ...state,
            conditionInvoiceTitle: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionInvoiceOrderCreateUser]: (state, action) => {
        return {
            ...state,
            conditionInvoiceOrderCreateUser: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionInvoiceCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionInvoiceCreatedOnStart: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionInvoiceCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionInvoiceCreatedOnEnd: action.payload
        }
    },
    [InvoiceManagerActionType.setConditionInvoiceApplyStatus]: (state, action) => {
        return {
            ...state,
            conditionInvoiceApplyStatus: action.payload
        }
    }
}, initialState)