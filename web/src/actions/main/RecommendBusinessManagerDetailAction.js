import {apiHost} from '../../config/HostConfig';
import {RecommendBusinessManagerDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getRecommendInfo = (recommendId) => async (dispatch, getState) => {
    try {
        // 检索条件：选择时间
        const conditionCreatedOnStart = getState().RecommendBusinessManagerDetailReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().RecommendBusinessManagerDetailReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/achievement?recommendId=' + recommendId;
        // 检索条件
        let conditionsObj = {
            // 检索条件：推荐时间
            recommendOnStart: conditionCreatedOnStart,
            recommendOnEnd: conditionCreatedOnEnd
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: RecommendBusinessManagerDetailActionType.getRecommendInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取推广人基本信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getUserList = (recommendId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().RecommendBusinessManagerDetailReducer.detailStart;
        // 检索条件：每页数量
        const size = getState().RecommendBusinessManagerDetailReducer.detailSize;
        // 检索条件：选择时间
        const conditionCreatedOnStart = getState().RecommendBusinessManagerDetailReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().RecommendBusinessManagerDetailReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/user?start=' + start + '&size=' + size + '&recommendId=' + recommendId;

        // 检索条件
        let conditionsObj = {
            // 检索条件：创建时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: RecommendBusinessManagerDetailActionType.setDetailDataSize, payload: res.result.length});
            dispatch({type: RecommendBusinessManagerDetailActionType.getUserList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};