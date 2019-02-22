import {apiHost} from '../../config/HostConfig';
import {NewRecommenderModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// 新增推荐人 初期
export const initNewReCommendModal = () => async (dispatch) => {
    // 推荐人名称
    dispatch({type: NewRecommenderModalActionType.setCommendName, payload: ''});
    // 推荐人简介
    dispatch({type: NewRecommenderModalActionType.setCommendIntroduction, payload: ''});
};

export const addReCommend = () => async (dispatch, getState) => {
    try {
        // 推荐人名称
        const recommendName = getState().NewRecommenderModalReducer.recommendName.trim();
        // 推荐人简介
        const introduction = getState().NewRecommenderModalReducer.introduction.trim();

        if (recommendName === '') {
            swal('保存失败', '请输入推荐人名称！', 'warning');
        } else {
            const params = {
                name: recommendName,
                introduction: introduction
            };

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/recommend';
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newReCommendModal').modal('close');
                swal("保存成功", "", "success");
                dispatch({type: NewRecommenderModalActionType.setNewRecommendId, payload: res.id});
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};