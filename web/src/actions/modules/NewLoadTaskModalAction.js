import {apiHost} from '../../config/HostConfig';
import {CommonActionType, NewLoadTaskModalActionType} from "../../actionTypes";

const inquiryManagerDetailAction = require('../../actions/main/InquiryManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 线路安排 初期
export const initNewLoadTaskModal = (pageId, orderId, requireId) => async (dispatch) => {
    // 画面标记
    dispatch({type: NewLoadTaskModalActionType.setPageId, payload: pageId});
    // 画面TAB标记
    dispatch({type: NewLoadTaskModalActionType.setTabId, payload: 'base'});
    // 订单编号
    dispatch({type: NewLoadTaskModalActionType.setOrderId, payload: orderId});
    // 订单编号
    dispatch({type: NewLoadTaskModalActionType.setRequireId, payload: requireId});

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
};

export const getTransMode = (supplier) => async (dispatch, getState) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/supplier?supplierId=' + supplier.value;

        let transportModeList = [];
        let land = {value: 1, label: '陆运'};
        let ship = {value: 2, label: '海运'};
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
            // TAB 线路信息：清空，运送方式
            dispatch({type: NewLoadTaskModalActionType.setTransportMode, payload: null});
        } else if (res.success === false) {
            swal('获取供应商详细信息失败', res.msg, 'warning');
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
                let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/order/' + orderId + '/require/' + requireId + '/loadTask';
                let res = await httpUtil.httpPost(url, params);
                if (res.success === true) {
                    swal("保存成功", "", "success");
                    // 画面标记
                    dispatch({type: NewLoadTaskModalActionType.setTabId, payload: 'trans'});
                    // 未安排车辆列表
                    dispatch(getUnscheduledCarList(orderId, res.id));
                    // 已安排车辆列表
                    dispatch(getScheduledCarList(orderId, res.id));
                } else if (res.success === false) {
                    swal('保存失败', res.msg, 'warning');
                }
            }
        } else if (tabId === 'trans'){
            dispatch({type: NewLoadTaskModalActionType.setTabId, payload: 'sync'});
        } else if (tabId === 'sync'){
            // TODO
            $('#newLoadTaskModal').modal('close');
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
            + '/order/' + orderId + '/loadTask/' + loadTaskId + 'loadTaskDetail?arrangeFlag=1';

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewLoadTaskModalActionType.getUnscheduledCarList, payload: res.result});
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
            + '/order/' + orderId + '/loadTask/' + loadTaskId + 'loadTaskDetail?arrangeFlag=2';

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewLoadTaskModalActionType.getScheduledCarList, payload: res.result});
        } else if (res.success === false) {
            swal('获取已安排车辆列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};