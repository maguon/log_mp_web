import {apiHost} from '../../config/HostConfig';
import {OrderManagerDetailActionType} from '../../actionTypes';

const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getOrderInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?orderId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: OrderManagerDetailActionType.getOrderInfo, payload: res.result});
            if (res.result.length > 0) {
                dispatch({type: OrderManagerDetailActionType.setOrderRemark, payload: res.result[0].admin_mark});
            }
        } else if (res.success === false) {
            swal('获取订单信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveOrderRemark = (id) => async (dispatch, getState) => {
    try {
        const orderRemark = getState().OrderManagerDetailReducer.orderRemark;

        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order/' + id + '/adminMark';
        const params = {
            adminMark: orderRemark
        };
        const res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            swal("保存成功", "", "success");
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeOrderStatus = (orderId, status) => async (dispatch) => {
    let tipsTitle;
    let tipsText = '';
    switch (status) {
        // 更改为 待完善信息 状态
        case sysConst.ORDER_STATUS[0].value:
            tipsTitle = '确定要回到待完善信息？';
            break;

        // 更改为 待完善价格 状态
        case sysConst.ORDER_STATUS[1].value:
            tipsTitle = '确定要重新完善价格？';
            break;

        // 更改为 未生成需求 状态
        case sysConst.ORDER_STATUS[2].value:
            tipsTitle = '确定要完善价格？';
            break;

        // 更改为 待安排车辆 状态
        case sysConst.ORDER_STATUS[3].value:
            tipsTitle = '确定要生成运输需求？';
            tipsText = '运输需求生成后，订单将进入待安排车辆状态，车辆信息将不可再修改！';
            break;
        default:
            tipsText = '';
    }

    swal({
        title: tipsTitle,
        text: tipsText,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#724278',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + orderId  + '/status/' + status;
            const res = await httpUtil.httpPut(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getOrderInfo(orderId));
                dispatch(commonAction.getOrderCarList(orderId));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};





