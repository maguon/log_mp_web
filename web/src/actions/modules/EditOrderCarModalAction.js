import {EditOrderCarModalActionType, InquiryModalActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';
import {getLogSiteContactList} from "../main/LogSiteSettingDetailAction";

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const sysConst = require('../../util/SysConst');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const formatUtil = require('../../util/FormatUtil');


// 添加车辆 画面 初期
export const initOrderCarData = () => async (dispatch) => {
    // vin
    dispatch({type: EditOrderCarModalActionType.setVin, payload: ''});
    // 车型
    dispatch({type: EditOrderCarModalActionType.setCarModel, payload: null});
    // 是否新车
    dispatch({type: EditOrderCarModalActionType.setCarFlag, payload: null});
    // 估值
    dispatch({type: EditOrderCarModalActionType.setValuation, payload: ''});
    // 是否购买保险
    dispatch({type: InquiryModalActionType.setInsuranceFlag, payload: '1'});
    // 预计运费
    dispatch({type: EditOrderCarModalActionType.setFreight, payload: formatUtil.formatNumber(0, 2)});
    // 实际运费
    dispatch({type: EditOrderCarModalActionType.setActFreight, payload: ''});
};

/**
 * 设定画面预计运费结果。
 */
export const calculateFreight = () => (dispatch, getState) => {
    // 里程
    // const mileage = getState().EditOrderCarModalReducer.mileage;
    const mileage = 1000;
    // 服务方式
    const serviceMode = 1;
    // 车型
    const carModel = getState().EditOrderCarModalReducer.carModel;
    // 是否新车
    const carFlag = getState().EditOrderCarModalReducer.carFlag;
    // 估值
    const valuation = getState().EditOrderCarModalReducer.valuation;
    // 是否购买保险
    const insuranceFlag = getState().EditOrderCarModalReducer.insuranceFlag;

    // 预计运费
    let freight = 0;
    if (carModel !== null && carModel.value !== undefined
        && carFlag !== null && carFlag.value !== undefined && valuation !== '') {
        // 暂定公式：里程 * 里程单价 * 车型系数 * 是否新车系数 + 是否购买保险*估值*估值比率  + 服务方式费用
        freight = mileage * sysConst.INQUIRY_PARAMS.unitPrice * sysConst.CAR_MODEL[carModel.value - 1].ratio * sysConst.YES_NO[carFlag.value].ratio
            + insuranceFlag * valuation * sysConst.INQUIRY_PARAMS.valuationRate + sysConst.SERVICE_MODE[serviceMode - 1].fee;
    }
    dispatch({type: EditOrderCarModalActionType.setFreight, payload: formatUtil.formatNumber(freight, 2)})
};



export const saveOrderCar = () => async (dispatch, getState) => {
    try {
        // 订单信息
        const orderId = getState().EditOrderCarModalReducer.orderInfo.id;

        // VIN
        const vin = getState().EditOrderCarModalReducer.vin;
        // 车型
        const carModel = getState().EditOrderCarModalReducer.carModel;
        // 是否新车
        const carFlag = getState().EditOrderCarModalReducer.carFlag;
        // 估值
        const valuation = getState().EditOrderCarModalReducer.valuation;
        // 是否购买保险
        const insuranceFlag = getState().EditOrderCarModalReducer.insuranceFlag;

        // 实际运费
        const actFreight = getState().EditOrderCarModalReducer.actFreight;

        if (vin !== '' && carModel !== null && carModel.value !== undefined
            && carFlag !== null && carFlag.value !== undefined && valuation !== '' && actFreight !== '') {
            swal('保存失败', '请输入完整的车辆信息！', 'warning');
        } else {
            // {
            //     "safePrice": 0,
            //     "safeStatus": 0
            // }

            const params = {
                userId: '',
                orderId: orderId,
                vin: vin,
                modelType: carModel.value,
                oldCar: carFlag.value,
                valuation: valuation,
                oraPrice: actFreight
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/carAdmin';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#editOrderCarModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(orderManagerDetailAction.getOrderInfo(orderId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteOrderCar = (logSiteId, contactId) => async (dispatch) => {
    try {
        swal({
            title: "确定删除该联系方式？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本检索URL
                const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    // + '/supplier/' + logSiteId
                    + '/addressContact/' + contactId;
                const res = await httpUtil.httpDelete(url);
                if (res.success === true) {
                    dispatch(getLogSiteContactList(logSiteId));
                } else if (res.success === false) {
                    swal('删除收发货地点联系方式失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};