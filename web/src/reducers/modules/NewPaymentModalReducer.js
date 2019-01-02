import {handleActions} from 'redux-actions';
import {NewPaymentModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 画面区分
    pageType: '',
    // 订单编号
    orderId: '',
    // 支付编号
    paymentId: '',
    // 应付运费
    freight: 0,
    // 应付保费
    insuranceFee: 0,
    // 应付总额
    totalFee: 0,
    // 剩余应付
    leftPayment: 0,
    // 付款银行
    paymentBank: '',
    // 银行账号
    bankNum: '',
    // 户主姓名
    bankUser: '',
    // 本次支付
    paymentFee: ''
};

export default handleActions({
    [NewPaymentModalActionType.setPageType]: (state, action) => {
        return {
            ...state,
            pageType: action.payload
        }
    },
    [NewPaymentModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    },
    [NewPaymentModalActionType.setPaymentId]: (state, action) => {
        return {
            ...state,
            paymentId: action.payload
        }
    },
    [NewPaymentModalActionType.setFreight]: (state, action) => {
        return {
            ...state,
            freight: action.payload
        }
    },
    [NewPaymentModalActionType.setInsuranceFee]: (state, action) => {
        return {
            ...state,
            insuranceFee: action.payload
        }
    },
    [NewPaymentModalActionType.setTotalFee]: (state, action) => {
        return {
            ...state,
            totalFee: action.payload
        }
    },
    [NewPaymentModalActionType.setLeftPayment]: (state, action) => {
        return {
            ...state,
            leftPayment: action.payload
        }
    },
    [NewPaymentModalActionType.setPaymentBank]: (state, action) => {
        return {
            ...state,
            paymentBank: action.payload
        }
    },
    [NewPaymentModalActionType.setBankNum]: (state, action) => {
        return {
            ...state,
            bankNum: action.payload
        }
    },
    [NewPaymentModalActionType.setBankUser]: (state, action) => {
        return {
            ...state,
            bankUser: action.payload
        }
    },
    [NewPaymentModalActionType.setPaymentFee]: (state, action) => {
        return {
            ...state,
            paymentFee: action.payload
        }
    }
}, initialState)