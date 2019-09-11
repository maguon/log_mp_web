import {apiHost} from '../../config/HostConfig';
import {ProductOrderRefundModalActionType} from "../../actionTypes";

const productOrderDetailAction = require('../../actions/main/ProductOrderDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 模态画面 初期
export const initProductOrderRefundModal = (paymentId, orderId) => async (dispatch) => {
    // 商品订单编号
    dispatch({type: ProductOrderRefundModalActionType.setProductOrderId, payload: orderId});
    // 商品订单支付编号
    dispatch({type: ProductOrderRefundModalActionType.setProductPaymentId, payload: paymentId});
    // 退款金额
    dispatch({type: ProductOrderRefundModalActionType.setRefundFee, payload: ''});
};

export const productOrderRefund = (orderId) => async (dispatch, getState) => {
    try {
        // 商品订单编号
        const productOrderId = getState().ProductOrderRefundModalReducer.productOrderId;
        // 商品订单支付编号
        const productPaymentId = getState().ProductOrderRefundModalReducer.productPaymentId;
        // 退款金额
        const refundFee = getState().ProductOrderRefundModalReducer.refundFee;

        if (refundFee === '') {
            swal('保存失败', '请输入退款金额！', 'warning');
        } else {
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/productOrder/' + productOrderId + '/productPayment/' + productPaymentId + '/wechatRefund';

            const params = {
                refundFee: refundFee
            };

            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#productOrderRefundModal').modal('close');
                swal("退款成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(productOrderDetailAction.getProductOrderInfo(orderId));
            } else if (res.success === false) {
                swal('退款失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};