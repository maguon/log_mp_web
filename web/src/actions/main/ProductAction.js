import {apiHost} from '../../config/HostConfig';
import {ProductActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getProductList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().ProductReducer.start;
        // 检索条件：每页数量
        const size = getState().ProductReducer.size;

        // 检索条件：编号
        const conditionNo = getState().ProductReducer.conditionNo.trim();
        // 检索条件：销售类型
        const conditionSaleType = getState().ProductReducer.conditionSaleType;
        // 检索条件：销售状态
        const conditionSaleStatus = getState().ProductReducer.conditionSaleStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/commodity?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            commodityId: conditionNo,
            type: conditionSaleType === null ? '' : conditionSaleType.value,
            status: conditionSaleStatus === null ? '' : conditionSaleStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ProductActionType.setDataSize, payload: res.result.length});
            dispatch({type: ProductActionType.getProductList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取商品列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};