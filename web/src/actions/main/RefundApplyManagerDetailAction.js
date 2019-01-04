import {RefundApplyManagerDetailActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getRefundApplyInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/refundApply?refundApplyId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: RefundApplyManagerDetailActionType.getRefundApplyInfo, payload: res.result});
            if (res.result.length > 0) {
                // 订单基本信息
                dispatch(commonAction.getOrderInfo(res.result[0].order_id));
                // 订单支付列表(已支付状态)
                dispatch(commonAction.getOrderPaymentList(res.result[0].order_id));
            }
        } else if (res.success === false) {
            swal('获取退款申请详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};