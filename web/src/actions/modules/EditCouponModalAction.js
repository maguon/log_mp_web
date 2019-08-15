import {apiHost} from '../../config/HostConfig';
import {CouponSettingActionType, EditCouponModalActionType} from "../../actionTypes";
import {getCouponList} from "../main/CouponSettingAction";

const couponSettingAction = require('../../actions/main/CouponSettingAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 修改账户信息画面 初期
export const initEditCouponModal = (type, companyBankInfo) => async (dispatch) => {
    if (type === 'new') {
        // 优惠券ID
        dispatch({type: EditCouponModalActionType.setCouponId, payload: ''});
        // 优惠券名称
        dispatch({type: EditCouponModalActionType.setCouponName, payload: ''});
        // 优惠券金额
        dispatch({type: EditCouponModalActionType.setCouponAmount, payload: ''});
        // 门槛
        dispatch({type: EditCouponModalActionType.setCouponThreshold, payload: ''});

        // 有效期类型
        dispatch({type: EditCouponModalActionType.setValidityPeriodType, payload: {value: 1, label: '天数'}});
        // 有效期天数
        dispatch({type: EditCouponModalActionType.setEffectiveDays, payload: ''});
        // 有效日期(始)
        dispatch({type: EditCouponModalActionType.setValidityPeriodStart, payload: ''});
        // 有效日期(终)
        dispatch({type: EditCouponModalActionType.setValidityPeriodEnd, payload: ''});
        // 备注
        dispatch({type: EditCouponModalActionType.setRemark, payload: ''});
    } else {
        // 优惠券ID
        dispatch({type: EditCouponModalActionType.setCouponId, payload: '1111'});
        // 优惠券名称
        dispatch({type: EditCouponModalActionType.setCouponName, payload: ''});
        // 优惠券金额
        dispatch({type: EditCouponModalActionType.setCouponAmount, payload: ''});
        // 门槛
        dispatch({type: EditCouponModalActionType.setCouponThreshold, payload: ''});

        // 有效期类型
        dispatch({type: EditCouponModalActionType.setValidityPeriodType, payload: {value: 2, label: '有效日期'}});
        // 有效期天数
        dispatch({type: EditCouponModalActionType.setEffectiveDays, payload: ''});
        // 有效日期(始)
        dispatch({type: EditCouponModalActionType.setValidityPeriodStart, payload: ''});
        // 有效日期(终)
        dispatch({type: EditCouponModalActionType.setValidityPeriodEnd, payload: ''});
        // 备注
        dispatch({type: EditCouponModalActionType.setRemark, payload: ''});
    }
};

export const saveCompanyBank = () => async (dispatch, getState) => {
    try {
        // 银行ID
        const companyBankId = getState().EditCouponModalReducer.companyBankId;
        // 银行名称
        const companyBank = getState().EditCouponModalReducer.companyBank.trim();
        // 卡号
        const companyBankCode = getState().EditCouponModalReducer.companyBankCode.trim();
        // 收款人
        const companyBankUser = getState().EditCouponModalReducer.companyBankUser.trim();

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
                dispatch(couponSettingAction.getCouponList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addCompanyBank = () => async (dispatch, getState) => {
    try {
        // 银行
        const companyBank = getState().CouponSettingReducer.companyBank.trim();
        // 卡号
        const companyBankCode = getState().CouponSettingReducer.companyBankCode.trim();
        // 收款人
        const companyBankUser = getState().CouponSettingReducer.companyBankUser.trim();

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
                dispatch({type: CouponSettingActionType.setCompanyBank, payload: ''});
                dispatch({type: CouponSettingActionType.setCompanyBankCode, payload: ''});
                dispatch({type: CouponSettingActionType.setCompanyBankUser, payload: ''});
                // 保存成功后，重新检索画面数据
                dispatch(getCouponList());
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};