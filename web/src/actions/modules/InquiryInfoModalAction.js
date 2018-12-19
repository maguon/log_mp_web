import {InquiryInfoModalActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getInquiryInfo = (inquiryId, userId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/queryInquiry?inquiryId=' + inquiryId + '&userId=' + userId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InquiryInfoModalActionType.getInquiryInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取询价详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getInquiryCarList = (inquiryId, userId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/inquiryCar?inquiryId=' + inquiryId + '&userId=' + userId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InquiryInfoModalActionType.getInquiryCarList, payload: res.result});
            // 估值总额
            let totalValuation = 0;
            // 预计总运费
            let totalFreight = 0;
            res.result.forEach((item) => {
                totalValuation = totalValuation + item.plan;
                totalFreight = totalFreight + item.fee;
            });
            dispatch({type: InquiryInfoModalActionType.setTotalValuation, payload: totalValuation});
            dispatch({type: InquiryInfoModalActionType.setTotalFreight, payload: totalFreight});
        } else if (res.success === false) {
            swal('获取询价车辆详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderInfo = (inquiryId, userId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?inquiryId=' + inquiryId + '&userId=' + userId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: InquiryInfoModalActionType.getOrderInfo, payload: res.result});
            // 如果有订单数据，则查询订单车辆信息
            if (res.result.length > 0) {
                // 订单车辆列表
                dispatch(commonAction.getOrderCarList(res.result[0].id));
            }
        } else if (res.success === false) {
            swal('获取订单详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};