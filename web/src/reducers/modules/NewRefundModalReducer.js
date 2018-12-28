import {handleActions} from 'redux-actions';
import {NewRefundModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 订单编号
    orderId: '',
    // 申请金额
    refundFee: '',
    // 支付列表
    paymentArray: [],
    // 选中支付
    selectedItem: null,
    // 申请原因
    remark: ''
};

export default handleActions({
    [NewRefundModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    },
    [NewRefundModalActionType.setRefundFee]: (state, action) => {
        return {
            ...state,
            refundFee: action.payload
        }
    },
    [NewRefundModalActionType.getPaymentArray]: (state, action) => {
        return {
            ...state,
            paymentArray: action.payload
        }
    },
    [NewRefundModalActionType.setSelectedItem]: (state, action) => {
        return {
            ...state,
            selectedItem: action.payload
        }
    },
    [NewRefundModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)