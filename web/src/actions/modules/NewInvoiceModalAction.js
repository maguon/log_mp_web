import {apiHost} from '../../config/HostConfig';
import {NewInvoiceModalActionType} from "../../actionTypes";

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 支付模态画面 初期
export const initNewInvoiceModal = (orderId) => async (dispatch) => {
    // 订单编号
    dispatch({type: NewInvoiceModalActionType.setOrderId, payload: ''});

    // 发票抬头
    dispatch({type: NewInvoiceModalActionType.setInvoiceTitle, payload: ''});
    // 税号
    dispatch({type: NewInvoiceModalActionType.setCompanyTax, payload: ''});
    // 电话号码
    dispatch({type: NewInvoiceModalActionType.setCompanyPhone, payload: ''});
    // 开户银行
    dispatch({type: NewInvoiceModalActionType.setBank, payload: ''});
    // 银行账号
    dispatch({type: NewInvoiceModalActionType.setBankNum, payload: ''});
    // 单位地址
    dispatch({type: NewInvoiceModalActionType.setCompanyAddress, payload: ''});
    // 备注
    dispatch({type: NewInvoiceModalActionType.setRemark, payload: ''});

    // 收货人
    dispatch({type: NewInvoiceModalActionType.setReceiveUser, payload: ''});
    // 联系电话
    dispatch({type: NewInvoiceModalActionType.setReceivePhone, payload: ''});
    // 收货地址
    dispatch({type: NewInvoiceModalActionType.setReceiveAddress, payload: ''});
};

export const saveInvoice = () => async (dispatch, getState) => {
    try {
        // 订单编号
        const orderId = getState().NewInvoiceModalReducer.orderId;

        // 发票抬头
        const invoiceTitle = getState().NewInvoiceModalReducer.invoiceTitle.trim();
        // 税号
        const companyTax = getState().NewInvoiceModalReducer.companyTax.trim();
        // 电话号码
        const companyPhone = getState().NewInvoiceModalReducer.companyPhone.trim();
        // 开户银行
        const bank = getState().NewInvoiceModalReducer.bank.trim();
        // 银行账号
        const bankNum = getState().NewInvoiceModalReducer.bankNum.trim();
        // 单位地址
        const companyAddress = getState().NewInvoiceModalReducer.companyAddress.trim();
        // 备注
        const remark = getState().NewInvoiceModalReducer.remark.trim();

        // 收货人
        const receiveUser = getState().NewInvoiceModalReducer.receiveUser.trim();
        // 联系电话
        const receivePhone = getState().NewInvoiceModalReducer.receivePhone.trim();
        // 收货地址
        const receiveAddress = getState().NewInvoiceModalReducer.receiveAddress.trim();

        if (invoiceTitle === '' || companyTax === '') {
            swal('保存失败', '请输入完整的开票信息！', 'warning');
        } else {
            const params = {
                bank: paymentBank,
                bankCode: bankNum,
                accountName: bankUser,
                totalFee: paymentFee
            };
            console.log('params',params);
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + orderId + '/bankPayment';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newPaymentModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(orderManagerDetailAction.getOrderPaymentList(orderId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};