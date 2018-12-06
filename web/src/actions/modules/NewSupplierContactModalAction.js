import {apiHost} from '../../config/HostConfig';

const supplierSettingDetailAction = require('../../actions/main/SupplierSettingDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const saveSupplierContact = () => async (dispatch, getState) => {
    try {
        // 供应商ID
        const supplierId = getState().NewSupplierContactModalReducer.supplierId;
        // 联系人
        const name = getState().NewSupplierContactModalReducer.name.trim();
        // 职务
        const position = getState().NewSupplierContactModalReducer.position.trim();
        // 电话
        const phone = getState().NewSupplierContactModalReducer.phone.trim();

        console.log('name',name);
        console.log('position',position);
        console.log('phone',phone);

        // if (name === '' || position === '' || phone === '') {
        //     swal('保存失败', '请输入完整的银行账号信息！', 'warning');
        // } else {
        //     const params = {
        //         name: name,
        //         position: position,
        //         phone: phone
        //     };
        //     // 基本url
        //     let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
        //         + '/supplier/' + supplierId + '/contact';
        //     let res = await httpUtil.httpPost(url, params);
        //     if (res.success === true) {
        //         $('#newSupplierBankModal').modal('close');
        //         swal("保存成功", "", "success");
        //         // 保存成功后，重新检索画面数据
        //         dispatch(supplierSettingDetailAction.getSupplierContactList(supplierId));
        //     } else if (res.success === false) {
        //         swal('保存失败', res.msg, 'warning');
        //     }
        // }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};