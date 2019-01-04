import {handleActions} from 'redux-actions';
import {RefuseRefundModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 退款申请 基本信息
    refundApplyInfo: [],
    // 拒绝原因
    refuseReason: ''
};

export default handleActions({
    [RefuseRefundModalActionType.setRefundApplyInfo]: (state, action) => {
        return {
            ...state,
            refundApplyInfo: action.payload
        }
    },
    [RefuseRefundModalActionType.setRefuseReason]: (state, action) => {
        return {
            ...state,
            refuseReason: action.payload
        }
    }
}, initialState)