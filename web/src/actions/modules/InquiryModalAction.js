import {InquiryModalActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 询价画面 初期
export const initInquiryModal = () => async (dispatch) => {
    // 始发城市
    dispatch({type: InquiryModalActionType.setStartCity, payload: null});
    // 终到城市
    dispatch({type: InquiryModalActionType.setEndCity, payload: null});
    // 服务方式
    dispatch({type: InquiryModalActionType.setServiceMode, payload: null});
    // 车型
    dispatch({type: InquiryModalActionType.setCarModel, payload: null});
    // 是否新车
    dispatch({type: InquiryModalActionType.setCarFlag, payload: true});
    // 是否购买保险
    dispatch({type: InquiryModalActionType.setInsuranceFlag, payload: true});
    // 估值
    dispatch({type: InquiryModalActionType.setValuation, payload: ''});

    // 里程
    dispatch({type: InquiryModalActionType.setErrorRouteFlg, payload: false});
    dispatch({type: InquiryModalActionType.setMileage, payload: 0});
    // 预计运费
    dispatch({type: InquiryModalActionType.setFreight, payload: 0});
    // 预计保费
    dispatch({type: InquiryModalActionType.setInsuranceFee, payload: 0});
};

/**
 * 根据开始城市-终到城市，设定画面里程显示。
 */
export const calculateMileage = () => async (dispatch, getState) => {
    try {
        const startCity = getState().InquiryModalReducer.startCity;
        const endCity = getState().InquiryModalReducer.endCity;

        // 当 始发城市，终到城市 都选择的时候，调用接口
        if (startCity !== null && startCity.value !== undefined && endCity !== null && endCity.value !== undefined) {
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
                    dispatch({type: InquiryModalActionType.setFreight, payload: 0});
                    // 预计保费
                    dispatch({type: InquiryModalActionType.setInsuranceFee, payload: 0});
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
export const calculateFreight = () => async (dispatch, getState) => {
    // 里程
    const distance = getState().InquiryModalReducer.mileage;
    // 服务方式
    const serviceMode = getState().InquiryModalReducer.serviceMode;
    // 车型
    const carModel = getState().InquiryModalReducer.carModel;
    // 是否新车
    const carFlag = getState().InquiryModalReducer.carFlag;
    // 估值
    const valuation = getState().InquiryModalReducer.valuation;
    // 是否购买保险
    const insuranceFlag = getState().InquiryModalReducer.insuranceFlag;

    // 预计运费
    let freight = 0;
    // 预计保费
    let insuranceFee = 0;
    if (distance !== 0 && serviceMode !== null && carModel !== null && valuation !== '') {
        // 暂定公式：运费 = 里程 * 里程单价 * 车型系数 * 是否新车系数 + 服务方式费用
        // 暂定公式：保费 = 是否购买保险*估值*估值比率
        // 里程单价 --> sysConst.INQUIRY_PARAMS.unitPrice
        // 车型系数 --> sysConst.CAR_MODEL[x].ratio
        // 是否新车系数 --> sysConst.YES_NO[x].ratio
        // 估值比率 --> sysConst.INQUIRY_PARAMS.valuationRate
        // 服务方式费用 --> sysConst.SERVICE_MODE[x].fee
        // freight = distance * sysConst.INQUIRY_PARAMS.unitPrice * sysConst.CAR_MODEL[carModel.value - 1].ratio * sysConst.YES_NO[carFlag.value].ratio
        //     + sysConst.SERVICE_MODE[serviceMode.value - 1].fee;
        // insuranceFee = insuranceFlag * valuation * sysConst.INQUIRY_PARAMS.valuationRate;

        const params = {
            distance: distance,
            modelType: carModel.value,
            serviceType: serviceMode.value,
            oldCar: carFlag,
            valuation: valuation,
            insuranceFlag: insuranceFlag
        };

        // 基本url
        let url = apiHost + '/api/transAndInsurePrice';
        let res = await httpUtil.httpPost(url, params);
        if (res.success === true) {
            if (res.result.length > 0) {
                freight = res.result[0].trans;
                insuranceFee = res.result[0].insure;
            }
        } else if (res.success === false) {
            swal('预计费用取得失败', res.msg, 'warning');
        }
    }
    dispatch({type: InquiryModalActionType.setFreight, payload: freight});
    dispatch({type: InquiryModalActionType.setInsuranceFee, payload: insuranceFee});
};