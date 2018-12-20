import {apiHost} from '../../config/HostConfig';

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const cancelOrder = () => async (dispatch, getState) => {
    try {
        // 订单ID
        const orderId = getState().CancelOrderModalReducer.orderId;
        // 备注
        const remark = getState().CancelOrderModalReducer.remark;
        const params = {
            cancelMark: remark
        };
        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + orderId + '/cancel';
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            $('#cancelOrderModal').modal('close');
            swal("取消订单成功", "", "success");
            // 保存成功后，重新检索画面数据
            dispatch(orderManagerDetailAction.getOrderInfo(orderId));
            dispatch(commonAction.getOrderCarList(orderId));
        } else if (res.success === false) {
            swal('取消订单失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};