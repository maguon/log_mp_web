import {apiHost} from '../../config/HostConfig';
import {RefuseRefundModalActionType} from "../../actionTypes";

const refundApplyManagerDetailAction = require('../../actions/main/RefundApplyManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 退款信息 模态画面 初期
export const initRefuseRefundModal = (refundApplyInfo) => async (dispatch) => {
    // 退款申请 基本信息
    dispatch({type: RefuseRefundModalActionType.setRefundApplyInfo, payload: refundApplyInfo});
    // 拒绝原因
    dispatch({type: RefuseRefundModalActionType.setRefuseReason, payload: ''});
};

export const refuseRefund = () => async (dispatch, getState) => {
    try {
        // 退款申请 基本信息
        const refundApplyInfo = getState().RefuseRefundModalReducer.refundApplyInfo;
        // 拒绝原因
        const refuseReason = getState().RefuseRefundModalReducer.refuseReason;

        // if (refuseReason === '') {
        //     swal('保存失败', '请输入退款金额！', 'warning');
        // } else {
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + refundApplyInfo.order_id + '/payment/' + refundApplyInfo.payment_id + '/refundApply/' + refundApplyInfo.id + '/refuse';

            const params = {
                refuseReason: refuseReason
            };

            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                $('#refuseRefundModal').modal('close');
                swal("拒绝退款成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(refundApplyManagerDetailAction.getRefundApplyInfo(refundApplyInfo.id));
            } else if (res.success === false) {
                swal('拒绝退款失败', res.msg, 'warning');
            }
        // }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};