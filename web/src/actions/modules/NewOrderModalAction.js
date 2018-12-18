import {apiHost} from '../../config/HostConfig';

const orderManagerAction = require('../../actions/main/OrderManagerAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const saveOrder = () => async (dispatch, getState) => {
    try {
        // 起始城市
        const startCity = getState().NewOrderModalReducer.startCity;
        // 目的城市
        const endCity = getState().NewOrderModalReducer.endCity;
        // 服务方式
        const serviceType = getState().NewOrderModalReducer.serviceType;

        console.log('startCity',startCity);
        // console.log('startCity',startCity.length);
        // console.log('endCity',endCity);
        // console.log('serviceType',serviceType);

        if (startCity == null || startCity.value === undefined ) {
console.log('error')
        }
        // if (startCity == null || endCity == null || serviceType == null) {
        //     swal('保存失败', '请输入完整的订单信息！', 'warning');
        // } else {
        //     const params = {
        //         bank: startCity,
        //         bankCode: endCity,
        //         accountName: serviceType
        //     };
        //     // 基本url
        //     let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
        //         + '/supplier/' + supplierId + '/bank';
        //     let res = await httpUtil.httpPost(url, params);
        //     if (res.success === true) {
        //         $('#newOrderModal').modal('close');
        //         swal("保存成功", "", "success");
        //         // 保存成功后，重新检索画面数据
        //         dispatch(orderManagerAction.getOrderList());
        //     } else if (res.success === false) {
        //         swal('保存失败', res.msg, 'warning');
        //     }
        // }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};