import {handleActions} from 'redux-actions';
import {EnquiryActionType} from '../../actionTypes';
const ConstConfig = require('../../config/ConstConfig');

// 画面用初期数据
const initialState = {
    // 模态状态 关闭
    modalIsOpen: false,
    // 城市列表
    cityList: [
        { value: '100', label: '大连' },
        { value: '101', label: '北京' },
        { value: '102', label: '上海' }],
    // 始发城市
    startCity: { value: '', label: '' },
    defaultStartCity: { value: '', label: '始发城市' },
    // 终到城市
    endCity: { value: '', label: '' },
    defaultEndCity: { value: '', label: '终到城市' },
    // 里程
    mileage : 0,
    // 服务方式列表
    serviceModeList: ConstConfig.SERVICE_MODE,
    // 服务方式
    serviceMode: { value: '', label: '' },
    defaultServiceMode: { value: '', label: '服务方式' },
    // 车型列表
    carModelList: ConstConfig.CAR_MODEL,
    // 车型
    carModel: { value: '', label: '' },
    defaultCarModel: { value: '', label: '车型' },

    // 是否新车列表
    carFlagList: ConstConfig.YES_NO,
    // 是否新车
    carFlag: { value: '', label: '' },
    defaultCarFlag: { value: '', label: '是否新车' },

    xxxxx : {}
};

export default handleActions(
    {
        [EnquiryActionType.enquiryModal]: (state, action) => {
            console.log('EnquiryReducer inner');
            return {
                ...state,
                modalIsOpen: action.payload
            }
        }
    }, initialState)