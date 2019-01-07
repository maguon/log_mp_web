import {handleActions} from 'redux-actions';
import {InvoiceApplyManagerActionType} from '../../actionTypes';

const initialState = {
    // 每页数量
    size: 11,

    // TAB 开票申请：开始位置
    invoiceStart: 0,
    // TAB 开票申请：检索结果数量
    invoiceDataSize: 0,

    // 检索条件：发票抬头编号
    conditionInvoiceNo: '',
    // 检索条件：企业抬头
    conditionCompany: '',
    // 检索条件：企业税号
    conditionCompanyTax: '',
    // 检索条件：所属用户
    conditionUser: '',

    // 发票列表
    invoiceArray: [],


    // TAB 未开票订单：开始位置
    orderStart: 0,
    // TAB 未开票订单：检索结果数量
    orderDataSize: 0,

    // TAB 未开票订单：检索条件：订单编号
    conditionOrderNo: '',
    // TAB 未开票订单：检索条件：起始城市
    conditionOrderStartCity: null,
    // TAB 未开票订单：检索条件：目的城市
    conditionOrderEndCity: null,
    // TAB 未开票订单：检索条件：支付状态
    conditionOrderPaymentStatus: null,

    // TAB 未开票订单：检索条件：创建时间(始)
    conditionOrderCreatedOnStart: '',
    // TAB 未开票订单：检索条件：创建时间(终)
    conditionOrderCreatedOnEnd: '',
    // TAB 未开票订单：检索条件：创建人
    conditionOrderCreateUser: '',

    // TAB 未开票订单：订单检索结果列表
    orderArray: []
};

export default handleActions({
    [InvoiceApplyManagerActionType.getInvoiceList]: (state, action) => {
        return {
            ...state,
            invoiceArray: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setInvoiceStartNumber]: (state, action) => {
        return {
            ...state,
            invoiceStart: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setInvoiceDataSize]: (state, action) => {
        return {
            ...state,
            invoiceDataSize: action.payload
        }
    },


    [InvoiceApplyManagerActionType.setConditionInvoiceNo]: (state, action) => {
        return {
            ...state,
            conditionInvoiceNo: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setConditionCompany]: (state, action) => {
        return {
            ...state,
            conditionCompany: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setConditionCompanyTax]: (state, action) => {
        return {
            ...state,
            conditionCompanyTax: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setConditionUser]: (state, action) => {
        return {
            ...state,
            conditionUser: action.payload
        }
    },




    [InvoiceApplyManagerActionType.getOrderList]: (state, action) => {
        return {
            ...state,
            orderArray: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setOrderStartNumber]: (state, action) => {
        return {
            ...state,
            orderStart: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setOrderDataSize]: (state, action) => {
        return {
            ...state,
            orderDataSize: action.payload
        }
    },


    [InvoiceApplyManagerActionType.setConditionOrderNo]: (state, action) => {
        return {
            ...state,
            conditionOrderNo: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setConditionOrderStartCity]: (state, action) => {
        return {
            ...state,
            conditionOrderStartCity: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setConditionOrderEndCity]: (state, action) => {
        return {
            ...state,
            conditionOrderEndCity: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setConditionOrderPaymentStatus]: (state, action) => {
        return {
            ...state,
            conditionOrderPaymentStatus: action.payload
        }
    },


    [InvoiceApplyManagerActionType.setConditionOrderCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionOrderCreatedOnStart: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setConditionOrderCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionOrderCreatedOnEnd: action.payload
        }
    },
    [InvoiceApplyManagerActionType.setConditionOrderCreateUser]: (state, action) => {
        return {
            ...state,
            conditionOrderCreateUser: action.payload
        }
    },
}, initialState)