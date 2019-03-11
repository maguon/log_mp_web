import {apiHost} from '../../config/HostConfig';
import {CallCenterSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getCustomerPhoneList = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/customerPhone';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CallCenterSettingActionType.getCustomerPhoneList, payload: res.result})
        } else if (res.success === false) {
            swal('获取客服电话列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addCustomerPhone = () => async (dispatch, getState) => {
    try {
        // 部门
        const customerPhone = getState().CallCenterSettingReducer.customerPhone.trim();

        if (customerPhone === '') {
            swal('添加失败', '请输入客服电话！', 'warning');
        } else {
            const params = {
                phone: customerPhone
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/customerPhone';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                swal("添加成功", "", "success");
                // 清空输入内容
                dispatch({type: CallCenterSettingActionType.setCustomerPhone, payload: ''});
                // 保存成功后，重新检索画面数据
                dispatch(getCustomerPhoneList());
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteCustomerPhone = (id) => async (dispatch) => {
    swal({
        title: "确定删除该客服电话？",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/customerPhone?id=' + id;
            const res = await httpUtil.httpDelete(url, {});
            if (res.success === true) {
                swal("删除成功", "", "success");
                dispatch(getCustomerPhoneList());
            } else if (res.success === false) {
                swal('删除失败', res.msg, 'warning');
            }
        }
    });
};