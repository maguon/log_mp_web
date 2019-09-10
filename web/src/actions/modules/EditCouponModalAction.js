import {apiHost} from '../../config/HostConfig';
import {EditCouponModalActionType} from "../../actionTypes";

const couponSettingAction = require('../../actions/main/CouponSettingAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 修改账户信息画面 初期
export const initEditCouponModal = (type, coupon) => async (dispatch) => {
    if (type === 'new') {
        // 优惠券ID
        dispatch({type: EditCouponModalActionType.setCouponId, payload: ''});
        // 优惠券状态
        dispatch({type: EditCouponModalActionType.setCouponStatus, payload: ''});
        // 优惠券名称
        dispatch({type: EditCouponModalActionType.setCouponName, payload: ''});
        // 优惠券金额
        dispatch({type: EditCouponModalActionType.setCouponAmount, payload: ''});
        // 门槛
        dispatch({type: EditCouponModalActionType.setCouponThreshold, payload: ''});

        // 有效期类型
        dispatch({type: EditCouponModalActionType.setValidityPeriodType, payload: {value: 0, label: '天数'}});
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
        dispatch({type: EditCouponModalActionType.setCouponId, payload: coupon.id});
        // 优惠券状态
        dispatch({type: EditCouponModalActionType.setCouponStatus, payload: coupon.status});
        // 优惠券名称
        dispatch({type: EditCouponModalActionType.setCouponName, payload: coupon.coupon_name});
        // 优惠券金额
        dispatch({type: EditCouponModalActionType.setCouponAmount, payload: coupon.price});
        // 门槛
        dispatch({type: EditCouponModalActionType.setCouponThreshold, payload: coupon.floor_price});

        // 有效期类型
        dispatch({type: EditCouponModalActionType.setValidityPeriodType, payload: {value: coupon.coupon_type, label: sysConst.VALIDITY_PERIOD_TYPE[coupon.coupon_type].label}});
        // 有效期天数
        dispatch({type: EditCouponModalActionType.setEffectiveDays, payload: coupon.effective_days});
        // 有效日期(始)
        dispatch({type: EditCouponModalActionType.setValidityPeriodStart, payload: coupon.start_date});
        // 有效日期(终)
        dispatch({type: EditCouponModalActionType.setValidityPeriodEnd, payload: coupon.end_date});
        // 备注
        dispatch({type: EditCouponModalActionType.setRemark, payload: coupon.remarks});

        // 取得 优惠券 使用/领取 统计
        dispatch(getCouponStatistics(coupon.id));
    }
};

export const getCouponStatistics = (couponId) => async (dispatch, getState) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/coupon/' + couponId + '/count';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: EditCouponModalActionType.setReceiveNum, payload: res.result.receiveNum});
            dispatch({type: EditCouponModalActionType.setUseNum, payload: res.result.useNum});
        } else if (res.success === false) {
            dispatch({type: EditCouponModalActionType.setReceiveNum, payload: 0});
            dispatch({type: EditCouponModalActionType.setUseNum, payload: 0});
            swal('获取优惠券使用，领取信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveCoupon = () => async (dispatch, getState) => {
    try {
        // 优惠券编号
        const couponId = getState().EditCouponModalReducer.couponId;

        // 优惠券名称
        const couponName = getState().EditCouponModalReducer.couponName.trim();
        // 优惠券金额
        const couponAmount = getState().EditCouponModalReducer.couponAmount;
        // 门槛
        const threshold = getState().EditCouponModalReducer.threshold;

        // 有效期类型
        const validityPeriodType = getState().EditCouponModalReducer.validityPeriodType;
        // 有效期天数
        const effectiveDays = getState().EditCouponModalReducer.effectiveDays;
        // 有效日期(始)
        const validityPeriodStart = getState().EditCouponModalReducer.validityPeriodStart;
        // 有效日期(终)
        const validityPeriodEnd = getState().EditCouponModalReducer.validityPeriodEnd;
        // 备注
        const remark = getState().EditCouponModalReducer.remark.trim();

        if (couponName === '' || couponAmount === '' || threshold === '') {
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
                        couponName: couponName,
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
                        couponName: couponName,
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
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/coupon';
            let res = null;
            // 新建时
            if (couponId === '') {
                res = await httpUtil.httpPost(url, params);
            } else {
                // 编辑时
                url = url + '/' + couponId;
                res = await httpUtil.httpPut(url, params);
            }
            if (res.success === true) {
                $('#editCouponModal').modal('close');
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