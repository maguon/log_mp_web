import {apiHost} from '../../config/HostConfig';
import {LoadTaskPaymentManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getLoadTaskPaymentList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().LoadTaskPaymentManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().LoadTaskPaymentManagerReducer.size;

        // 检索条件：线路编号
        const conditionLoadTaskId = getState().LoadTaskPaymentManagerReducer.conditionLoadTaskId.trim();
        // 检索条件：供应商
        const conditionSupplier = getState().LoadTaskPaymentManagerReducer.conditionSupplier;
        // 检索条件：起始城市
        const conditionStartCity = getState().LoadTaskPaymentManagerReducer.conditionStartCity;
        // 检索条件：目的城市
        const conditionEndCity = getState().LoadTaskPaymentManagerReducer.conditionEndCity;
        // 检索条件：订单编号
        const conditionOrderId = getState().LoadTaskPaymentManagerReducer.conditionOrderId.trim();
        // 检索条件：付款时间
        const conditionPaymentOnStart = getState().LoadTaskPaymentManagerReducer.conditionPaymentOnStart;
        const conditionPaymentOnEnd = getState().LoadTaskPaymentManagerReducer.conditionPaymentOnEnd;
        // 检索条件：结算状态
        const conditionPaymentStatus = getState().LoadTaskPaymentManagerReducer.conditionPaymentStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/routeLoadTask?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：线路编号
            loadTaskId: conditionLoadTaskId,
            // 检索条件：供应商
            supplierId: conditionSupplier === null ? '' : conditionSupplier.value,
            // 检索条件：起始城市
            routeStartId: conditionStartCity === null ? '' : conditionStartCity.value,
            // 检索条件：目的城市
            routeEndId: conditionEndCity === null ? '' : conditionEndCity.value,
            // 检索条件：订单编号
            orderId: conditionOrderId,
            // 检索条件：创建时间
            paymentOnStart: conditionPaymentOnStart,
            paymentOnEnd: conditionPaymentOnEnd,
            // 检索条件：状态
            paymentFlag: conditionPaymentStatus === null ? '' : conditionPaymentStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LoadTaskPaymentManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: LoadTaskPaymentManagerActionType.getLoadTaskList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取线路列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 付款指定线路
export const paymentLoadTask = (loadTaskId) => async (dispatch) => {
    try {
        swal({
            title: "确定该线路已付款？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本检索URL
                const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/loadTask/' + loadTaskId + '/payment';
                const res = await httpUtil.httpPut(url);
                if (res.success === true) {
                    dispatch(getLoadTaskPaymentList());
                } else if (res.success === false) {
                    swal('修改线路付款状态失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};