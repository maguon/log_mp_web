import {apiHost} from '../../config/HostConfig';
import {CommonActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getCityList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/city';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getCityList, payload: res.result})
        } else if (res.success === false) {
            swal('获取城市信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderCarList = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/orderItem?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getOrderCarList, payload: res.result});
            // 实际运费
            let totalActFreight = 0;
            // 估值
            let totalValuation = 0;
            res.result.forEach((item) => {
                totalActFreight = totalActFreight + item.act_price;
                totalValuation = totalValuation + item.valuation;
            });
            dispatch({type: CommonActionType.setTotalActFreight, payload: totalActFreight});
            dispatch({type: CommonActionType.setTotalValuation, payload: totalValuation});
        } else if (res.success === false) {
            swal('获取订单车辆详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};