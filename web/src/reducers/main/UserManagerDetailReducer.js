import {handleActions} from 'redux-actions';
import {UserManagerDetailActionType} from '../../actionTypes';

const initialState = {

    // 基本信息TAB：用户信息
    userInfo: [],

    // 绑定车辆TAB：列表
    userCarArray: [],

    // 消息记录TAB： 检索条件：消息类型
    msgConditionType: null,
    // 消息记录TAB： 检索条件：发送时间(始)
    msgConditionStartDate: '',
    // 消息记录TAB： 检索条件：发送时间(终)
    msgConditionEndDate: '',
    // 消息记录TAB：开始位置
    msgStart: 0,
    // 消息记录TAB：每页数量
    msgSize: 9,
    // 消息记录TAB：检索结果数量
    msgDataSize: 0,
    // 消息记录TAB：列表
    messageArray: [],

    // 交易记录TAB：订单列表
    orderArray: [],
    // 交易记录TAB：订单内，商品列表
    productArray: [],

    // 收货地址TAB：列表
    addressArray: []
};

export default handleActions({
    [UserManagerDetailActionType.getUserInfo]: (state, action) => {
        return {
            ...state,
            userInfo: action.payload
        }
    },

    [UserManagerDetailActionType.getUserCarList]: (state, action) => {
        return {
            ...state,
            userCarArray: action.payload
        }
    },

    [UserManagerDetailActionType.setMsgConditionType]: (state, action) => {
        return {
            ...state,
            msgConditionType: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgConditionStartDate]: (state, action) => {
        return {
            ...state,
            msgConditionStartDate: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgConditionEndDate]: (state, action) => {
        return {
            ...state,
            msgConditionEndDate: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgStartNumber]: (state, action) => {
        return {
            ...state,
            msgStart: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgDataSize]: (state, action) => {
        return {
            ...state,
            msgDataSize: action.payload
        }
    },
    [UserManagerDetailActionType.getMessageList]: (state, action) => {
        return {
            ...state,
            messageArray: action.payload
        }
    },

    [UserManagerDetailActionType.getOrderList]: (state, action) => {
        return {
            ...state,
            orderArray: action.payload
        }
    },
    [UserManagerDetailActionType.getProductList]: (state, action) => {
        return {
            ...state,
            productArray: action.payload
        }
    },

    [UserManagerDetailActionType.getAddressList]: (state, action) => {
        return {
            ...state,
            addressArray: action.payload
        }
    }
}, initialState)