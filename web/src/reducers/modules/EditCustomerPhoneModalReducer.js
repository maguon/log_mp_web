import {handleActions} from 'redux-actions';
import {EditCustomerPhoneModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 客服电话ID
    customerPhoneId: '',
    // 客服电话
    customerPhone: '',
};

export default handleActions({
    [EditCustomerPhoneModalActionType.setCustomerPhoneId]: (state, action) => {
        return {
            ...state,
            customerPhoneId: action.payload
        }
    },
    [EditCustomerPhoneModalActionType.setCustomerPhone]: (state, action) => {
        return {
            ...state,
            customerPhone: action.payload
        }
    }
}, initialState)