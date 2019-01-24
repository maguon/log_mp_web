import {apiHost} from '../../config/HostConfig';
import {NewAdminModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

const adminUserSettingAction = require('../../actions/main/AdminUserSettingAction');

// 新增员工画面 初期
export const initNewAdminModal = () => async (dispatch) => {
    // 手机
    dispatch({type: NewAdminModalActionType.setPhone, payload: ''});
    // 密码
    dispatch({type: NewAdminModalActionType.setPassword, payload: ''});
    // 姓名
    dispatch({type: NewAdminModalActionType.setAdminName, payload: ''});
    // 性别 默认为男：1
    dispatch({type: NewAdminModalActionType.setAdminGender, payload: 1});
    // 部门
    dispatch({type: NewAdminModalActionType.setDepartment, payload: null});
};

export const saveAdmin = () => async (dispatch, getState) => {
    try {
        // 手机
        const phone = getState().NewAdminModalReducer.phone.trim();
        // 密码
        const password = getState().NewAdminModalReducer.password.trim();
        // 姓名
        const adminName = getState().NewAdminModalReducer.adminName.trim();
        // 性别
        const gender = getState().NewAdminModalReducer.gender;
        // 部门
        const department = getState().NewAdminModalReducer.department;

        if (phone === '' || password === '' || department == null) {
            swal('保存失败', '请输入完整的员工信息！', 'warning');
        } else {
            const params = {
                realName: adminName,
                gender: gender,
                phone: phone,
                department: department.value,
                password: password
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID);
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newAdminModal').modal('close');
                swal("保存成功", "", "success");
                dispatch(adminUserSettingAction.getAdminList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};