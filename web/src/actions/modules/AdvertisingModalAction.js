import {apiHost} from '../../config/HostConfig';
import {AdvertisingModalActionType} from "../../actionTypes";

const recommenderSettingDetailAction = require('../../actions/main/RecommenderSettingDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 广告语 初期
export const initAdvertisingModal = (recommendId, initAdvertisingModalData) => async (dispatch) => {
    // 推荐人ID
    dispatch({type: AdvertisingModalActionType.setRecommendId, payload: recommendId});
    // 广告语
    dispatch({type: AdvertisingModalActionType.setAdvertisement, payload: initAdvertisingModalData});
};

export const editAdvertisement = () => async (dispatch, getState) => {
    try {
        // 推荐人ID
        const recommendId = getState().AdvertisingModalReducer.recommendId;
        // 广告语
        const advertisement = getState().AdvertisingModalReducer.advertisement.trim();
        const params = {
            content: advertisement
        };

        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/recommend/' + recommendId + '/advertisement';
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            $('#advertisingModal').modal('close');
            swal("保存成功", "", "success");
            dispatch(recommenderSettingDetailAction.getRecommendInfo(recommendId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};