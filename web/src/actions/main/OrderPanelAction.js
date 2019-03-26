import {apiHost} from '../../config/HostConfig';
import {OrderPanelActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUnConsultOrderCount = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/unConsultOrderCount';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 待协商订单
            dispatch({type: OrderPanelActionType.setUnConsultOrderCount, payload: res.result})
        } else if (res.success === false) {
            swal('获取待协商订单数失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getStatisticsOrder = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/statisticsOrder';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 待完善信息订单
                dispatch({type: OrderPanelActionType.setMsgImproved, payload: res.result[0].msg_improved});
                // 待完善价格订单
                dispatch({type: OrderPanelActionType.setPriceImproved, payload: res.result[0].price_improved});

                // 待生成需求订单
                dispatch({type: OrderPanelActionType.setUnGenerated, payload: res.result[0].ungenerated});
                // 待执行订单
                dispatch({type: OrderPanelActionType.setUnExecuted, payload: res.result[0].unexecuted});
                // 执行中订单
                dispatch({type: OrderPanelActionType.setInExecution, payload: res.result[0].inexecution});

                // 待安排需求
                dispatch({type: OrderPanelActionType.setArrange, payload: res.result[0].arrange});
                // 安排中需求
                dispatch({type: OrderPanelActionType.setArranging, payload: res.result[0].arrangeing});
                // 待发运车辆
                dispatch({type: OrderPanelActionType.setNoLoadCarCount, payload: res.result[0].noload_car_count});
                // 运输中车辆
                dispatch({type: OrderPanelActionType.setLoadingCarCount, payload: res.result[0].loading_car_count});
            }
        } else if (res.success === false) {
            swal('获取订单统计数据失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};