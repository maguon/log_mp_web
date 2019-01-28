import {apiHost} from '../../config/HostConfig';
import {SupplierSettingDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getSupplierInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/supplier?supplierId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SupplierSettingDetailActionType.getSupplierInfo, payload: res.result});
            if (res.result.length > 0) {
                dispatch({type: SupplierSettingDetailActionType.setAppUrl, payload: res.result[0].app_url == null ? '' : res.result[0].app_url});
                dispatch({type: SupplierSettingDetailActionType.setAppId, payload: res.result[0].app_id == null ? '' : res.result[0].app_id});
                dispatch({type: SupplierSettingDetailActionType.setAppSecret, payload: res.result[0].app_secret == null ? '' : res.result[0].app_secret});
                dispatch({type: SupplierSettingDetailActionType.setBaseAddrId, payload: res.result[0].base_addr_id == null ? '' : res.result[0].base_addr_id});
                dispatch({type: SupplierSettingDetailActionType.setReceiveId, payload: res.result[0].receive_id == null ? '' : res.result[0].receive_id});
                dispatch({type: SupplierSettingDetailActionType.setCarModuleId, payload: res.result[0].car_module_id == null ? '' : res.result[0].car_module_id});
            }
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
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
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
        swal({
            title: "确定删除该联系人？",
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
                    + '/supplier/' + supplierId + '/contact/' + contactId;
                const res = await httpUtil.httpDelete(url);
                if (res.success === true) {
                    dispatch(getSupplierContactList(supplierId));
                } else if (res.success === false) {
                    swal('删除供应商联系方式失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getSupplierBankList = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
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
        swal({
            title: "确定删除该银行账号？",
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
                    + '/supplier/' + supplierId + '/bank/' + bankId;
                const res = await httpUtil.httpDelete(url);
                if (res.success === true) {
                    dispatch(getSupplierBankList(supplierId));
                } else if (res.success === false) {
                    swal('删除供应商银行账号失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveAdvancedSetting = (supplierId) => async (dispatch, getState) => {
    try {
        // URL
        const appUrl = getState().SupplierSettingDetailReducer.appUrl;
        // ID
        const appId = getState().SupplierSettingDetailReducer.appId;
        // 密钥
        const appSecret = getState().SupplierSettingDetailReducer.appSecret;
        // 发运地ID
        const baseAddrId = getState().SupplierSettingDetailReducer.baseAddrId;
        // 经销商ID
        const receiveId = getState().SupplierSettingDetailReducer.receiveId;
        // 品牌ID
        const carModuleId = getState().SupplierSettingDetailReducer.carModuleId;

        // 请求body
        const params = {
            appUrl: appUrl,
            appId: appId,
            appSecret: appSecret,
            baseAddrId: baseAddrId,
            receiveId: receiveId,
            carModuleId: carModuleId
        };
        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/supplier/' + supplierId + '/advancedSetting';
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            swal("保存成功", "", "success");
            // 保存成功后，重新检索画面数据
            dispatch(getSupplierInfo(supplierId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};