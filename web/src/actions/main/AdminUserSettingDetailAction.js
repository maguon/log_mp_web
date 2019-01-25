import {apiHost} from '../../config/HostConfig';
import {AdminUserSettingDetailActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getAdminInfo = (adminId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/adminUser?isSuperUserFlag=0&adminId=' + adminId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: AdminUserSettingDetailActionType.setAdminId, payload: res.result[0].id});
                dispatch({type: AdminUserSettingDetailActionType.setAdminStatus, payload: res.result[0].status});
                dispatch({type: AdminUserSettingDetailActionType.setPhone, payload: res.result[0].phone});
                dispatch({type: AdminUserSettingDetailActionType.setAdminName, payload: res.result[0].real_name});
                dispatch({type: AdminUserSettingDetailActionType.setAdminGender, payload: res.result[0].gender});
                dispatch({type: AdminUserSettingDetailActionType.setDepartment, payload: {value: res.result[0].type, label: res.result[0].department_name}});
            }
        } else if (res.success === false) {
            swal('获取员工详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeAdminStatus = (id, status) => async (dispatch) => {
    swal({
        title: status === 1 ? "确定停用该员工？" : "确定重新启用该员工？",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            // 状态
            let newStatus = 0;
            if (status === 0) {
                newStatus = 1
            } else {
                newStatus = 0
            }
            const url = apiHost + '/api/admin/' + id + '/status/' + newStatus;
            const res = await httpUtil.httpPut(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getAdminInfo(id));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

export const saveAdmin = () => async (dispatch, getState) => {
    try {
        // 员工编号
        const adminId = getState().AdminUserSettingDetailReducer.adminId;
        // 部门
        const department = getState().AdminUserSettingDetailReducer.department;
        // 姓名
        const adminName = getState().AdminUserSettingDetailReducer.adminName.trim();
        // 性别
        const gender = getState().AdminUserSettingDetailReducer.gender;

        const params = {
            id: adminId,
            realName: adminName,
            gender: gender,
            department: department.value
        };
        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID);
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            swal("保存成功", "", "success");
            dispatch(getAdminInfo(adminId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};