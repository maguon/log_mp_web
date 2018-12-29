import {PaymentManagerDetailActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getPaymentInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/payment?paymentId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: PaymentManagerDetailActionType.getPaymentInfo, payload: res.result});
            if (res.result.length > 0) {
                // 订单信息
                dispatch(getOrderInfo(res.result[0].order_id));
            }
        } else if (res.success === false) {
            swal('获取支付详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderInfo = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: PaymentManagerDetailActionType.getOrderInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const confirmPayment = (inquiryId) => async (dispatch) => {
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