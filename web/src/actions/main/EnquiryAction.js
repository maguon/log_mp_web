import {EnquiryActionType} from "../../actionTypes";
import {reset} from 'redux-form'
import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');
const FormatUtil = require('../../util/FormatUtil');
const ConstConfig = require('../../config/ConstConfig');

export const getCityList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/city';
        const res = await httpUtil.httpGet(url);

        if (res.success === true) {
            dispatch({type: EnquiryActionType.getCityList, payload: res.result})
        } else if (res.success === false) {
            swal('获取城市信息失败', res.msg, 'warning');
        }
    } catch (err) {
        // alert message
        swal('操作失败', err.message, 'error');
    }
};

export const openEnquiryModal = () => async (dispatch) => {
    // 清空画面数据
    dispatch(reset('EnquiryFormValues'));
    // 询价画面 初期
    // 始发城市
    dispatch({type: EnquiryActionType.setStartCity, payload: {value: '', label: '始发城市'}});
    // 终到城市
    dispatch({type: EnquiryActionType.setEndCity, payload: {value: '', label: '终到城市'}});
    // 服务方式
    dispatch({type: EnquiryActionType.setServiceMode, payload: {value: '', label: '服务方式'}});
    // 车型
    dispatch({type: EnquiryActionType.setCarModel, payload: {value: '', label: '车型'}});
    // 是否新车
    dispatch({type: EnquiryActionType.setCarFlag, payload: {value: '', label: '是否新车'}});
    // 估值
    dispatch({type: EnquiryActionType.setValuation, payload: ''});
    // 里程
    dispatch({type: EnquiryActionType.setErrorRouteFlg, payload: false});
    dispatch({type: EnquiryActionType.setMileage, payload: 0});
    // 预计运费
    dispatch({type: EnquiryActionType.setFreight, payload: FormatUtil.NumberFormat(0, 2)})
};


/**
 * 根据开始城市-终到城市，设定画面里程显示。
 */
export const calculateMileage = () => async (dispatch, getState) => {
    try {
        // const enquiryFormValues = getState().form.EnquiryFormValues.values;

        const startCityId = getState().EnquiryReducer.startCity.value;
        const endCityId = getState().EnquiryReducer.endCity.value;

        // 当 始发城市，终到城市 都选择的时候，调用接口
        if (startCityId !== '' && endCityId !== '') {
            // 取得 开始城市-终到城市 里程数
            const url = apiHost + '/api/route?routeStartId=' + startCityId + '&routeEndId=' + endCityId;
            const res = await httpUtil.httpGet(url);
            if (res.success === true) {
                // 有数据时，更新里程，清除画面提示文字
                if (res.result.length > 0) {
                    dispatch({type: EnquiryActionType.setErrorRouteFlg, payload: false});
                    dispatch({type: EnquiryActionType.setMileage, payload: res.result[0].distance});

                    dispatch(calculateFreight())
                } else {
                    // 无数据时，更新里程，清除画面提示文字
                    dispatch({type: EnquiryActionType.setErrorRouteFlg, payload: true});
                    // 里程
                    dispatch({type: EnquiryActionType.setMileage, payload: 0});
                    // 预计运费
                    dispatch({type: EnquiryActionType.setFreight, payload: FormatUtil.NumberFormat(0, 2)})
                }
            } else if (res.success === false) {
                swal('获取线路信息失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

/**
 * 设定画面预计运费结果。
 */
export const calculateFreight = () => (dispatch, getState) => {
    // 里程
    const mileage = getState().EnquiryReducer.mileage;
    // 服务方式
    const serviceMode = getState().EnquiryReducer.serviceMode.value;
    // 车型
    const carModel = getState().EnquiryReducer.carModel.value;
    // 是否新车
    const carFlag = getState().EnquiryReducer.carFlag.value;
    // 估值
    const valuation = getState().EnquiryReducer.valuation;

    // 预计运费
    let freight = 0;

    if (mileage !== 0 && serviceMode !== '' && carModel !== '' && carFlag !== '' && valuation !== '') {
        // 暂定公式：里程 * 里程单价 * 车型系数 * 是否新车系数 + 估值*估值比率  + 服务方式费用
        // 里程单价 --> ConstConfig.ENQUIRY_PARAMS.unitPrice
        // 车型系数 --> ConstConfig.CAR_MODEL[x].ratio
        // 是否新车系数 --> ConstConfig.YES_NO[x].ratio
        // 估值比率 --> ConstConfig.ENQUIRY_PARAMS.valuationRate
        // 服务方式费用 --> ConstConfig.SERVICE_MODE[x].fee

        freight = mileage * ConstConfig.ENQUIRY_PARAMS.unitPrice * ConstConfig.CAR_MODEL[carModel - 1].ratio * ConstConfig.YES_NO[carFlag].ratio
            + valuation * ConstConfig.ENQUIRY_PARAMS.valuationRate + ConstConfig.SERVICE_MODE[serviceMode - 1].fee;
    }

    dispatch({type: EnquiryActionType.setFreight, payload: FormatUtil.NumberFormat(freight, 2)})
};

