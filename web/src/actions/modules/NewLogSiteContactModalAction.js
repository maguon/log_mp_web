import {apiHost} from '../../config/HostConfig';

const logSiteSettingDetailAction = require('../../actions/main/LogSiteSettingDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const saveLogSiteContact = () => async (dispatch, getState) => {
    try {
        // 收发货地点ID
        const logSiteId = getState().NewLogSiteContactModalReducer.logSiteId;
        // 联系人
        const name = getState().NewLogSiteContactModalReducer.name.trim();
        // 职务
        const position = getState().NewLogSiteContactModalReducer.position.trim();
        // 电话
        const phone = getState().NewLogSiteContactModalReducer.phone.trim();

        if (name === '' || position === '' || phone === '') {
            swal('保存失败', '请输入完整的联系方式信息！', 'warning');
        } else {
            const params = {
                addressId: logSiteId,
                userName: name,
                position: position,
                phone: phone
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                // + '/supplier/' + supplierId
                + '/addressContact';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newLogSiteContactModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(logSiteSettingDetailAction.getLogSiteContactList(logSiteId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};