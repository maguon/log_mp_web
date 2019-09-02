import {apiHost} from '../../config/HostConfig';
import {EditProductRemindModalActionType} from "../../actionTypes";

const productRemindAction = require('../../actions/main/ProductRemindAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 修改提醒 初期化
export const initEditProductRemindModal = (id, remark) => async (dispatch) => {
    // 商品提醒id
    dispatch({type: EditProductRemindModalActionType.setProductRemindId, payload: id});
    // 商品提醒内容
    dispatch({type: EditProductRemindModalActionType.setProductRemindRemark, payload: remark});
};

export const saveProductRemind = () => async (dispatch, getState) => {
    try {
        // 商品提醒id
        const productRemindId = getState().EditProductRemindModalReducer.productRemindId;
        // 商品提醒内容
        const remark = getState().EditProductRemindModalReducer.remark.trim();

        const params = {
            remarks: remark,
            status: sysConst.PRODUCT_REMIND_FLAG[1].value
        };
        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/reminders/' + productRemindId + '/';
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            $('#editProductRemindModal').modal('close');
            swal("保存成功", "", "success");
            // 保存成功后，重新检索画面数据
            dispatch(productRemindAction.getProductRemindList());
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};