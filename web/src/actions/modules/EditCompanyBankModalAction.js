import {apiHost} from '../../config/HostConfig';
import {EditCompanyBankModalActionType} from "../../actionTypes";

const companyBankSettingAction = require('../../actions/main/CompanyBankSettingAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 修改账户信息画面 初期
export const initEditCompanyBankModal = (companyBankInfo) => async (dispatch) => {
    // 银行ID
    dispatch({type: EditCompanyBankModalActionType.setCompanyBankId, payload: companyBankInfo.id});
    // 银行名称
    dispatch({type: EditCompanyBankModalActionType.setCompanyBank, payload: companyBankInfo.bank});
    // 卡号
    dispatch({type: EditCompanyBankModalActionType.setCompanyBankCode, payload: companyBankInfo.bank_code});
    // 收款人
    dispatch({type: EditCompanyBankModalActionType.setCompanyBankUser, payload: companyBankInfo.account_name});
};

export const saveCompanyBank = () => async (dispatch, getState) => {
    try {
        // 银行ID
        const companyBankId = getState().EditCompanyBankModalReducer.companyBankId;
        // 银行名称
        const companyBank = getState().EditCompanyBankModalReducer.companyBank.trim();
        // 卡号
        const companyBankCode = getState().EditCompanyBankModalReducer.companyBankCode.trim();
        // 收款人
        const companyBankUser = getState().EditCompanyBankModalReducer.companyBankUser.trim();

        if (companyBank === '' || companyBankCode === ''|| companyBankUser === '') {
            swal('保存失败', '请输入完整的银行账户信息！', 'warning');
        } else {
            const params = {
                bank: companyBank,
                bankCode: companyBankCode,
                accountName: companyBankUser
            };

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/companyBank/' + companyBankId;
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                $('#editCompanyBankModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(companyBankSettingAction.getCompanyBankList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};