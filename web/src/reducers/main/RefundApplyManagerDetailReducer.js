import {handleActions} from 'redux-actions';
import {RefundApplyManagerDetailActionType} from '../../actionTypes';

const initialState = {
    // 退款申请信息
    refundApplyInfo: []
};

export default handleActions({
    [RefundApplyManagerDetailActionType.getRefundApplyInfo]: (state, action) => {
        return {
            ...state,
            refundApplyInfo: action.payload
        }
    }
}, initialState)