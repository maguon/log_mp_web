import {apiHost} from '../../config/HostConfig';

const supplierSettingDetailAction = require('../../actions/main/SupplierSettingDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const saveSupplierBank = () => async (dispatch, getState) => {
    try {
        // 供应商ID
        const supplierId = getState().NewSupplierBankModalReducer.supplierId;
        // 银行
        const bank = getState().NewSupplierBankModalReducer.bank.trim();
        // 银行账号
        const bankCode = getState().NewSupplierBankModalReducer.bankCode.trim();
        // 姓名
        const accountName = getState().NewSupplierBankModalReducer.accountName.trim();

        if (bank === '' || bankCode === '' || accountName === '') {
            swal('保存失败', '请输入完整的银行账号信息！', 'warning');
        } else {
            const params = {
                bank: bank,
                bankCode: bankCode,
                accountName: accountName
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
                + '/supplier/' + supplierId + '/bank';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newSupplierBankModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(supplierSettingDetailAction.getSupplierBankList(supplierId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};