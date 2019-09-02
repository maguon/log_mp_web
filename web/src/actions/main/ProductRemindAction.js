import {apiHost} from '../../config/HostConfig';
import {ProductRemindActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getProductRemindList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().ProductRemindReducer.start;
        // 检索条件：每页数量
        const size = getState().ProductRemindReducer.size;

        // 检索条件：商品名称
        const conditionProduct = getState().ProductRemindReducer.conditionProduct;
        // 检索条件：用户昵称
        const conditionNickname = getState().ProductRemindReducer.conditionNickname.trim();
        // 检索条件：商品状态
        const conditionProductSaleStatus = getState().ProductRemindReducer.conditionProductSaleStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/reminders?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            commodityId: conditionProduct === null ? '' : conditionProduct.value,
            userName: conditionNickname,
            status: conditionProductSaleStatus === null ? '' : conditionProductSaleStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ProductRemindActionType.setDataSize, payload: res.result.length});
            dispatch({type: ProductRemindActionType.getProductRemindList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取商品提醒列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};