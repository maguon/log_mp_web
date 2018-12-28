import {apiHost} from '../../config/HostConfig';
import {NewRefundModalActionType} from "../../actionTypes";

const orderManagerAction = require('../../actions/main/OrderManagerAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 申请退款模态画面 初期
export const initNewRefundModal = (orderId) => async (dispatch) => {
    try {
        // 申请金额
        dispatch({type: NewRefundModalActionType.setRefundFee, payload: ''});
        // 清空画面选中项目
        $('input[type=radio][name="payment"]:checked').prop("checked", false);
        dispatch({type: NewRefundModalActionType.setSelectedItem, payload: null});
        // 申请原因
        dispatch({type: NewRefundModalActionType.setRemark, payload: ''});

        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/payment?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewRefundModalActionType.getPaymentArray, payload: res.result});
        } else if (res.success === false) {
            swal('获取支付信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveRefund = () => async (dispatch, getState) => {
    try {
        // 订单编号
        const orderId = getState().NewRefundModalReducer.orderId;

        // 申请金额
        const refundFee = getState().NewRefundModalReducer.refundFee;
        // 选中支付
        const selectedItem = getState().NewRefundModalReducer.selectedItem;
        // 申请原因
        const remark = getState().NewRefundModalReducer.remark.trim();

        console.log('refundFee',refundFee);
        console.log('selectedItem',selectedItem);
        console.log('remark',remark);

        if (refundFee === '' || selectedItem == null) {
            swal('保存失败', '请输入完整的申请退款信息！', 'warning');
        } else {
            const params = {
                routeStartId: startCity.value,
                routeEndId: endCity.value,
                serviceType: serviceType.value
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/order';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newRefundModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(orderManagerAction.getOrderList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};