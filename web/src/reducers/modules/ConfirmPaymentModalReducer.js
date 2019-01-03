import {handleActions} from 'redux-actions';
import {ConfirmPaymentModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 前画面
    prePage: '',
    // 支付ID
    paymentId: '',
    // 金额
    paymentMoney: ''
};

export default handleActions({
    [ConfirmPaymentModalActionType.setPrePage]: (state, action) => {
        return {
            ...state,
            prePage: action.payload
        }
    },
    [ConfirmPaymentModalActionType.setPaymentId]: (state, action) => {
        return {
            ...state,
            paymentId: action.payload
        }
    },
    [ConfirmPaymentModalActionType.setPaymentMoney]: (state, action) => {
        return {
            ...state,
            paymentMoney: action.payload
        }
    }
}, initialState)