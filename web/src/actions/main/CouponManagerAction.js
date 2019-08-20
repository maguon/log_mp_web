import {apiHost} from '../../config/HostConfig';
import {CouponManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserCouponList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().CouponManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().CouponManagerReducer.size;

        // 检索条件：编号
        const conditionNo = getState().CouponManagerReducer.conditionNo.trim();
        // 检索条件：优惠券编号
        const conditionCoupon = getState().CouponManagerReducer.conditionCouponNo;
        // 检索条件：发放人
        const conditionGrantUser = getState().CouponManagerReducer.conditionGrantUser.trim();
        // 检索条件：状态
        const conditionStatus = getState().CouponManagerReducer.conditionStatus;

        // 检索条件：用户ID
        const conditionUserId = getState().CouponManagerReducer.conditionUserId.trim();
        // 检索条件：用户昵称
        const conditionWeChatNm = getState().CouponManagerReducer.conditionWeChatNm.trim();
        // 检索条件：领取日期(始)
        const conditionCreatedOnStart = getState().CouponManagerReducer.conditionCreatedOnStart;
        // 检索条件：领取日期(终)
        const conditionCreatedOnEnd = getState().CouponManagerReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/userCoupon?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            userCouponId: conditionNo,
            // 检索条件：优惠券编号
            couponId: conditionCoupon === null ? '' : conditionCoupon.value,
            // 检索条件：发放人
            founderName: conditionGrantUser,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value,

            // 检索条件：用户ID
            userId: conditionUserId,
            // 检索条件：用户昵称
            userName: conditionWeChatNm,
            // 检索条件：领取日期(始)
            ReceiveDateStart: conditionCreatedOnStart,
            // 检索条件：领取日期(终)
            ReceiveDateEnd: conditionCreatedOnEnd

        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CouponManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: CouponManagerActionType.getUserCouponList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取优惠券领取列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 取得系统 优惠券列表
export const getCouponList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/coupon';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CouponManagerActionType.getCouponNoList, payload: res.result})
        } else if (res.success === false) {
            swal('获取优惠券信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};