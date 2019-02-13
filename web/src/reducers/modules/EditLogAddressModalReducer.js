import {handleActions} from 'redux-actions';
import {EditLogAddressModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 订单ID
    orderId: '',
    // 发货城市
    sendCity: '',
    // 发货地址列表
    sendAddressArray: [],
    // 发货地址
    sendAddress: null,
    // 收货城市
    recvCity: '',
    // 收货地址列表
    recvAddressArray: [],
    // 收货地址
    recvAddress: null,
};

export default handleActions({
    [EditLogAddressModalActionType.setOrderId]: (state, action) => {
        return {
            ...state,
            orderId: action.payload
        }
    },
    [EditLogAddressModalActionType.setSendCity]: (state, action) => {
        return {
            ...state,
            sendCity: action.payload
        }
    },
    [EditLogAddressModalActionType.getSendAddressList]: (state, action) => {
        let sendAddressList = [];
        action.payload.forEach((value) => {
            sendAddressList.push({value: value.id, label: value.address})
        });
        return {
            ...state,
            sendAddressArray: sendAddressList
        }
    },
    [EditLogAddressModalActionType.setSendAddress]: (state, action) => {
        return {
            ...state,
            sendAddress: action.payload
        }
    },
    [EditLogAddressModalActionType.setRecvCity]: (state, action) => {
        return {
            ...state,
            recvCity: action.payload
        }
    },
    [EditLogAddressModalActionType.getRecvAddressList]: (state, action) => {
        let recvAddressList = [];
        action.payload.forEach((value) => {
            recvAddressList.push({value: value.id, label: value.address})
        });
        return {
            ...state,
            recvAddressArray: recvAddressList
        }
    },
    [EditLogAddressModalActionType.setRecvAddress]: (state, action) => {
        return {
            ...state,
            recvAddress: action.payload
        }
    }
}, initialState)