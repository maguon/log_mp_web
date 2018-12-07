import {apiHost} from '../../config/HostConfig';
import {SupplierSettingDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getSupplierInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/supplier?supplierId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierSettingDetailActionType.getSupplierInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取供应商信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getSupplierContactList = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/supplier/' + id + '/contact';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierSettingDetailActionType.getSupplierContactList, payload: res.result});
        } else if (res.success === false) {
            swal('获取供应商联系方式列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteSupplierContact = (supplierId, contactId) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/supplier/' + supplierId + '/contact/' + contactId;
        const res = await httpUtil.httpDelete(url);
        if (res.success === true) {
            dispatch(getSupplierContactList(supplierId));
        } else if (res.success === false) {
            swal('删除供应商联系方式失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getSupplierBankList = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/supplier/' + id + '/bank';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierSettingDetailActionType.getSupplierBankList, payload: res.result});
        } else if (res.success === false) {
            swal('获取供应商银行列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteSupplierBank = (supplierId, bankId) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/supplier/' + supplierId + '/bank/' + bankId;
        const res = await httpUtil.httpDelete(url);
        if (res.success === true) {
            dispatch(getSupplierBankList(supplierId));
        } else if (res.success === false) {
            swal('删除供应商银行账号失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};