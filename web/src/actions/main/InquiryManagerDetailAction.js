import {InquiryManagerDetailActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInquiryInfo = (inquiryId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/inquiry?inquiryId=' + inquiryId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InquiryManagerDetailActionType.getInquiryInfo, payload: res.result});
            // 若 有数据，并且该询价状态 为2：已完成 ，则查询订单信息
            if (res.result.length > 0 && res.result[0].status === sysConst.INQUIRY_STATUS[2].value) {
                // 订单信息
                dispatch(getOrderInfo(inquiryId));
            }
        } else if (res.success === false) {
            swal('获取询价详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getInquiryCarList = (inquiryId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/inquiryCar?status=1&inquiryId=' + inquiryId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InquiryManagerDetailActionType.getInquiryCarList, payload: res.result});
            // 估值总额
            let totalValuation = 0;
            // 预计总运费
            let totalFreight = 0;
            // 预计总保费
            let totalInsuranceFee = 0;
            res.result.forEach((item) => {
                totalValuation = totalValuation + item.plan_total;
                totalFreight = totalFreight + item.trans_price;
                totalInsuranceFee = totalInsuranceFee + item.insure_price;
            });
            dispatch({type: InquiryManagerDetailActionType.setTotalValuation, payload: totalValuation});
            dispatch({type: InquiryManagerDetailActionType.setTotalFreight, payload: totalFreight});
            dispatch({type: InquiryManagerDetailActionType.setTotalInsuranceFee, payload: totalInsuranceFee});
        } else if (res.success === false) {
            swal('获取询价车辆详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderInfo = (inquiryId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?inquiryId=' + inquiryId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InquiryManagerDetailActionType.getOrderInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const generateOrder = (inquiryId) => async (dispatch) => {
    swal({
        title: "确定将该询价生成订单？",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/inquiry/' + inquiryId + '/order';
            const res = await httpUtil.httpPost(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getInquiryInfo(inquiryId));
                dispatch(getInquiryCarList(inquiryId));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};