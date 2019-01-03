import {apiHost} from '../../config/HostConfig';
import {ConfirmPaymentModalActionType} from "../../actionTypes";

const paymentManagerAction = require('../../actions/main/PaymentManagerAction');
const paymentManagerDetailAction = require('../../actions/main/PaymentManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 支付模态画面 初期
export const initConfirmPaymentModal = (prePage, paymentId, paymentMoney) => async (dispatch) => {
    // 前画面
    dispatch({type: ConfirmPaymentModalActionType.setPrePage, payload: prePage});
    // 支付ID
    dispatch({type: ConfirmPaymentModalActionType.setPaymentId, payload: paymentId});
    // 金额
    dispatch({type: ConfirmPaymentModalActionType.setPaymentMoney, payload: paymentMoney});
};

export const confirmPayment = () => async (dispatch, getState) => {
    try {
        // 前画面
        const prePage = getState().ConfirmPaymentModalReducer.prePage;
        // 支付ID
        const paymentId = getState().ConfirmPaymentModalReducer.paymentId;
        // 金额
        const paymentMoney = getState().ConfirmPaymentModalReducer.paymentMoney;

        if (paymentMoney === '') {
            swal('保存失败', '请输入金额！', 'warning');
        } else {
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/payment/' + paymentId + '/bankTransfer/paymentReview';

            const params = {
                totalFee: paymentMoney,
                status: sysConst.PAYMENT_STATUS[1].value
            };

            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                $('#confirmPaymentModal').modal('close');
                swal("支付审核成功", "", "success");
                // 保存成功后，重新检索画面数据
                if (prePage === 'payment') {
                    dispatch(paymentManagerAction.getPaymentList());
                } else {
                    dispatch(paymentManagerDetailAction.getPaymentInfo(paymentId));
                }
            } else if (res.success === false) {
                swal('支付审核失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};