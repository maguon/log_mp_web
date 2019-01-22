import {handleActions} from 'redux-actions';
import {EditOrderCarModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 画面区分
    pageType: '',
    // 订单信息
    orderInfo: [],
    // 运送车辆ID
    orderItemId: '',
    // vin
    vin: '',
    // 品牌
    carBrand: null,
    // 型号
    carModel: null,
    // 车型
    carGrade: null,
    // 是否新车
    carFlag: true,
    // 估值
    valuation: '',
    // 是否购买保险
    insuranceFlag: true,
    // 预计运费
    freight: 0,
    // 预计保费
    insureFee: 0,
    // 实际运费
    actFreight: 0,
    // 实际保费
    actInsureFee: 0
};

export default handleActions({
    [EditOrderCarModalActionType.setPageType]: (state, action) => {
        return {
            ...state,
            pageType: action.payload
        }
    },
    [EditOrderCarModalActionType.setOrderInfo]: (state, action) => {
        return {
            ...state,
            orderInfo: action.payload
        }
    },
    [EditOrderCarModalActionType.setOrderItemId]: (state, action) => {
        return {
            ...state,
            orderItemId: action.payload
        }
    },
    [EditOrderCarModalActionType.setVin]: (state, action) => {
        return {
            ...state,
            vin: action.payload
        }
    },
    [EditOrderCarModalActionType.setCarBrand]: (state, action) => {
        return {
            ...state,
            carBrand: action.payload
        }
    },
    [EditOrderCarModalActionType.setCarModel]: (state, action) => {
        return {
            ...state,
            carModel: action.payload
        }
    },
    [EditOrderCarModalActionType.setCarGrade]: (state, action) => {
        return {
            ...state,
            carGrade: action.payload
        }
    },
    [EditOrderCarModalActionType.setCarFlag]: (state, action) => {
        return {
            ...state,
            carFlag: action.payload
        }
    },
    [EditOrderCarModalActionType.setValuation]: (state, action) => {
        return {
            ...state,
            valuation: action.payload
        }
    },
    [EditOrderCarModalActionType.setInsuranceFlag]: (state, action) => {
        return {
            ...state,
            insuranceFlag: action.payload
        }
    },
    [EditOrderCarModalActionType.setFreight]: (state, action) => {
        return {
            ...state,
            freight: action.payload
        }
    },
    [EditOrderCarModalActionType.setInsureFee]: (state, action) => {
        return {
            ...state,
            insureFee: action.payload
        }
    },
    [EditOrderCarModalActionType.setActFreight]: (state, action) => {
        return {
            ...state,
            actFreight: action.payload
        }
    },
    [EditOrderCarModalActionType.setActInsureFee]: (state, action) => {
        return {
            ...state,
            actInsureFee: action.payload
        }
    }
}, initialState)