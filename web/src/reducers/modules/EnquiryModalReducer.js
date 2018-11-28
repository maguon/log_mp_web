import {handleActions} from 'redux-actions';
import {EnquiryModalActionType} from '../../actionTypes';

// 画面用初期数据
const initialState = {
    // 城市列表
    cityList: [],

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

    // 错误路线标记
    errorRouteFlg: false,
    // 里程
    mileage: 0,
    // 预计运费
    freight: 0
};

export default handleActions({
    [EnquiryModalActionType.getCityList]: (state, action) => {
        let cityList = [];
        action.payload.forEach((value) => {
            cityList.push({value: value.id, label: value.city_name})
        });
        return {
            ...state,
            cityList: cityList
        }
    },

    [EnquiryModalActionType.setStartCity]: (state, action) => {
        return {
            ...state,
            startCity: action.payload
        }
    },
    [EnquiryModalActionType.setEndCity]: (state, action) => {
        return {
            ...state,
            endCity: action.payload
        }
    },
    [EnquiryModalActionType.setServiceMode]: (state, action) => {
        return {
            ...state,
            serviceMode: action.payload
        }
    },
    [EnquiryModalActionType.setCarModel]: (state, action) => {
        return {
            ...state,
            carModel: action.payload
        }
    },
    [EnquiryModalActionType.setCarFlag]: (state, action) => {
        return {
            ...state,
            carFlag: action.payload
        }
    },
    [EnquiryModalActionType.setValuation]: (state, action) => {
        return {
            ...state,
            valuation: action.payload
        }
    },

    [EnquiryModalActionType.setErrorRouteFlg]: (state, action) => {
        return {
            ...state,
            errorRouteFlg: action.payload
        }
    },
    [EnquiryModalActionType.setMileage]: (state, action) => {
        return {
            ...state,
            mileage: action.payload
        }
    },
    [EnquiryModalActionType.setFreight]: (state, action) => {
        return {
            ...state,
            freight: action.payload
        }
    }
}, initialState)