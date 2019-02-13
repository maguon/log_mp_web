import {apiHost} from '../../config/HostConfig';
import {EditLogAddressModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 收发货地址画面 初期
export const initEditLogAddressModal = (orderId, startCity, endCity, startCityId, endCityId) => async (dispatch) => {
    // 订单ID
    dispatch({type: EditLogAddressModalActionType.setOrderId, payload: orderId});

    // 发货城市
    dispatch({type: EditLogAddressModalActionType.setSendCity, payload: startCity});
    // 发货地址列表
    dispatch(getLogSiteList('send', startCityId));

    // 收货城市
    dispatch({type: EditLogAddressModalActionType.setRecvCity, payload: endCity});
    // 收货地址列表
    dispatch(getLogSiteList('receive', endCityId));

    // 发货地址 / 收货地址 （订单信息）
    dispatch(getOrderInfo(orderId));
};

// 检索订单基本信息
export const getOrderInfo = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 发货地址
                if (res.result[0].send_address_point_id != null) {
                    dispatch({type: EditLogAddressModalActionType.setSendAddress, payload: {value: res.result[0].send_address_point_id, label: res.result[0].send_address_point}});
                } else {
                    dispatch({type: EditLogAddressModalActionType.setSendAddress, payload: null});
                }
                // 收货地址
                if (res.result[0].recv_address_point_id != null) {
                    dispatch({type: EditLogAddressModalActionType.setRecvAddress, payload: {value: res.result[0].recv_address_point_id, label: res.result[0].recv_address_point}});
                } else {
                    dispatch({type: EditLogAddressModalActionType.setRecvAddress, payload: null});
                }
            }
        } else if (res.success === false) {
            swal('获取订单详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getLogSiteList = (flag, cityId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/address?city=' + cityId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (flag === 'send') {
                dispatch({type: EditLogAddressModalActionType.getSendAddressList, payload: res.result})
            } else {
                dispatch({type: EditLogAddressModalActionType.getRecvAddressList, payload: res.result})
            }
        } else if (res.success === false) {
            swal('获取收发货地址列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveLogAddress = () => async (dispatch, getState) => {
    try {
        // 订单ID
        const orderId = getState().EditLogAddressModalReducer.orderId;
        // 发货地址
        const sendAddress = getState().EditLogAddressModalReducer.sendAddress;
        // 收货地址
        const recvAddress = getState().EditLogAddressModalReducer.recvAddress;

        if (sendAddress == null || recvAddress == null) {
            swal('保存失败', '请输入完整的地址信息！', 'warning');
        } else {
            const params = {
                "sendAddressPointId": sendAddress.value,
                "sendAddressPoint": sendAddress.label,
                "recvAddressPointId": recvAddress.value,
                "recvAddressPoint": recvAddress.label
            };

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + orderId + '/selfMentionAddress';
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
                $('#editLogAddressModal').modal('close');
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};