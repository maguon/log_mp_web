import {apiHost} from '../../config/HostConfig';
import {NewInvoiceModalActionType} from "../../actionTypes";

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const invoiceApplyManagerAction = require('../../actions/main/InvoiceApplyManagerAction');
const invoiceApplyManagerDetailAction = require('../../actions/main/InvoiceApplyManagerDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 支付模态画面 初期
export const initNewInvoiceModal = (prePage, orderId, invoiceApplyInfo) => async (dispatch) => {
    // 前画面 标记
    dispatch({type: NewInvoiceModalActionType.setPrePage, payload: prePage});
    // 订单编号
    dispatch({type: NewInvoiceModalActionType.setOrderId, payload: orderId});

    if (prePage === 'invoiceApplyDetail') {
        // 发票申请编号
        dispatch({type: NewInvoiceModalActionType.setInvoiceApplyId, payload: invoiceApplyInfo.invoice_apply_id});
        // 发票抬头
        dispatch({type: NewInvoiceModalActionType.setInvoiceTitle, payload: invoiceApplyInfo.title});
        // 税号
        dispatch({type: NewInvoiceModalActionType.setCompanyTax, payload: invoiceApplyInfo.tax_number});
        // 电话号码
        dispatch({type: NewInvoiceModalActionType.setCompanyPhone, payload: invoiceApplyInfo.company_phone});
        // 开户银行
        dispatch({type: NewInvoiceModalActionType.setBank, payload: invoiceApplyInfo.bank});
        // 银行账号
        dispatch({type: NewInvoiceModalActionType.setBankNum, payload: invoiceApplyInfo.bank_code});
        // 单位地址
        dispatch({type: NewInvoiceModalActionType.setCompanyAddress, payload: invoiceApplyInfo.company_address});
        // 备注
        dispatch({type: NewInvoiceModalActionType.setRemark, payload: invoiceApplyInfo.remark});
    } else {
        // 发票申请编号
        dispatch({type: NewInvoiceModalActionType.setInvoiceApplyId, payload: ''});
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
    }
};

export const saveInvoice = () => async (dispatch, getState) => {
    try {
        // 前画面区分
        const prePage = getState().NewInvoiceModalReducer.prePage;

        // 发票申请编号
        const invoiceApplyId = getState().NewInvoiceModalReducer.invoiceApplyId;
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

        if (invoiceTitle === '' || companyTax === '') {
            swal('保存失败', '请输入完整的开票信息！', 'warning');
        } else {
            const params = {
                title: invoiceTitle,
                taxNumber: companyTax,
                bank: bank,
                bankCode: bankNum,
                companyPhone: companyPhone,
                companyAddress: companyAddress,
                remark: remark
            };
            console.log('params',params);

            // 基本url
            let url = '';
            let res = null;
            // 编辑时
            if (invoiceApplyId === '') {
                // 新建时
                url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/order/' + orderId + '/invoiceApply';
                res = await httpUtil.httpPost(url, params);
            } else {
                url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/controlInvoices/' + invoiceApplyId + '/updateInvoiceMsg';
                res = await httpUtil.httpPut(url, params);
            }

            if (res.success === true) {
                $('#newInvoiceModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                if (prePage === 'invoiceApply') {
                    dispatch(invoiceApplyManagerAction.getOrderList());
                } else if (prePage === 'invoiceApplyDetail') {
                    dispatch(invoiceApplyManagerDetailAction.getInvoiceApplyInfo(invoiceApplyId));
                } else if (prePage === 'orderManagerDetail') {
                    dispatch(orderManagerDetailAction.getOrderPaymentList(orderId));
                }
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};