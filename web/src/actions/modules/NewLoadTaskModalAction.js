import {apiHost} from '../../config/HostConfig';
import {NewLoadTaskModalActionType} from "../../actionTypes";

const transDemandManagerDetailAction = require('../../actions/main/TransDemandManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');
const commonUtil = require('../../util/CommonUtil');

// 线路安排 初期
export const initNewLoadTaskModal = (pageId, orderId, requireId, loadTaskId) => async (dispatch) => {
    // 画面标记(新建/编辑)
    dispatch({type: NewLoadTaskModalActionType.setPageId, payload: pageId});
    // 订单编号
    dispatch({type: NewLoadTaskModalActionType.setOrderId, payload: orderId});
    // 需求编号
    dispatch({type: NewLoadTaskModalActionType.setRequireId, payload: requireId});
    // 线路安排编号
    dispatch({type: NewLoadTaskModalActionType.setLoadTaskId, payload: loadTaskId});

    if (pageId === 'new') {
        // 画面TAB标记
        dispatch({type: NewLoadTaskModalActionType.setTabId, payload: 'base'});
        // TAB 线路信息：起始城市
        dispatch({type: NewLoadTaskModalActionType.setStartCity, payload: null});
        // TAB 线路信息：目的城市
        dispatch({type: NewLoadTaskModalActionType.setEndCity, payload: null});
        // TAB 线路信息：供应商
        dispatch({type: NewLoadTaskModalActionType.setSupplier, payload: null});
        // TAB 线路信息：运送方式列表
        dispatch({type: NewLoadTaskModalActionType.setTransportModeList, payload: []});
        // TAB 线路信息：运送方式
        dispatch({type: NewLoadTaskModalActionType.setTransportMode, payload: null});
        // TAB 线路信息：计划发运日期
        dispatch({type: NewLoadTaskModalActionType.setPlanDate, payload: ''});
        // TAB 线路信息：备注
        dispatch({type: NewLoadTaskModalActionType.setRemark, payload: ''});
    } else {
        dispatch(showLoadTaskTab());
    }
};

export const getTransMode = (supplierId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/supplier?supplierId=' + supplierId;

        let transportModeList = [];
        let land = {value: 1, label: sysConst.TRANSPORT_MODE[0].label};
        let ship = {value: 2, label: sysConst.TRANSPORT_MODE[1].label};
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 1：陆运 2：海运 1：陆运+海运
                if (res.result[0].trans_type === 1) {
                    transportModeList.push(land);
                } else if (res.result[0].trans_type === 2) {
                    transportModeList.push(ship);
                } else {
                    transportModeList.push(land);
                    transportModeList.push(ship);
                }
            }
            dispatch({type: NewLoadTaskModalActionType.setTransportModeList, payload: transportModeList});
        } else if (res.success === false) {
            swal('获取供应商详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 显示线路安排TAB
export const showLoadTaskTab = () => async (dispatch, getState) => {
    try {
        // 订单编号
        const orderId = getState().NewLoadTaskModalReducer.orderId;
        // 运输需求ID
        const requireId = getState().NewLoadTaskModalReducer.requireId;
        // 线路安排ID
        const loadTaskId = getState().NewLoadTaskModalReducer.loadTaskId;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + orderId + '/require/' + requireId + '/loadTask?loadTaskId=' + loadTaskId;

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 画面TAB标记
                dispatch({type: NewLoadTaskModalActionType.setTabId, payload: 'base'});
                // TAB 线路信息：起始城市
                dispatch({type: NewLoadTaskModalActionType.setStartCity, payload: {value: res.result[0].route_start_id, label: res.result[0].route_start}});
                // TAB 线路信息：目的城市
                dispatch({type: NewLoadTaskModalActionType.setEndCity, payload: {value: res.result[0].route_end_id, label: res.result[0].route_end}});
                // TAB 线路信息：供应商
                dispatch({type: NewLoadTaskModalActionType.setSupplier, payload: {value: res.result[0].supplier_id, label: res.result[0].supplier_short}});
                // TAB 线路信息：运送方式列表
                dispatch(getTransMode(res.result[0].supplier_id));
                // TAB 线路信息：运送方式
                dispatch({type: NewLoadTaskModalActionType.setTransportMode, payload: {value: res.result[0].trans_type, label:commonUtil.getJsonValue(sysConst.TRANSPORT_MODE, res.result[0].trans_type)}});
                // TAB 线路信息：计划发运日期
                dispatch({type: NewLoadTaskModalActionType.setPlanDate, payload: res.result[0].plan_date});
                // TAB 线路信息：备注
                dispatch({type: NewLoadTaskModalActionType.setRemark, payload: res.result[0].remark});
            }
        } else if (res.success === false) {
            swal('获取线路安排信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const showTransCarTab = () => async (dispatch, getState) => {
    // 订单编号
    const orderId = getState().NewLoadTaskModalReducer.orderId;
    // 运输需求ID
    const requireId = getState().NewLoadTaskModalReducer.requireId;
    // 线路安排ID
    const loadTaskId = getState().NewLoadTaskModalReducer.loadTaskId;

    // 画面标记
    dispatch({type: NewLoadTaskModalActionType.setTabId, payload: 'trans'});
    // 取得线路安排信息
    dispatch(getLoadTaskInfo(orderId, requireId, loadTaskId));
    // 未安排车辆列表
    dispatch(getUnscheduledCarList(orderId, loadTaskId));
    // 已安排车辆列表
    dispatch(getScheduledCarList(orderId, loadTaskId));
};

export const addLoadTaskDetail = (orderItemId, vin, supplierTransPrice, supplierInsurePrice) => async (dispatch, getState) => {
    try {
        // 订单编号
        const orderId = getState().NewLoadTaskModalReducer.orderId;
        // 运输需求ID
        const requireId = getState().NewLoadTaskModalReducer.requireId;
        // 线路安排ID
        const loadTaskId = getState().NewLoadTaskModalReducer.loadTaskId;

        const params = {
            orderItemId: orderItemId,
            vin: vin,
            supplierTransPrice: supplierTransPrice,
            supplierInsurePrice: supplierInsurePrice
        };

        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/loadTask/' + loadTaskId + '/loadTaskDetail';
        let res = await httpUtil.httpPost(url, params);
        if (res.success === true) {
            // 取得线路安排信息
            dispatch(getLoadTaskInfo(orderId, requireId, loadTaskId));
            // 未安排车辆列表
            dispatch(getUnscheduledCarList(orderId, loadTaskId));
            // 已安排车辆列表
            dispatch(getScheduledCarList(orderId, loadTaskId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const editLoadTaskDetail = (loadTaskDetailId, supplierTransPrice, supplierInsurePrice) => async (dispatch, getState) => {
    try {
        // 订单编号
        const orderId = getState().NewLoadTaskModalReducer.orderId;
        // 运输需求ID
        const requireId = getState().NewLoadTaskModalReducer.requireId;
        // 线路安排ID
        const loadTaskId = getState().NewLoadTaskModalReducer.loadTaskId;

        const params = {
            supplierTransPrice: supplierTransPrice,
            supplierInsurePrice: supplierInsurePrice
        };
        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/loadTask/' + loadTaskId + '/loadTaskDetail/' + loadTaskDetailId;
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            swal("保存成功", "", "success");
            // 取得线路安排信息
            dispatch(getLoadTaskInfo(orderId, requireId, loadTaskId));
            // 未安排车辆列表
            dispatch(getUnscheduledCarList(orderId, loadTaskId));
            // 已安排车辆列表
            dispatch(getScheduledCarList(orderId, loadTaskId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteLoadTaskDetail = (loadTaskDetailId) => async (dispatch, getState) => {
    try {
        // 订单编号
        const orderId = getState().NewLoadTaskModalReducer.orderId;
        // 运输需求ID
        const requireId = getState().NewLoadTaskModalReducer.requireId;
        // 线路安排ID
        const loadTaskId = getState().NewLoadTaskModalReducer.loadTaskId;

        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/loadTask/' + loadTaskId + '/loadTaskDetail/' + loadTaskDetailId;
        let res = await httpUtil.httpDelete(url, {});
        if (res.success === true) {
            // 取得线路安排信息
            dispatch(getLoadTaskInfo(orderId, requireId, loadTaskId));
            // 未安排车辆列表
            dispatch(getUnscheduledCarList(orderId, loadTaskId));
            // 已安排车辆列表
            dispatch(getScheduledCarList(orderId, loadTaskId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const goNext = () => async (dispatch, getState) => {
    try {
        // 画面标记
        const tabId = getState().NewLoadTaskModalReducer.tabId;
        // 订单编号
        const orderId = getState().NewLoadTaskModalReducer.orderId;
        // 运输需求ID
        const requireId = getState().NewLoadTaskModalReducer.requireId;

        if (tabId === 'base'){
            // 保存线路安排 基本信息
            dispatch(saveLoadTaskInfo());
        } else if (tabId === 'trans'){
            // 切换画面
            dispatch({type: NewLoadTaskModalActionType.setTabId, payload: 'sync'});
            // 设定默认值：不同步
            dispatch({type: NewLoadTaskModalActionType.setSyncFlag, payload: false});
        } else if (tabId === 'sync'){
            // 同步标记 选中时
            if (getState().NewLoadTaskModalReducer.syncFlag) {
                // 线路安排ID
                const loadTaskId = getState().NewLoadTaskModalReducer.loadTaskId;
                // 基本url
                let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/loadTask/' + loadTaskId + '/submitToSupplier';
                let res = await httpUtil.httpPost(url, {});
                if (res.success === true) {
                    swal("同步成功", "", "success");
                    // 运输需求 - 线路安排 刷新安排线路列表
                    dispatch(transDemandManagerDetailAction.getLoadTaskList(orderId, requireId));
                } else if (res.success === false) {
                    swal('同步失败', res.msg, 'warning');
                }
            }
            $('#newLoadTaskModal').modal('close');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 编辑画面用 (确定)
export const confirmLoadTask = () => async (dispatch, getState) => {
    // 画面TAB标记
    const tabId = getState().NewLoadTaskModalReducer.tabId;
    if (tabId === 'base') {
        dispatch(saveLoadTaskInfo());
    } else {
        $('#newLoadTaskModal').modal('close');
    }
};

// 保存线路安排 基本信息
export const saveLoadTaskInfo = () => async (dispatch, getState) => {
    // 画面标记
    const pageId = getState().NewLoadTaskModalReducer.pageId;
    // 订单编号
    const orderId = getState().NewLoadTaskModalReducer.orderId;
    // 运输需求ID
    const requireId = getState().NewLoadTaskModalReducer.requireId;
    // 线路安排ID
    const loadTaskId = getState().NewLoadTaskModalReducer.loadTaskId;

    // TAB 线路信息：起始城市
    const startCity = getState().NewLoadTaskModalReducer.startCity;
    // TAB 线路信息：目的城市
    const endCity = getState().NewLoadTaskModalReducer.endCity;
    // TAB 线路信息：供应商
    const supplier = getState().NewLoadTaskModalReducer.supplier;
    // TAB 线路信息：运送方式
    const transportMode = getState().NewLoadTaskModalReducer.transportMode;
    // TAB 线路信息：计划发运日期
    const planDate = getState().NewLoadTaskModalReducer.planDate;
    // TAB 线路信息：备注
    const remark = getState().NewLoadTaskModalReducer.remark;

    if (startCity == null || endCity == null || supplier == null || transportMode == null || planDate === '') {
        swal('保存失败', '请输入完整的线路安排信息！', 'warning');
    } else {
        const params = {
            routeStart: startCity.label,
            routeEnd: endCity.label,
            routeStartId: startCity.value,
            routeEndId: endCity.value,
            supplierId: supplier.value,
            transType: transportMode.value,
            planDate: planDate,
            remark: remark
        };

        // 基本url
        let url = '';
        if (pageId === 'new') {
            url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + orderId + '/require/' + requireId + '/loadTask';
        } else {
            url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/loadTask/' + loadTaskId;
        }

        let res = null;
        if (pageId === 'new') {
            res = await httpUtil.httpPost(url, params);
        } else {
            res = await httpUtil.httpPut(url, params);
        }

        if (res.success === true) {
            if (pageId === 'new') {
                // 画面标记
                dispatch({type: NewLoadTaskModalActionType.setTabId, payload: 'trans'});
                // 线路安排ID
                dispatch({type: NewLoadTaskModalActionType.setLoadTaskId, payload: res.id});

                // 取得线路安排信息
                dispatch(getLoadTaskInfo(orderId, requireId, res.id));
                // 未安排车辆列表
                dispatch(getUnscheduledCarList(orderId, res.id));
                // 已安排车辆列表
                dispatch(getScheduledCarList(orderId, res.id));
            } else {
                swal("保存成功", "", "success");
                $('#newLoadTaskModal').modal('close');
            }
            // 运输需求 - 线路安排 刷新安排线路列表
            dispatch(transDemandManagerDetailAction.getLoadTaskList(orderId, requireId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    }
};

// 取得线路安排信息
export const getLoadTaskInfo = (orderId, requireId, loadTaskId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + orderId + '/require/' + requireId + '/loadTask?loadTaskId=' + loadTaskId;

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewLoadTaskModalActionType.getLoadTaskInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取线路安排信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};


// 未安排车辆列表
export const getUnscheduledCarList = (orderId, loadTaskId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + orderId + '/loadTask/' + loadTaskId + '/loadTaskDetail?arrangeFlag=1';

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewLoadTaskModalActionType.getUnscheduledCarList, payload: res.result});
            $(".unscheduled-input").val(0);
        } else if (res.success === false) {
            swal('获取未安排车辆列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 已安排车辆列表
export const getScheduledCarList = (orderId, loadTaskId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + orderId + '/loadTask/' + loadTaskId + '/loadTaskDetail?arrangeFlag=2';

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewLoadTaskModalActionType.getScheduledCarList, payload: res.result});
            for (let i = 0; i < res.result.length; i++) {
                $("#trans_scheduled_index" + i).val(res.result[i].supplier_trans_price);
                $("#insure_scheduled_index" + i).val(res.result[i].supplier_insure_price);
            }
        } else if (res.success === false) {
            swal('获取已安排车辆列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};