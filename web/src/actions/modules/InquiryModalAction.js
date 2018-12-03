import {InquiryModalActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');
const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');

export const getCityList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/city';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InquiryModalActionType.getCityList, payload: res.result})
        } else if (res.success === false) {
            swal('获取城市信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const initInquiryModal = () => async (dispatch) => {
    // 询价画面 初期
    // 始发城市
    dispatch({type: InquiryModalActionType.setStartCity, payload: null});
    // 终到城市
    dispatch({type: InquiryModalActionType.setEndCity, payload: null});
    // 服务方式
    dispatch({type: InquiryModalActionType.setServiceMode, payload: null});
    // 车型
    dispatch({type: InquiryModalActionType.setCarModel, payload: null});
    // 是否新车
    dispatch({type: InquiryModalActionType.setCarFlag, payload: null});
    // 估值
    dispatch({type: InquiryModalActionType.setValuation, payload: ''});
    // 里程
    dispatch({type: InquiryModalActionType.setErrorRouteFlg, payload: false});
    dispatch({type: InquiryModalActionType.setMileage, payload: 0});
    // 预计运费
    dispatch({type: InquiryModalActionType.setFreight, payload: formatUtil.formatNumber(0, 2)})
};

/**
 * 根据开始城市-终到城市，设定画面里程显示。
 */
export const calculateMileage = () => async (dispatch, getState) => {
    try {
        const startCity = getState().InquiryModalReducer.startCity;
        const endCity = getState().InquiryModalReducer.endCity;

        // 当 始发城市，终到城市 都选择的时候，调用接口
        if (startCity !== null && endCity !== null) {
            // 取得 开始城市-终到城市 里程数
            const url = apiHost + '/api/route?routeStartId=' + startCity.value + '&routeEndId=' + endCity.value;
            const res = await httpUtil.httpGet(url);
            if (res.success === true) {
                // 有数据时，更新里程，清除画面提示文字
                if (res.result.length > 0) {
                    dispatch({type: InquiryModalActionType.setErrorRouteFlg, payload: false});
                    dispatch({type: InquiryModalActionType.setMileage, payload: res.result[0].distance});

                    dispatch(calculateFreight())
                } else {
                    // 无数据时，更新里程，清除画面提示文字
                    dispatch({type: InquiryModalActionType.setErrorRouteFlg, payload: true});
                    // 里程
                    dispatch({type: InquiryModalActionType.setMileage, payload: 0});
                    // 预计运费
                    dispatch({type: InquiryModalActionType.setFreight, payload: formatUtil.formatNumber(0, 2)})
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
    const mileage = getState().InquiryModalReducer.mileage;
    // 服务方式
    const serviceMode = getState().InquiryModalReducer.serviceMode;
    // 车型
    const carModel = getState().InquiryModalReducer.carModel;
    // 是否新车
    const carFlag = getState().InquiryModalReducer.carFlag;
    // 估值
    const valuation = getState().InquiryModalReducer.valuation;

    // 预计运费
    let freight = 0;
    if (mileage !== 0 && serviceMode !== null && carModel !== null && carFlag !== null && valuation !== '') {
        // 暂定公式：里程 * 里程单价 * 车型系数 * 是否新车系数 + 估值*估值比率  + 服务方式费用
        // 里程单价 --> sysConst.ENQUIRY_PARAMS.unitPrice
        // 车型系数 --> sysConst.CAR_MODEL[x].ratio
        // 是否新车系数 --> sysConst.YES_NO[x].ratio
        // 估值比率 --> sysConst.ENQUIRY_PARAMS.valuationRate
        // 服务方式费用 --> sysConst.SERVICE_MODE[x].fee

        freight = mileage * sysConst.ENQUIRY_PARAMS.unitPrice * sysConst.CAR_MODEL[carModel.value - 1].ratio * sysConst.YES_NO[carFlag.value].ratio
            + valuation * sysConst.ENQUIRY_PARAMS.valuationRate + sysConst.SERVICE_MODE[serviceMode.value - 1].fee;
    }

    dispatch({type: InquiryModalActionType.setFreight, payload: formatUtil.formatNumber(freight, 2)})
};