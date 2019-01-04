import {handleActions} from 'redux-actions';
import {ConfirmRefundModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 退款申请 基本信息
    refundApplyInfo: null,
    // 退款金额
    refundMoney: '',
    // 退款描述
    refundRemark: ''
};

export default handleActions({
    [ConfirmRefundModalActionType.setRefundApplyInfo]: (state, action) => {
        return {
            ...state,
            refundApplyInfo: action.payload
        }
    },
    [ConfirmRefundModalActionType.setRefundMoney]: (state, action) => {
        return {
            ...state,
            refundMoney: action.payload
        }
    },
    [ConfirmRefundModalActionType.setRefundRemark]: (state, action) => {
        return {
            ...state,
            refundRemark: action.payload
        }
    }
}, initialState)