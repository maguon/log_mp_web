import {EditLoginUserModalActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const sysConst = require('../../util/SysConst');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');

// 登陆用户修改
export const initEditLoginUserModal = () => async (dispatch) => {
    // 原始密码
    dispatch({type: EditLoginUserModalActionType.setLoginPassword, payload: ''});
    // 新密码
    dispatch({type: EditLoginUserModalActionType.setNewLoginPassword, payload: ''});
    // 确认密码
    dispatch({type: EditLoginUserModalActionType.setRepeatLoginPassword, payload: ''});
};

// 修改密码
export const changePassword = () => async (dispatch, getState) => {
    try {
        // 原始密码
        const loginPassword = getState().EditLoginUserModalReducer.loginPassword;
        // 新密码
        const newLoginPassword = getState().EditLoginUserModalReducer.newLoginPassword;
        // 确认密码
        const repeatLoginPassword = getState().EditLoginUserModalReducer.repeatLoginPassword;

        if (loginPassword === '' || newLoginPassword === '' || repeatLoginPassword === '') {
            swal('保存失败', '请输入完整的信息！', 'warning');
        } else if (newLoginPassword !== repeatLoginPassword){
            swal('保存失败', '新密码和确认密码输入不一致！', 'warning');
        } else {
            const params = {
                originPassword: loginPassword,
                newPassword: newLoginPassword
            };

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/password';
            let res = await httpUtil.httpPut(url, params);

            if (res.success === true) {
                $('#editLoginUserModal').modal('close');
                swal("保存成功", "", "success");
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};