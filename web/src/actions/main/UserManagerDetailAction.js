import {apiHost} from '../../config/HostConfig';
import {UserManagerDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/user?userId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.getUserInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取用户信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getUserInquiryList = (userId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerDetailReducer.inquiryStart;
        // 检索条件：每页数量
        const size = getState().UserManagerDetailReducer.inquirySize;

        // 检索条件：起始城市
        const inquiryConditionStartCity = getState().UserManagerDetailReducer.inquiryConditionStartCity;
        // 检索条件：目的城市
        const inquiryConditionEndCity = getState().UserManagerDetailReducer.inquiryConditionEndCity;
        // 检索条件：服务方式
        const inquiryConditionServiceType = getState().UserManagerDetailReducer.inquiryConditionServiceType;
        // 检索条件：状态
        const inquiryConditionStatus = getState().UserManagerDetailReducer.inquiryConditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/queryInquiry?start=' + start + '&size=' + size + '&userId=' + userId;

        // 检索条件
        let conditionsObj = {
            // 检索条件：起始城市
            routeStart: inquiryConditionStartCity === null ? '' : inquiryConditionStartCity.value,
            // 检索条件：目的城市
            routeEnd: inquiryConditionEndCity === null ? '' : inquiryConditionEndCity.value,
            // 检索条件：服务方式
            serviceType: inquiryConditionServiceType === null ? '' : inquiryConditionServiceType.value,
            // 检索条件：状态
            status: inquiryConditionStatus === null ? '' : inquiryConditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.setInquiryDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getUserInquiryList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取询价记录列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getLogInfoList = (userId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/address?userId=' + userId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.getLogInfoList, payload: res.result});
        } else if (res.success === false) {
            swal('获取收发货信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getBankCardList = (userId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/inquiryBank?userId=' + userId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.getBankCardList, payload: res.result});
        } else if (res.success === false) {
            swal('获取银行卡信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getInvoiceList = (userId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/inquiryInvoice?userId=' + userId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.getInvoiceList, payload: res.result});
        } else if (res.success === false) {
            swal('获取发票信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};