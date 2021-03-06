import {apiHost} from '../../config/HostConfig';
import {NewPaymentModalActionType} from "../../actionTypes";

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 支付模态画面 初期
export const initNewPaymentModal = (orderId, freight, insuranceFee, totalFee, leftPayment, pageType, item) => async (dispatch) => {
    // 画面区分
    dispatch({type: NewPaymentModalActionType.setPageType, payload: pageType});
    // 订单编号
    dispatch({type: NewPaymentModalActionType.setOrderId, payload: orderId});
    // 应付运费
    dispatch({type: NewPaymentModalActionType.setFreight, payload: freight});
    // 应付保费
    dispatch({type: NewPaymentModalActionType.setInsuranceFee, payload: insuranceFee});
    // 应付总额
    dispatch({type: NewPaymentModalActionType.setTotalFee, payload: totalFee});
    // 剩余应付
    dispatch({type: NewPaymentModalActionType.setLeftPayment, payload: leftPayment});

    if (pageType === 'new') {
        // 付款银行
        dispatch({type: NewPaymentModalActionType.setPaymentBank, payload: ''});
        // 银行账号
        dispatch({type: NewPaymentModalActionType.setBankNum, payload: ''});
        // 户主姓名
        dispatch({type: NewPaymentModalActionType.setBankUser, payload: ''});
        // 本次支付
        dispatch({type: NewPaymentModalActionType.setPaymentFee, payload: ''});
    } else {
        // 付款银行
        dispatch({type: NewPaymentModalActionType.setPaymentId, payload: item.id});
        // 付款银行
        dispatch({type: NewPaymentModalActionType.setPaymentBank, payload: item.bank});
        // 银行账号
        dispatch({type: NewPaymentModalActionType.setBankNum, payload: item.bank_code});
        // 户主姓名
        dispatch({type: NewPaymentModalActionType.setBankUser, payload: item.account_name});
        // 本次支付
        dispatch({type: NewPaymentModalActionType.setPaymentFee, payload: item.total_fee});
    }
};

export const savePayment = () => async (dispatch, getState) => {
    try {
        // 画面区分
        const pageType = getState().NewPaymentModalReducer.pageType;

        // 订单编号
        const orderId = getState().NewPaymentModalReducer.orderId;
        // 支付编号
        const paymentId = getState().NewPaymentModalReducer.paymentId;
        // 付款银行
        const paymentBank = getState().NewPaymentModalReducer.paymentBank.trim();
        // 银行账号
        const bankNum = getState().NewPaymentModalReducer.bankNum.trim();
        // 户主姓名
        const bankUser = getState().NewPaymentModalReducer.bankUser.trim();
        // 本次支付
        const paymentFee = getState().NewPaymentModalReducer.paymentFee;

        if (paymentBank === '' || bankNum === '' || bankUser === '' || paymentFee === '') {
            swal('保存失败', '请输入完整的支付信息！', 'warning');
        } else {
            const params = {
                bank: paymentBank,
                bankCode: bankNum,
                accountName: bankUser,
                totalFee: paymentFee
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + orderId + '/bankPayment';
            if (pageType === 'edit') {
                url = url + '/' + paymentId;
            }
            let res = null;
            if (pageType === 'new') {
                res = await httpUtil.httpPost(url, params);
            } else {
                res = await httpUtil.httpPut(url, params);
            }
            if (res.success === true) {
                $('#newPaymentModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(orderManagerDetailAction.getOrderPaymentList(orderId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};