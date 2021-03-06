import {apiHost} from '../../config/HostConfig';
import {OrderManagerDetailActionType, TransDemandManagerDetailActionType} from '../../actionTypes';

const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getOrderInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?orderId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: OrderManagerDetailActionType.getOrderInfo, payload: res.result});
            if (res.result.length > 0) {
                let orderRemark = res.result[0].admin_mark === null ? '' : res.result[0].admin_mark;
                let orderPaymentRemark = res.result[0].payment_remark === null ? '' : res.result[0].payment_remark;
                dispatch({type: OrderManagerDetailActionType.setOrderRemark, payload: orderRemark});
                dispatch({type: OrderManagerDetailActionType.setOrderPaymentRemark, payload: orderPaymentRemark});
            }
        } else if (res.success === false) {
            swal('获取订单信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveOrderRemark = (id) => async (dispatch, getState) => {
    try {
        const orderRemark = getState().OrderManagerDetailReducer.orderRemark;

        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + id + '/adminMark';
        const params = {
            adminMark: orderRemark
        };
        const res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            swal("保存成功", "", "success");
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeOrderStatus = (orderId, status, tipsTitle, tipsText) => async (dispatch) => {
    swal({
        title: tipsTitle,
        text: tipsText,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + orderId  + '/status/' + status;
            const res = await httpUtil.httpPut(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getOrderInfo(orderId));
                dispatch(commonAction.getOrderCarList(orderId));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

export const generateTransTask = (orderId) => async (dispatch) => {
    swal({
        title: '确定要生成运输需求？',
        text: '运输需求生成后，订单将进入待安排车辆状态，车辆信息将不可再修改！',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + orderId  + '/requireTask';
            const res = await httpUtil.httpPost(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getOrderInfo(orderId));
                dispatch(commonAction.getOrderCarList(orderId));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

export const saveOrderItem = (orderId, orderItemId, actTransFee, actInsuranceFee) => async (dispatch) => {
    swal({
        title: '确定修改运费和保费？',
        text: '',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/orderItem/' + orderItemId  + '/actFeeAndSafePrice';
            const params = {
                actFee: actTransFee,
                safePrice: actInsuranceFee
            };
            const res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getOrderInfo(orderId));
                dispatch(commonAction.getOrderCarList(orderId));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

export const deleteOrderItem = (orderId, orderItemId) => async (dispatch) => {
    swal({
        title: '确定删除该车辆？',
        text: '',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/orderItem/' + orderItemId;
            const res = await httpUtil.httpDelete(url, {});
            if (res.success === true) {
                swal("删除成功", "", "success");
                dispatch(getOrderInfo(orderId));
                dispatch(commonAction.getOrderCarList(orderId));
            } else if (res.success === false) {
                swal('删除失败', res.msg, 'warning');
            }
        }
    });
};

export const getOrderPaymentList = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/payment?orderId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: OrderManagerDetailActionType.getOrderPaymentArray, payload: res.result});
            let refund = 0;
            let paid = 0;
            let paymentSize = 0;
            for (let i = 0; i < res.result.length; i++) {
                if (res.result[i].type === sysConst.PAYMENT_TYPE[0].value) {
                    refund = refund + res.result[i].total_fee;
                } else if (res.result[i].type === sysConst.PAYMENT_TYPE[1].value) {
                    // 已支付的数据
                    if (res.result[i].status === sysConst.PAYMENT_STATUS[1].value) {
                        paid = paid + res.result[i].total_fee;
                        paymentSize++;
                    }
                }
            }
            dispatch({type: OrderManagerDetailActionType.setOrderPaymentRefund, payload: refund});
            dispatch({type: OrderManagerDetailActionType.setOrderPaymentPaid, payload: paid});
            dispatch({type: OrderManagerDetailActionType.setOrderPaymentPaidSize, payload: paymentSize});
        } else if (res.success === false) {
            swal('获取订单支付信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderRefundList = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/refundApply?orderId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: OrderManagerDetailActionType.getOrderRefundApplyArray, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单退款申请信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteRefundApply = (item) => async (dispatch) => {
    swal({
        title: '确定删除该退款申请？',
        text: '',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            // 基本检索URL
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + item.order_id +'/payment/' + item.payment_id + '/deleteRefundApply/' + item.id;
            const res = await httpUtil.httpDelete(url, {});
            if (res.success === true) {
                swal("删除成功", "", "success");
                dispatch(getOrderRefundList(item.order_id));
            } else if (res.success === false) {
                swal('删除失败', res.msg, 'warning');
            }
        }
    });
};

export const saveOrderPaymentRemark = (id) => async (dispatch, getState) => {
    try {
        const orderPaymentRemark = getState().OrderManagerDetailReducer.orderPaymentRemark;

        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + id + '/paymentRemark';
        const params = {
            remark: orderPaymentRemark
        };
        const res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            swal("保存成功", "", "success");
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};







export const getInvoiceList = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/invoicesList?orderId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: OrderManagerDetailActionType.getInvoiceArray, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单发票信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteInvoiceApply = (invoiceApplyId, orderId) => async (dispatch) => {
    swal({
        title: '确定删除该发票申请？',
        text: '',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            // 基本检索URL
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/controlInvoices/' + invoiceApplyId + '/revokeInvoice';
            const res = await httpUtil.httpDelete(url, {});
            if (res.success === true) {
                swal("删除成功", "", "success");
                dispatch(getInvoiceList(orderId));
            } else if (res.success === false) {
                swal('删除失败', res.msg, 'warning');
            }
        }
    });
};