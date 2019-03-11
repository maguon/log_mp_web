import {apiHost} from '../../config/HostConfig';
import {CompanyBankSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getCompanyBankList = () => async (dispatch, getState) => {
    try {
        // 检索
        const res = await httpUtil.httpGet(apiHost + '/api/companyBank');
        if (res.success === true) {
            dispatch({type: CompanyBankSettingActionType.getCompanyBankList, payload: res.result})
        } else if (res.success === false) {
            swal('获取收款账户列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addCompanyBank = () => async (dispatch, getState) => {
    try {
        // 银行
        const companyBank = getState().CompanyBankSettingReducer.companyBank.trim();
        // 卡号
        const companyBankCode = getState().CompanyBankSettingReducer.companyBankCode.trim();
        // 收款人
        const companyBankUser = getState().CompanyBankSettingReducer.companyBankUser.trim();

        if (companyBank === '' || companyBankCode === '' || companyBankUser === '') {
            swal('添加失败', '请输入完整的收款账户信息！', 'warning');
        } else {
            const params = {
                bank: companyBank,
                bankCode: companyBankCode,
                accountName: companyBankUser
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/companyBank';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                swal("添加成功", "", "success");
                // 清空输入内容
                dispatch({type: CompanyBankSettingActionType.setCompanyBank, payload: ''});
                dispatch({type: CompanyBankSettingActionType.setCompanyBankCode, payload: ''});
                dispatch({type: CompanyBankSettingActionType.setCompanyBankUser, payload: ''});
                // 保存成功后，重新检索画面数据
                dispatch(getCompanyBankList());
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeCompanyBankStatus = (id, status) => async (dispatch) => {
    swal({
        title: status === 0 ? "确定停用该账户？" : "确定启用该账户？",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            // 状态
            let newStatus = 0;
            if (status === 0) {
                newStatus = 1
            } else {
                newStatus = 0
            }
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/companyBank/' + id + '/status/' + newStatus;
            const res = await httpUtil.httpPut(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getCompanyBankList());
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};