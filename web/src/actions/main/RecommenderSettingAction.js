import {apiHost} from '../../config/HostConfig';
import {RecommenderSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getRecommendList = () => async (dispatch, getState) => {
    try {
        // 检索条件：推荐人编号
        const recommendId = getState().RecommenderSettingReducer.recommendId.trim();
        // 检索条件：推荐人
        const recommendName = getState().RecommenderSettingReducer.recommendName.trim();

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/recommend?1=1';

        // 检索条件
        let conditionsObj = {
            // 检索条件：推荐人编号
            recommendId: recommendId,
            // 检索条件：推荐人
            name: recommendName
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: RecommenderSettingActionType.getRecommendList, payload: res.result});
        } else if (res.success === false) {
            swal('获取推荐人列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};