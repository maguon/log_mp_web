import {apiHost} from '../../config/HostConfig';
import {ConfirmRefundModalActionType} from "../../actionTypes";

const refundApplyManagerDetailAction = require('../../actions/main/RefundApplyManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 退款信息 模态画面 初期
export const initConfirmRefundModal = (refundApplyInfo) => async (dispatch) => {
    // 退款申请 基本信息
    dispatch({type: ConfirmRefundModalActionType.setRefundApplyInfo, payload: refundApplyInfo});
    // 退款金额
    dispatch({type: ConfirmRefundModalActionType.setRefundMoney, payload: refundApplyInfo.apply_fee});
    // 退款描述
    dispatch({type: ConfirmRefundModalActionType.setRefundRemark, payload: ''});
};

export const confirmRefund = () => async (dispatch, getState) => {
    try {
        // 退款申请 基本信息
        const refundApplyInfo = getState().ConfirmRefundModalReducer.refundApplyInfo;
        // 退款金额
        const refundMoney = getState().ConfirmRefundModalReducer.refundMoney;
        // 退款描述
        const refundRemark = getState().ConfirmRefundModalReducer.refundRemark;

        if (refundMoney === '') {
            swal('保存失败', '请输入金额！', 'warning');
        } else {
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + refundApplyInfo.order_id + '/payment/' + refundApplyInfo.payment_id + '/refundApply/' + refundApplyInfo.id + '/agree';

            const params = {
                refundFee: refundMoney,
                remark: refundRemark
            };

            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                $('#confirmRefundModal').modal('close');
                swal("退款成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(refundApplyManagerDetailAction.getRefundApplyInfo(refundApplyInfo.id));
            } else if (res.success === false) {
                swal('退款失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};