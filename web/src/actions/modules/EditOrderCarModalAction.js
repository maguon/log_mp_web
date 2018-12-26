import {EditOrderCarModalActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../util/SysConst');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const commonUtil = require('../../util/CommonUtil');

// 添加车辆 画面 初期
export const initOrderCarData = (pageType, orderItem) => async (dispatch) => {
    if (pageType === 'edit') {
        // vin
        dispatch({type: EditOrderCarModalActionType.setOrderItemId, payload: orderItem.id});
        // vin
        dispatch({type: EditOrderCarModalActionType.setVin, payload: orderItem.vin});
        // 车型
        dispatch({type: EditOrderCarModalActionType.setCarModel, payload: {value: orderItem.model_type,label: commonUtil.getJsonValue(sysConst.CAR_MODEL,orderItem.model_type)}});
        // 是否新车 如果是1，则为true 选中，否则
        dispatch({type: EditOrderCarModalActionType.setCarFlag, payload: orderItem.old_car === 1});
        // 是否购买保险 如果是1，则为true 选中，否则
        dispatch({type: EditOrderCarModalActionType.setInsuranceFlag, payload: orderItem.safe_status === 1});
        // 估值
        dispatch({type: EditOrderCarModalActionType.setValuation, payload: orderItem.valuation});
        // 预计运费
        dispatch({type: EditOrderCarModalActionType.setFreight, payload: orderItem.ora_trans_price});
        // 预计保费
        dispatch({type: EditOrderCarModalActionType.setInsureFee, payload: orderItem.ora_insure_price});
        // 实际运费
        dispatch({type: EditOrderCarModalActionType.setActFreight, payload: orderItem.act_trans_price});
        // 实际保费
        dispatch({type: EditOrderCarModalActionType.setActInsureFee, payload: orderItem.act_insure_price});
    } else {
        // vin
        dispatch({type: EditOrderCarModalActionType.setVin, payload: ''});
        // 车型
        dispatch({type: EditOrderCarModalActionType.setCarModel, payload: null});
        // 是否新车
        dispatch({type: EditOrderCarModalActionType.setCarFlag, payload: true});
        // 是否购买保险
        dispatch({type: EditOrderCarModalActionType.setInsuranceFlag, payload: true});
        // 估值
        dispatch({type: EditOrderCarModalActionType.setValuation, payload: ''});
        // 预计运费
        dispatch({type: EditOrderCarModalActionType.setFreight, payload: 0});
        // 预计保费
        dispatch({type: EditOrderCarModalActionType.setInsureFee, payload: 0});
        // 实际运费
        dispatch({type: EditOrderCarModalActionType.setActFreight, payload: 0});
        // 实际保费
        dispatch({type: EditOrderCarModalActionType.setActInsureFee, payload: 0});
    }
};

/**
 * 设定画面预计运费结果。
 */
export const calculateFreight = () => async (dispatch, getState) => {
    // 订单信息
    const orderInfo = getState().EditOrderCarModalReducer.orderInfo;
    // 里程
    const distance = orderInfo[0].distance;
    // 服务方式
    const serviceMode = orderInfo[0].service_type;
    // 车型
    const carModel = getState().EditOrderCarModalReducer.carModel;
    // 是否新车
    const carFlag = getState().EditOrderCarModalReducer.carFlag ? 1:0;
    // 估值
    const valuation = getState().EditOrderCarModalReducer.valuation;
    // 是否购买保险
    const insuranceFlag = getState().EditOrderCarModalReducer.insuranceFlag ? 1:0;

    // 预计运费
    let freight = 0;
    // 预计保费
    let insuranceFee = 0;
    if (orderInfo.length > 0 && carModel != null && valuation !== '') {
        // // 暂定公式：里程 * 里程单价 * 车型系数 * 是否新车系数 + 是否购买保险*估值*估值比率  + 服务方式费用
        // freight = distance * sysConst.INQUIRY_PARAMS.unitPrice * sysConst.CAR_MODEL[carModel.value - 1].ratio * sysConst.YES_NO[carFlag].ratio
        //     + sysConst.SERVICE_MODE[serviceMode - 1].fee;
        // insuranceFee = insuranceFlag * valuation * sysConst.INQUIRY_PARAMS.valuationRate;
        const params = {
            distance: distance,
            modelType: carModel.value,
            oldCar: carFlag,
            serviceType: serviceMode,
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
        dispatch({type: EditOrderCarModalActionType.setFreight, payload: freight});
        dispatch({type: EditOrderCarModalActionType.setInsureFee, payload: insuranceFee});
    }
};

export const saveOrderCar = () => async (dispatch, getState) => {
    try {
        // 订单信息
        const pageType = getState().EditOrderCarModalReducer.pageType;
        // 订单信息
        const orderInfo = getState().EditOrderCarModalReducer.orderInfo;
        // 里程
        const distance = orderInfo[0].distance;
        // 服务方式
        const serviceType = orderInfo[0].service_type;
        // 订单ID
        const orderId = orderInfo[0].id;
        // 运送车辆ID
        const orderItemId = getState().EditOrderCarModalReducer.orderItemId;
        // VIN
        const vin = getState().EditOrderCarModalReducer.vin;
        // 车型
        const carModel = getState().EditOrderCarModalReducer.carModel;
        // 是否新车
        const carFlag = getState().EditOrderCarModalReducer.carFlag;
        // 是否购买保险
        const insuranceFlag = getState().EditOrderCarModalReducer.insuranceFlag;
        // 估值
        const valuation = getState().EditOrderCarModalReducer.valuation;
        // 实际运费
        const actFreight = getState().EditOrderCarModalReducer.actFreight;
        // 实际保费
        const actInsureFee = getState().EditOrderCarModalReducer.actInsureFee;

        if (orderId === undefined || vin === '' || carModel == null || valuation === '' || actFreight === '' || actInsureFee === '') {
            swal('保存失败', '请输入完整的车辆信息！', 'warning');
        } else {
            const params = {
                vin: vin,
                serviceType: serviceType,
                modelType: carModel.value,
                oldCar: carFlag ? 1 : 0,
                safeStatus: insuranceFlag ? 1 : 0,
                valuation: valuation,
                actTransPrice: actFreight,
                actInsurePrice: actInsureFee,
                distance: distance
            };

            // 基本url
            let url = null;
            let res = null;
            // 编辑时
            if (pageType === 'edit') {
                url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/orderItem/' + orderItemId + '/orderItemInfo';
                res = await httpUtil.httpPut(url, params);
            } else {
                // 基本url
                url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/order/' + orderId + '/carAdmin';
                // 新建时
                res = await httpUtil.httpPost(url, params);
            }
            if (res.success === true) {
                $('#editOrderCarModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(orderManagerDetailAction.getOrderInfo(orderId));
                dispatch(commonAction.getOrderCarList(orderId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};