import {apiHost} from '../../config/HostConfig';
import {LoadTaskManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getLoadTaskList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().LoadTaskManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().LoadTaskManagerReducer.size;

        // 检索条件：线路编号
        const conditionLoadTaskId = getState().LoadTaskManagerReducer.conditionLoadTaskId.trim();
        // 检索条件：订单编号
        const conditionOrderId = getState().LoadTaskManagerReducer.conditionOrderId.trim();
        // 检索条件：服务方式
        const conditionServiceType = getState().LoadTaskManagerReducer.conditionServiceType;
        // 检索条件：起始城市
        const conditionStartCity = getState().LoadTaskManagerReducer.conditionStartCity;
        // 检索条件：目的城市
        const conditionEndCity = getState().LoadTaskManagerReducer.conditionEndCity;
        // 检索条件：服务方式
        const conditionTransMode = getState().LoadTaskManagerReducer.conditionTransMode;

        // 检索条件：供应商
        const conditionSupplier = getState().LoadTaskManagerReducer.conditionSupplier;
        // 检索条件：创建时间
        const conditionCreatedOnStart = getState().LoadTaskManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().LoadTaskManagerReducer.conditionCreatedOnEnd;
        // 检索条件：计划发运日期
        const conditionPlanStart = getState().LoadTaskManagerReducer.conditionPlanStart;
        const conditionPlanEnd = getState().LoadTaskManagerReducer.conditionPlanEnd;
        // 检索条件：状态
        const conditionStatus = getState().LoadTaskManagerReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/routeLoadTask?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：线路编号
            loadTaskId: conditionLoadTaskId,
            // 检索条件：订单编号
            orderId: conditionOrderId,
            // 检索条件：服务方式
            serviceType: conditionServiceType === null ? '' : conditionServiceType.value,
            // 检索条件：起始城市
            routeStartId: conditionStartCity === null ? '' : conditionStartCity.value,
            // 检索条件：目的城市
            routeEndId: conditionEndCity === null ? '' : conditionEndCity.value,
            // 检索条件：服务方式
            transType: conditionTransMode === null ? '' : conditionTransMode.value,
            // 检索条件：供应商
            supplierId: conditionSupplier === null ? '' : conditionSupplier.value,
            // 检索条件：创建时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：计划发运日期
            planDateStart: conditionPlanStart,
            planDateEnd: conditionPlanEnd,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LoadTaskManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: LoadTaskManagerActionType.getLoadTaskList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取线路列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 删除指定线路
export const deleteLoadTask = (loadTaskId) => async (dispatch) => {
    try {
        swal({
            title: "确定删除该线路？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本检索URL
                const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/loadTask/' + loadTaskId;
                const res = await httpUtil.httpDelete(url);
                if (res.success === true) {
                    dispatch(getLoadTaskList());
                } else if (res.success === false) {
                    swal('删除运输线路失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};