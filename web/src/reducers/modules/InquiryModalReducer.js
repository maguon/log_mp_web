import {handleActions} from 'redux-actions';
import {InquiryModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 始发城市
    startCity: null,
    // 终到城市
    endCity: null,
    // 服务方式
    serviceMode: null,
    // 车型
    carModel: null,
    // 是否新车
    carFlag: null,
    // 估值
    valuation: '',
    // 是否购买保险
    insuranceFlag: '1',

    // 错误路线标记
    errorRouteFlg: false,
    // 里程
    mileage: 0,
    // 预计运费
    freight: 0,
    // 预计保费
    insuranceFee: 0
};

export default handleActions({
    [InquiryModalActionType.setStartCity]: (state, action) => {
        return {
            ...state,
            startCity: action.payload
        }
    },
    [InquiryModalActionType.setEndCity]: (state, action) => {
        return {
            ...state,
            endCity: action.payload
        }
    },
    [InquiryModalActionType.setServiceMode]: (state, action) => {
        return {
            ...state,
            serviceMode: action.payload
        }
    },
    [InquiryModalActionType.setCarModel]: (state, action) => {
        return {
            ...state,
            carModel: action.payload
        }
    },
    [InquiryModalActionType.setCarFlag]: (state, action) => {
        return {
            ...state,
            carFlag: action.payload
        }
    },
    [InquiryModalActionType.setValuation]: (state, action) => {
        return {
            ...state,
            valuation: action.payload
        }
    },
    [InquiryModalActionType.setInsuranceFlag]: (state, action) => {
        return {
            ...state,
            insuranceFlag: action.payload
        }
    },
    [InquiryModalActionType.setErrorRouteFlg]: (state, action) => {
        return {
            ...state,
            errorRouteFlg: action.payload
        }
    },
    [InquiryModalActionType.setMileage]: (state, action) => {
        return {
            ...state,
            mileage: action.payload
        }
    },
    [InquiryModalActionType.setFreight]: (state, action) => {
        return {
            ...state,
            freight: action.payload
        }
    },
    [InquiryModalActionType.setInsuranceFee]: (state, action) => {
        return {
            ...state,
            insuranceFee: action.payload
        }
    }
}, initialState)