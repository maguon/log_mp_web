import {handleActions} from 'redux-actions';
import {NewOrderModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 起始城市
    startCity: '',
    // 目的城市
    endCity: '',
    // 服务方式
    serviceType: '',
    // 错误路线标记
    errorRouteFlg: false,
    // 保存成功后的订单编号
    newOrderId: ''
};

export default handleActions({
    [NewOrderModalActionType.setStartCity]: (state, action) => {
        return {
            ...state,
            startCity: action.payload
        }
    },
    [NewOrderModalActionType.setEndCity]: (state, action) => {
        return {
            ...state,
            endCity: action.payload
        }
    },
    [NewOrderModalActionType.setServiceType]: (state, action) => {
        return {
            ...state,
            serviceType: action.payload
        }
    },
    [NewOrderModalActionType.setErrorRouteFlg]: (state, action) => {
        return {
            ...state,
            errorRouteFlg: action.payload
        }
    },
    [NewOrderModalActionType.setNewOrderId]: (state, action) => {
        return {
            ...state,
            newOrderId: action.payload
        }
    }
}, initialState)