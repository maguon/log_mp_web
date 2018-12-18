import {handleActions} from 'redux-actions';
import {NewOrderModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 起始城市
    startCity: '',
    // 目的城市
    endCity: '',
    // 服务方式
    serviceType: ''
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
    }
}, initialState)