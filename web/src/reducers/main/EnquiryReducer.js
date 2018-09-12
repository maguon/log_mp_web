import {handleActions} from 'redux-actions';
import {EnquiryActionType} from '../../actionTypes';
const ConstConfig = require('../../config/ConstConfig');

// 画面用初期数据
const initialState = {
    data: {
        // 始发城市
        startCity: 'Red',
        // 终到城市
        endCity: { value: '', label: '' },
        // 里程
        mileage : 0,
        // 服务方式
        serviceMode: { value: '', label: '' },
        // 车型
        carModel: { value: '', label: '' },
        // 是否新车
        carFlag: { value: '', label: '' },

        // 估值
        valuation : '',

        // 预计运费
        freight : 0.00
    },

    // 模态状态 关闭
    modalIsOpen: false,
    // 城市列表
    cityList: [
        { value: '100', label: '大连' },
        { value: '101', label: '北京' },
        { value: '102', label: '上海' }],
    // 服务方式列表
    serviceModeList: ConstConfig.SERVICE_MODE,
    // 车型列表
    carModelList: ConstConfig.CAR_MODEL,
    // 是否新车列表
    carFlagList: ConstConfig.YES_NO,

    defaultStartCity: { value: '', label: '始发城市' },
    defaultEndCity: { value: '', label: '终到城市' },
    defaultServiceMode: { value: '', label: '服务方式' },
    defaultCarModel: { value: '', label: '车型' },
    defaultCarFlag: { value: '', label: '是否新车' },
};

export default handleActions(
    {
        [EnquiryActionType.enquiryModal]: (state, action) => {
            return {
                ...state,
                modalIsOpen: action.payload
            }
        },
        [EnquiryActionType.enquiryFreight]: (state, action) => {
            return {
                ...state,
                freight: action.payload
            }
        }
    }, initialState)