import {apiHost} from '../../config/HostConfig';
import {UserManagerDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL TODO
        // const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/user?userId=' + id;
        const url = apiHost + '/api/user?userId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.getUserInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取用户信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};



export const getUserInquiryList = (userId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerDetailReducer.msgStart;
        // 检索条件：每页数量
        const size = getState().UserManagerDetailReducer.msgSize;

        // 检索条件：消息类型
        const conditionMsgType = getState().UserManagerDetailReducer.msgConditionType;
        // 检索条件：发送时间
        const conditionStartDate = getState().UserManagerDetailReducer.msgConditionStartDate;
        const conditionEndDate = getState().UserManagerDetailReducer.msgConditionEndDate;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/getMessage?start=' + start + '&size=' + size + '&userId=' + userId;

        // 检索条件
        let conditionsObj = {
            // 检索条件：消息类型
            type: conditionMsgType === null ? '' : conditionMsgType.value,
            // 检索条件：发送时间
            createdStartOn: conditionStartDate,
            createdEndOn: conditionEndDate
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.setMsgDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getMessageList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取消息列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getLoginInfoList = (userId) => async (dispatch) => {
    try {
        // // 基本检索URL
        // let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
        //     + '/userCar?userId=' + userId;
        // const res = await httpUtil.httpGet(url);
        // if (res.success === true) {
        //     dispatch({type: UserManagerDetailActionType.getUserCarList, payload: res.result});
        // } else if (res.success === false) {
        //     swal('获取车辆列表信息失败', res.msg, 'warning');
        // }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getBankCardList = (userId) => async (dispatch) => {
    try {
        // // 基本检索URL
        // let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
        //     + '/order?userId=' + userId;
        // const res = await httpUtil.httpGet(url);
        // if (res.success === true) {
        //     dispatch({type: UserManagerDetailActionType.getOrderList, payload: res.result});
        // } else if (res.success === false) {
        //     swal('获取交易记录列表信息失败', res.msg, 'warning');
        // }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// export const getOrderDetail = (userId, orderId) => async (dispatch) => {
//     try {
//         // 基本检索URL
//         let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
//             + '/orderItem?userId=' + userId + '&orderId=' + orderId;
//         const res = await httpUtil.httpGet(url);
//         if (res.success === true) {
//             dispatch({type: UserManagerDetailActionType.getProductList, payload: res.result});
//         } else if (res.success === false) {
//             swal('获取交易记录信息失败', res.msg, 'warning');
//         }
//     } catch (err) {
//         swal('操作失败', err.message, 'error');
//     }
// };

export const getInvoiceList = (userId) => async (dispatch) => {
    try {
        // // 基本检索URL
        // let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
        //     + '/userShipAddress?userId=' + userId;
        // const res = await httpUtil.httpGet(url);
        // if (res.success === true) {
        //     dispatch({type: UserManagerDetailActionType.getAddressList, payload: res.result});
        // } else if (res.success === false) {
        //     swal('获取收货地址列表信息失败', res.msg, 'warning');
        // }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};