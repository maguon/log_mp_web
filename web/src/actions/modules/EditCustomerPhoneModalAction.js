import {apiHost} from '../../config/HostConfig';
import {EditCustomerPhoneModalActionType} from "../../actionTypes";

const callCenterSettingAction = require('../../actions/main/CallCenterSettingAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 修改客服电话画面 初期
export const initEditCustomerPhoneModal = (customerPhone) => async (dispatch) => {
    // 客服电话ID
    dispatch({type: EditCustomerPhoneModalActionType.setCustomerPhoneId, payload: customerPhone.id});
    // 客服电话
    dispatch({type: EditCustomerPhoneModalActionType.setCustomerPhone, payload: customerPhone.phone});
};

export const saveCustomerPhone = () => async (dispatch, getState) => {
    try {
        // 客服电话ID
        const customerPhoneId = getState().EditCustomerPhoneModalReducer.customerPhoneId;
        // 客服电话
        const customerPhone = getState().EditCustomerPhoneModalReducer.customerPhone.trim();

        if (customerPhone === '') {
            swal('保存失败', '请输入客服电话！', 'warning');
        } else {
            const params = {};

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/customerPhone/' + customerPhoneId + '?phone=' + customerPhone;
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                $('#editCustomerPhoneModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(callCenterSettingAction.getCustomerPhoneList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};