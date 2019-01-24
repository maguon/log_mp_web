import {handleActions} from 'redux-actions';
import {CommonActionType} from '../../actionTypes';

const initialState = {
    // 城市列表
    cityList: [],
    // 部门列表
    departmentList: [],

    // 订单信息
    orderInfo: [],
    // 订单信息：运送车辆列表
    orderCarArray: [],
    // 订单信息：估值总额
    totalValuation: 0,
    // 订单信息：总运费
    totalActFreight: 0,
    // 订单信息：总保费
    totalInsuranceFee: 0,

    // 订单信息：已支付列表
    orderPaymentArray: [],
    // 订单信息：支付总金额
    totalPayment: 0,
    // 订单信息：退款总金额
    totalRefund: 0
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
    [CommonActionType.getDepartmentList]: (state, action) => {
        let departmentList = [];
        action.payload.forEach((value) => {
            departmentList.push({value: value.id, label: value.department_name})
        });
        return {
            ...state,
            departmentList: departmentList
        }
    },
    [CommonActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
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
    [CommonActionType.setTotalInsuranceFee]: (state, action) => {
        return {
            ...state,
            totalInsuranceFee: action.payload
        }
    },
    [CommonActionType.getOrderPaymentList]: (state, action) => {
        return {
            ...state,
            orderPaymentArray: action.payload
        }
    },
    [CommonActionType.setOrderTotalPayment]: (state, action) => {
        return {
            ...state,
            totalPayment: action.payload
        }
    },
    [CommonActionType.setOrderTotalRefund]: (state, action) => {
        return {
            ...state,
            totalRefund: action.payload
        }
    }
}, initialState)