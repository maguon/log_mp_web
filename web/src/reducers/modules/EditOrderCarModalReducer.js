import {handleActions} from 'redux-actions';
import {EditOrderCarModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 画面区分
    pageType: '',
    // 订单信息
    orderInfo: [],

    // vin
    vin: '',
    // 车型
    carModel: null,
    // 是否新车
    carFlag: null,
    // 估值
    valuation: '',
    // 是否购买保险
    insuranceFlag: '1',

    // 预计运费
    freight: 0,
    // 实际运费
    actFreight: 0
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



    [EditOrderCarModalActionType.setVin]: (state, action) => {
        return {
            ...state,
            vin: action.payload
        }
    },
    [EditOrderCarModalActionType.setCarModel]: (state, action) => {
        return {
            ...state,
            carModel: action.payload
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
    [EditOrderCarModalActionType.setActFreight]: (state, action) => {
        return {
            ...state,
            actFreight: action.payload
        }
    },
}, initialState)