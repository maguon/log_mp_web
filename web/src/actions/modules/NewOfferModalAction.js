import {apiHost} from '../../config/HostConfig';

const inquiryManagerDetailAction = require('../../actions/main/InquiryManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const saveOffer = () => async (dispatch, getState) => {
    try {
        // 询价ID
        const inquiryId = getState().NewOfferModalReducer.inquiryId;
        // 用户ID
        const userId = getState().NewOfferModalReducer.userId;
        // 协商运费
        const actFreight = getState().NewOfferModalReducer.actFreight;
        // 协商保费
        const actInsuranceFee = getState().NewOfferModalReducer.actInsuranceFee;
        // 备注
        const remark = getState().NewOfferModalReducer.remark;

        if (actFreight === '' || actInsuranceFee === '') {
            swal('保存失败', '请输入完整的报价信息！', 'warning');
        } else {
            const params = {
                feePrice: actFreight,
                totalInsurePrice: actInsuranceFee,
                mark: remark
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/user/' + userId + '/inquiry/' + inquiryId + '/feePrice';
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                $('#newOfferModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(inquiryManagerDetailAction.getInquiryInfo(inquiryId));
                dispatch(inquiryManagerDetailAction.getInquiryCarList(inquiryId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};