import {apiHost} from '../../config/HostConfig';

const orderManagerDetailAction = require('../../actions/main/OrderManagerDetailAction');
const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const saveOrderUserAddress = () => async (dispatch, getState) => {
    try {
        // 订单ID
        const orderId = getState().EditUserAddressModalReducer.orderId;
        // 画面区分
        const pageType = getState().EditUserAddressModalReducer.pageType;
        // 用户
        const orderUser = getState().EditUserAddressModalReducer.orderUser.trim();
        // 电话
        const orderPhone = getState().EditUserAddressModalReducer.orderPhone.trim();
        // 地址
        const orderAddress = getState().EditUserAddressModalReducer.orderAddress.trim();

        if (orderUser === '' || orderPhone === '' || orderAddress === '') {
            swal('保存失败', '请输入完整的收发货信息！', 'warning');
        } else {
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/order/' + orderId;

            // 参数
            let params;
            // 收货
            if (pageType === 'receive') {
                url = url + '/receiveInfo';
                params = {
                    recvName: orderUser,
                    recvPhone: orderPhone,
                    recvAddress: orderAddress
                };
            } else {
                url = url + '/sendInfo';
                params = {
                    sendName: orderUser,
                    sendPhone: orderPhone,
                    sendAddress: orderAddress
                };
            }
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                $('#editUserAddressModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(orderManagerDetailAction.getOrderInfo(orderId));
                dispatch(commonAction.getOrderCarList(orderId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};