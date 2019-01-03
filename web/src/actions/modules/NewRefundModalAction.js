import {apiHost} from '../../config/HostConfig';
import {NewRefundModalActionType} from "../../actionTypes";

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 申请退款模态画面 初期
export const initNewRefundModal = (orderId, pageType, item) => async (dispatch) => {
    try {
        // 画面区分
        dispatch({type: NewRefundModalActionType.setPageType, payload: pageType});
        // 订单ID
        dispatch({type: NewRefundModalActionType.setOrderId, payload: orderId});

        if (pageType === 'new') {
            // 清空画面选中项目
            $('input[type=radio][name="payment"]:checked').prop("checked", false);
            dispatch({type: NewRefundModalActionType.setSelectedItem, payload: null});
            // 申请金额
            dispatch({type: NewRefundModalActionType.setRefundFee, payload: ''});
            // 申请原因
            dispatch({type: NewRefundModalActionType.setRemark, payload: ''});
        } else {
            dispatch({type: NewRefundModalActionType.setRefundApplyId, payload: item.id});
            // 申请金额
            dispatch({type: NewRefundModalActionType.setRefundFee, payload: item.apply_fee});
            // 申请原因
            dispatch({type: NewRefundModalActionType.setRemark, payload: item.remark});
        }

        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/payment?orderId=' + orderId + '&type=1&status=1';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewRefundModalActionType.getPaymentArray, payload: res.result});
            if (pageType === 'edit') {
                for (let i = 0; i < res.result.length; i++) {
                    if (res.result[i].id === item.payment_id) {
                        // 设定画面选中项目
                        $('#index' + item.payment_id).prop("checked", true);
                        dispatch({type: NewRefundModalActionType.setSelectedItem, payload: res.result[i]});
                        break;
                    }
                }
            }
        } else if (res.success === false) {
            swal('获取支付信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveRefund = () => async (dispatch, getState) => {
    try {
        // 画面区分
        const pageType = getState().NewRefundModalReducer.pageType;
        // 退款编号
        const refundApplyId = getState().NewRefundModalReducer.refundApplyId;

        // 订单编号
        const orderId = getState().NewRefundModalReducer.orderId;
        // 申请金额
        const refundFee = getState().NewRefundModalReducer.refundFee;
        // 选中支付
        const selectedItem = getState().NewRefundModalReducer.selectedItem;
        // 申请原因
        const remark = getState().NewRefundModalReducer.remark.trim();
        if (refundFee === '' || selectedItem == null) {
            swal('保存失败', '请输入完整的申请退款信息！', 'warning');
        } else {
            const params = {
                mark: remark,
                applyFee: refundFee,
                bank: selectedItem.bank,
                bankCode: selectedItem.bank_code,
                accountName: selectedItem.account_name
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + orderId + '/payment/' + selectedItem.id + '/refundApply';
            if (pageType === 'edit') {
                url = url + '/' + refundApplyId;
            }
            let res = null;
            if (pageType === 'new') {
                res = await httpUtil.httpPost(url, params);
            } else {
                res = await httpUtil.httpPut(url, params);
            }
            if (res.success === true) {
                $('#newRefundModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(orderManagerDetailAction.getOrderPaymentList(orderId));
                dispatch(orderManagerDetailAction.getOrderRefundList(orderId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};