import {ProductPaymentDetailActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getProductPaymentInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/productOrderPayment?productPaymentId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ProductPaymentDetailActionType.getProductPaymentInfo, payload: res.result});
            if (res.result.length > 0) {
                // 商品订单信息
                dispatch(commonAction.getProductOrderInfo(res.result[0].product_order_id));
            }
        } else if (res.success === false) {
            swal('获取商品支付详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};