import {handleActions} from 'redux-actions';
import {CommonActionType} from '../../actionTypes';

const initialState = {
    // 城市列表
    cityList: [],
    // 商品列表
    productList: [],
    // 供应商列表
    supplierList: [],
    // 部门列表
    departmentList: [],
    // 员工列表
    adminUserList: [],
    // 推广人列表
    recommendList: [],

    // 订单信息
    orderInfo: [],
    // 商品订单信息
    productOrderInfo: [],
    // 支付信息
    paymentInfo: [],
    // 是否显示订单车辆列表
    showOrderCarListFlag: false,
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
    [CommonActionType.getProductList]: (state, action) => {
        let productList = [];
        action.payload.forEach((value) => {
            productList.push({value: value.id, label: value.commodity_name})
        });
        return {
            ...state,
            productList: productList
        }
    },
    [CommonActionType.getSupplierList]: (state, action) => {
        let supplierList = [];
        action.payload.forEach((value) => {
            supplierList.push({value: value.id, label: value.supplier_short})
        });
        return {
            ...state,
            supplierList: supplierList
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
    [CommonActionType.getAdminUserList]: (state, action) => {
        let adminUserList = [];
        action.payload.forEach((value) => {
            adminUserList.push({value: value.id, label: value.real_name})
        });
        return {
            ...state,
            adminUserList: adminUserList
        }
    },
    [CommonActionType.getRecommendList]: (state, action) => {
        let recommendList = [];
        action.payload.forEach((value) => {
            recommendList.push({value: value.id, label: value.name})
        });
        return {
            ...state,
            recommendList: recommendList
        }
    },
    [CommonActionType.getOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [CommonActionType.getProductOrderInfo]: (state, action) => {
        return {
            ...state,
            productOrderInfo: action.payload
        }
    },
    [CommonActionType.getPaymentInfo]: (state, action) => {
        return {
            ...state,
            paymentInfo: action.payload
        }
    },
    [CommonActionType.setShowOrderCarListFlag]: (state, action) => {
        return {
            ...state,
            showOrderCarListFlag: action.payload
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