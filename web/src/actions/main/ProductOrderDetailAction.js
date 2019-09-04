import {ProductOrderDetailActionType} from "../../actionTypes";
import {apiHost} from '../../config/HostConfig';

const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 取得订单详情基本信息
export const getProductOrderInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/productOrder?productOrderId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ProductOrderDetailActionType.getProductOrderInfo, payload: res.result});
            // 若 有数据
            if (res.result.length > 0) {
                dispatch({type: ProductOrderDetailActionType.setProductOrderRemark, payload: res.result[0].remark});
            }
        } else if (res.success === false) {
            swal('获取订单详情失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveProductOrderRemark = (id) => async (dispatch, getState) => {
    try {
        // 备注
        const orderRemark = getState().ProductOrderDetailReducer.orderRemark.trim();
        // 请求body
        const params = {
            remark: orderRemark
        };
        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/productOrder/' + id + '/remark';
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            swal("保存成功", "", "success");
            // 保存成功后，重新检索画面数据
            dispatch(getProductOrderInfo(id));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 修改订单状态
export const changeProductOrderStatus = (id, newStatus) => async (dispatch) => {
    try {
        let text = '';
        switch(newStatus) {
            case sysConst.PRODUCT_ORDER_STATUS[1].value:
                text = '确定该商品车已发货？';
                break;
            case sysConst.PRODUCT_ORDER_STATUS[3].value:
                text = '确定该商品车已送达？';
                break;
            case sysConst.PRODUCT_ORDER_STATUS[2].value:
                text = '确定取消该订单？';
                break;
            default:
                text = '';
        }

        swal({
            title: text,
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#724278',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(async function (isConfirm) {
            if (isConfirm && isConfirm.value === true) {
                // 基本检索URL
                const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                    + '/productOrder/' + id + '/status/' + newStatus;
                const res = await httpUtil.httpPut(url);
                if (res.success === true) {
                    dispatch(getProductOrderInfo(id));
                } else if (res.success === false) {
                    swal('修改订单状态失败', res.msg, 'warning');
                }
            }
        });
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};