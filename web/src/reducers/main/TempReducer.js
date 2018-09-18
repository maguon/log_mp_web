import {handleActions} from 'redux-actions';
import {EnquiryActionType} from '../../actionTypes';

const ConstConfig = require('../../config/ConstConfig');

// 画面用初期数据
const initialState = {
    data: {
        //
        mobile : 'temp user',
        // 始发城市
        startDate: '2011-01-01',
        // 估值
        startDateTT: '2018-01-04',

    },
    // 城市列表
    startDate: '2011-01-04',
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
        }

    }, initialState)