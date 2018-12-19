import {handleActions} from 'redux-actions';
import {CommonActionType} from '../../actionTypes';

const initialState = {
    // 城市列表
    cityList: [],
    // 订单信息：运送车辆列表
    orderCarArray: [],
    // 订单信息：估值总额
    totalValuation: 0,
    // 订单信息：总运费
    totalActFreight: 0,
};

export default handleActions({
    [CommonActionType.getCityList]: (state, action) => {
        let cityList = [];
        action.payload.forEach((value) => {
            cityList.push({value: value.id, label: value.city_name})
        });
        return {
            ...state,
            cityList: cityList
        }
    },
    [CommonActionType.getOrderCarList]: (state, action) => {
        return {
            ...state,
            orderCarArray: action.payload
        }
    },
    [CommonActionType.setTotalValuation]: (state, action) => {
        return {
            ...state,
            totalValuation: action.payload
        }
    },
    [CommonActionType.setTotalActFreight]: (state, action) => {
        return {
            ...state,
            totalActFreight: action.payload
        }
    },
}, initialState)

