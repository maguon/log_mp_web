import {apiHost} from '../../config/HostConfig';
import {EditDepartmentModalActionType} from "../../actionTypes";

const departmentSettingAction = require('../../actions/main/DepartmentSettingAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 修改部门信息画面 初期
export const initEditDepartmentModal = (departmentInfo) => async (dispatch) => {
    // 部门ID
    dispatch({type: EditDepartmentModalActionType.setDepartmentId, payload: departmentInfo.id});
    // 部门名称
    dispatch({type: EditDepartmentModalActionType.setDepartmentName, payload: departmentInfo.department_name});
};

export const saveDepartment = () => async (dispatch, getState) => {
    try {
        // 部门ID
        const departmentId = getState().EditDepartmentModalReducer.departmentId;
        // 部门名称
        const departmentName = getState().EditDepartmentModalReducer.departmentName.trim();

        if (departmentName === '') {
            swal('保存失败', '请输入部门名称！', 'warning');
        } else {
            const params = {
                departmentName: departmentName
            };

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/department/' + departmentId;
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                $('#editDepartmentModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(departmentSettingAction.getDepartmentList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};