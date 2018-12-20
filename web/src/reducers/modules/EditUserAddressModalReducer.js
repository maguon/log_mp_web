import {handleActions} from 'redux-actions';
import {EditUserAddressModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 订单ID
    orderId: '',
    // 画面区分
    pageType: '',
    // 用户
    orderUser: '',
    // 电话
    orderPhone: '',
    // 地址
    orderAddress: ''
};

export default handleActions({
    [EditUserAddressModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    },
    [EditUserAddressModalActionType.setPageType]: (state, action) => {
        return {
            ...state,
            pageType: action.payload
        }
    },
    [EditUserAddressModalActionType.setOrderUser]: (state, action) => {
        return {
            ...state,
            orderUser: action.payload
        }
    },
    [EditUserAddressModalActionType.setOrderPhone]: (state, action) => {
        return {
            ...state,
            orderPhone: action.payload
        }
    },
    [EditUserAddressModalActionType.setOrderAddress]: (state, action) => {
        return {
            ...state,
            orderAddress: action.payload
        }
    }
}, initialState)