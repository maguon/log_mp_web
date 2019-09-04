import {apiHost} from '../../config/HostConfig';
import {ProductInfoModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const initProductInfo = (productId) => async (dispatch, getState) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/commodity?commodityId=' + productId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ProductInfoModalActionType.getProductInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取商品基本信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};