import {apiHost} from '../../config/HostConfig';
import {RecommendBusinessManagerActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getRecommendBusinessList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().RecommendBusinessManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().RecommendBusinessManagerReducer.size;

        // 检索条件：推荐人编号
        const conditionRecommendId = getState().RecommendBusinessManagerReducer.conditionRecommendId;
        // 检索条件：推荐人
        const conditionRecommendName = getState().RecommendBusinessManagerReducer.conditionRecommendName;
        // 检索条件：推荐时间
        const conditionRecommendOnStart = getState().RecommendBusinessManagerReducer.conditionRecommendOnStart;
        const conditionRecommendOnEnd = getState().RecommendBusinessManagerReducer.conditionRecommendOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/achievement?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：推荐人编号
            recommendId: conditionRecommendId,
            // 检索条件：推荐人
            recommendName: conditionRecommendName,
            // 检索条件：推荐时间
            recommendOnStart: conditionRecommendOnStart,
            recommendOnEnd: conditionRecommendOnEnd
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: RecommendBusinessManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: RecommendBusinessManagerActionType.getRecommendBusinessList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取推广业绩列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};