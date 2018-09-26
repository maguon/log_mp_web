import {handleActions} from 'redux-actions';
import {EnquiryActionType} from '../../actionTypes';

const ConstConfig = require('../../config/ConstConfig');

// 画面用初期数据
const initialState = {
    // 城市列表
    cityList: [],
    // 服务方式列表
    serviceModeList: ConstConfig.SERVICE_MODE,
    // 车型列表
    carModelList: ConstConfig.CAR_MODEL,
    // 是否新车列表
    carFlagList: ConstConfig.YES_NO,

    // 始发城市
    startCity: {value: '', label: '始发城市'},
    // 终到城市
    endCity: {value: '', label: '终到城市'},
    // 服务方式
    serviceMode: {value: '', label: '服务方式'},
    // 车型
    carModel: {value: '', label: '车型'},
    // 是否新车
    carFlag: {value: '', label: '是否新车'},
    // 估值
    valuation: '',

    errorRouteFlg: false,
    // 里程
    mileage: 0,
    // 预计运费
    freight: 0,
};

export default handleActions(
    {
        [EnquiryActionType.getCityList]: (state, action) => {
            let cityList = [];
            action.payload.forEach((value) => {
                cityList.push({value: value.id, label: value.city_name})
            });
            return {
                ...state,
                cityList: cityList
            }
        },

        [EnquiryActionType.setStartCity]: (state, action) => {
            return {
                ...state,
                startCity: action.payload
            }
        },
        [EnquiryActionType.setEndCity]: (state, action) => {
            return {
                ...state,
                endCity: action.payload
            }
        },
        [EnquiryActionType.setServiceMode]: (state, action) => {
            return {
                ...state,
                serviceMode: action.payload
            }
        },
        [EnquiryActionType.setCarModel]: (state, action) => {
            return {
                ...state,
                carModel: action.payload
            }
        },
        [EnquiryActionType.setCarFlag]: (state, action) => {
            return {
                ...state,
                carFlag: action.payload
            }
        },
        [EnquiryActionType.setValuation]: (state, action) => {
            return {
                ...state,
                valuation: action.payload
            }
        },

        [EnquiryActionType.setErrorRouteFlg]: (state, action) => {
            return {
                ...state,
                errorRouteFlg: action.payload
            }
        },
        [EnquiryActionType.setMileage]: (state, action) => {
            return {
                ...state,
                mileage: action.payload
            }
        },
        [EnquiryActionType.setFreight]: (state, action) => {
            return {
                ...state,
                freight: action.payload
            }
        }
    }, initialState)