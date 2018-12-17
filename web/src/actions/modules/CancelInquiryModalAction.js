import {apiHost} from '../../config/HostConfig';

const inquiryManagerDetailAction = require('../../actions/main/InquiryManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const cancelInquiry = () => async (dispatch, getState) => {
    try {
        // 询价ID
        const inquiryId = getState().CancelInquiryModalReducer.inquiryId;
        // 备注
        const remark = getState().CancelInquiryModalReducer.remark;
        const params = {
            markReason: remark
        };
        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/inquiry/' + inquiryId + '/cancel';
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            $('#cancelInquiryModal').modal('close');
            swal("保存成功", "", "success");
            // 保存成功后，重新检索画面数据
            dispatch(inquiryManagerDetailAction.getInquiryInfo(inquiryId));
            dispatch(inquiryManagerDetailAction.getInquiryCarList(inquiryId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }

    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};