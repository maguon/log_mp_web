import {OrderPaymentDetailModalActionType} from "../../actionTypes";

const commonAction = require('../../actions/main/CommonAction');

// 线路安排 初期
export const initOrderPaymentDetailModal = (orderId) => async (dispatch) => {
    // 订单编号
    dispatch({type: OrderPaymentDetailModalActionType.setOrderId, payload: orderId});
    // 检索订单 车辆列表
    dispatch(commonAction.getOrderCarList(orderId));
    // 检索订单 支付信息列表(已支付)
    dispatch(commonAction.getOrderPaymentList(orderId));
};

// 检索订单 车辆列表
export const getOrderCarList = () => async (dispatch, getState) => {
    dispatch(commonAction.getOrderCarList(getState().OrderPaymentDetailModalReducer.orderId));
};

// 检索订单 支付信息列表(已支付)
export const getPaymentList = () => async (dispatch, getState) => {
    dispatch(commonAction.getOrderPaymentList(getState().OrderPaymentDetailModalReducer.orderId));
};