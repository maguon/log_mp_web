import {handleActions} from 'redux-actions';
import {CallCenterSettingActionType} from '../../actionTypes';

const initialState = {
    // 客服电话
    customerPhone: '',
    // 客服电话列表
    customerPhoneArray: []
};

export default handleActions({
    [CallCenterSettingActionType.getCustomerPhoneList]: (state, action) => {
        return {
            ...state,
            customerPhoneArray: action.payload
        }
    },
    [CallCenterSettingActionType.setCustomerPhone]: (state, action) => {
        return {
            ...state,
            customerPhone: action.payload
        }
    }
}, initialState)