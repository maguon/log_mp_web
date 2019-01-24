import {apiHost} from '../../config/HostConfig';
import {DepartmentSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getDepartmentList = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/department';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: DepartmentSettingActionType.getDepartmentList, payload: res.result})
        } else if (res.success === false) {
            swal('获取部门列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addDepartment = () => async (dispatch, getState) => {
    try {
        // 部门
        const departmentName = getState().DepartmentSettingReducer.departmentName.trim();

        if (departmentName === '') {
            swal('添加失败', '请输入部门名称！', 'warning');
        } else {
            const params = {
                departmentName: departmentName
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/department';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                swal("添加成功", "", "success");
                // 清空输入内容
                dispatch({type: DepartmentSettingActionType.setDepartmentName, payload: ''});
                // 保存成功后，重新检索画面数据
                dispatch(getDepartmentList());
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// export const changeDepartmentStatus = (id, status) => async (dispatch) => {
//     swal({
//         title: status === 0 ? "确定停用该部门？" : "确定启用该部门",
//         text: "",
//         type: "warning",
//         showCancelButton: true,
//         confirmButtonColor: '#724278',
//         confirmButtonText: '确定',
//         cancelButtonText: '取消'
//     }).then(async function (isConfirm) {
//         if (isConfirm && isConfirm.value === true) {
//             // 状态
//             let newStatus = 0;
//             if (status === 0) {
//                 newStatus = 1
//             } else {
//                 newStatus = 0
//             }
//             const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/department/' + id + '/status/' + newStatus;
//             const res = await httpUtil.httpPut(url, {});
//             if (res.success === true) {
//                 swal("修改成功", "", "success");
//                 dispatch(getDepartmentList());
//             } else if (res.success === false) {
//                 swal('修改失败', res.msg, 'warning');
//             }
//         }
//     });
// };