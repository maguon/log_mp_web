import {handleActions} from 'redux-actions';
import {CancelOrderModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 订单ID
    orderId: '',
    // 备注
    remark: ''
};

export default handleActions({
    [CancelOrderModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    },
    [CancelOrderModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)