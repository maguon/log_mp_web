import {handleActions} from 'redux-actions';
import {EnquiryActionType} from '../../actionTypes';

const ConstConfig = require('../../config/ConstConfig');

// 画面用初期数据
const initialState = {
    // data: {
    //     // 始发城市
    //     startCity: {value: '', label: '始发城市'},
    //     // 终到城市
    //     endCity: {value: '', label: '终到城市'},
    //     // 服务方式
    //     serviceMode: {value: '', label: '服务方式'},
    //     // 车型
    //     carModel: {value: '', label: '车型'},
    //     // 是否新车
    //     carFlag: {value: '', label: '是否新车'},
    //     // 估值
    //     valuation: '',
    // },
    // 城市列表
    cityList: [],
    // 服务方式列表
    serviceModeList: ConstConfig.SERVICE_MODE,
    // 车型列表
    carModelList: ConstConfig.CAR_MODEL,
    // 是否新车列表
    carFlagList: ConstConfig.YES_NO,
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
        [EnquiryActionType.enquiryModal]: (state, action) => {
            return {
                ...state,
                // 里程
                mileage: action.payload,
                // 预计运费
                freight: action.payload,

            }
        },
        [EnquiryActionType.enquiryFreight]: (state, action) => {
            return {
                ...state,
                freight: action.payload
            }
        }
    }, initialState)