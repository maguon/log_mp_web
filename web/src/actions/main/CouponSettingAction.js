import {apiHost} from '../../config/HostConfig';
import {CouponSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getCouponList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().CouponSettingReducer.start;
        // 检索条件：每页数量
        const size = getState().CouponSettingReducer.size;

        // 检索条件：编号
        const conditionNo = getState().CouponSettingReducer.conditionNo.trim();
        // 检索条件：状态
        const conditionStatus = getState().CouponSettingReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/coupon?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            adminId: conditionNo,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CouponSettingActionType.setDataSize, payload: res.result.length});
            dispatch({type: CouponSettingActionType.getCouponList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取优惠券列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeCouponStatus = (id, status) => async (dispatch) => {
    swal({
        title: status === 0 ? "确定启用该优惠券？" : "确定停用该优惠券？",
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
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/coupon/' + id + '/status/' + newStatus;
            const res = await httpUtil.httpPut(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getCouponList());
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

export const deleteCoupon = (id) => async (dispatch) => {
    try {
        swal({
            title: "确定删除该优惠券？",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本检索URL
                const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/coupon/' + id;
                const res = await httpUtil.httpDelete(url);
                if (res.success === true) {
                    dispatch(getCouponList());
                } else if (res.success === false) {
                    swal('删除优惠券失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};