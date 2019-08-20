import {apiHost} from '../../config/HostConfig';
import {EditUserCouponModalActionType} from "../../actionTypes";

const couponManagerAction = require('../../actions/main/CouponManagerAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 修改账户信息画面 初期
export const initEditUserCouponModal = (type, userCoupon) => async (dispatch) => {
    if (type === 'new') {
        // 领取优惠券ID
        dispatch({type: EditUserCouponModalActionType.setUserCouponId, payload: ''});

        // 接收人手机号
        dispatch({type: EditUserCouponModalActionType.setUserPhone, payload: ''});
        // 是否有用户信息
        dispatch({type: EditUserCouponModalActionType.setHasUser, payload: false});
        // 用户信息
        dispatch({type: EditUserCouponModalActionType.setUserInfo, payload: []});

        // 优惠券金额
        dispatch({type: EditUserCouponModalActionType.setCouponAmount, payload: ''});
        // 门槛
        dispatch({type: EditUserCouponModalActionType.setCouponThreshold, payload: ''});

        // 有效期类型
        dispatch({type: EditUserCouponModalActionType.setValidityPeriodType, payload: {value: 0, label: '天数'}});
        // 有效期天数
        dispatch({type: EditUserCouponModalActionType.setEffectiveDays, payload: ''});
        // 有效日期(始)
        dispatch({type: EditUserCouponModalActionType.setValidityPeriodStart, payload: ''});
        // 有效日期(终)
        dispatch({type: EditUserCouponModalActionType.setValidityPeriodEnd, payload: ''});
        // 备注
        dispatch({type: EditUserCouponModalActionType.setRemark, payload: ''});
    } else {
        // 领取优惠券ID
        dispatch({type: EditUserCouponModalActionType.setUserCouponId, payload: userCoupon.id});
        // 领取优惠券信息
        dispatch({type: EditUserCouponModalActionType.setUserCouponInfo, payload: userCoupon});
    }
};

export const addCouponUser = () => async (dispatch, getState) => {
    try {
        // 接收人手机号
        const userPhone = getState().EditUserCouponModalReducer.userPhone;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/user?phone=' + userPhone;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: EditUserCouponModalActionType.setUserInfo, payload: res.result});
            } else {
                swal('查无此人，请重新输入', res.msg, 'warning');
            }
        } else if (res.success === false) {
            swal('获取用户信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveCoupon = () => async (dispatch, getState) => {
    try {
        // 用户信息
        const userInfo = getState().EditUserCouponModalReducer.userInfo;
        // 优惠券金额
        const couponAmount = getState().EditUserCouponModalReducer.couponAmount;
        // 门槛
        const threshold = getState().EditUserCouponModalReducer.threshold;
        // 有效期类型
        const validityPeriodType = getState().EditUserCouponModalReducer.validityPeriodType;
        // 有效期天数
        const effectiveDays = getState().EditUserCouponModalReducer.effectiveDays;
        // 有效日期(始)
        const validityPeriodStart = getState().EditUserCouponModalReducer.validityPeriodStart;
        // 有效日期(终)
        const validityPeriodEnd = getState().EditUserCouponModalReducer.validityPeriodEnd;
        // 备注
        const remark = getState().EditUserCouponModalReducer.remark.trim();

        if (userInfo.length === 0 || couponAmount === '' || threshold === '') {
            swal('保存失败', '请输入完整的优惠券信息！', 'warning');
        } else {
            let params = {};
            // 有效期类型：天数
            if (validityPeriodType.value === sysConst.VALIDITY_PERIOD_TYPE[0].value) {
                if (effectiveDays === '' || effectiveDays <= 0) {
                    swal('保存失败', '优惠券天数请输入大于0的整数！', 'warning');
                    return;
                } else {
                    params = {
                        couponName: sysConst.DEFAULT_USER_COUPON[0].label,
                        couponType: validityPeriodType.value,
                        effectiveDays: effectiveDays,
                        floorPrice: threshold,
                        price: couponAmount,
                        remarks: remark
                    };
                }
            } else if (validityPeriodType.value === sysConst.VALIDITY_PERIOD_TYPE[1].value) {
                if (validityPeriodStart === '' || validityPeriodEnd === '') {
                    swal('保存失败', '请输入完整的优惠券有效日期！', 'warning');
                    return;
                } else {
                    params = {
                        couponName: sysConst.DEFAULT_USER_COUPON[0].label,
                        couponType: validityPeriodType.value,
                        startDate: validityPeriodStart,
                        endDate: validityPeriodEnd,
                        floorPrice: threshold,
                        price: couponAmount,
                        remarks: remark
                    };
                }
            }

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/user/' + userInfo[0].id + '/userCoupon';
            let res = null;

            // 新建时
            res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#editUserCouponModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(couponManagerAction.getUserCouponList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};