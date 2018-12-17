import {apiHost} from '../../config/HostConfig';
import {LogSiteSettingActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getLogSiteSettingList = () => async (dispatch, getState) => {
    try {
        // 检索条件：收发货地点名称
        const conditionLogSiteName = getState().LogSiteSettingReducer.conditionLogSiteName.trim();
        // 检索条件：所在城市
        const conditionLogSiteCity = getState().LogSiteSettingReducer.conditionLogSiteCity;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/address?1=1';

        // 检索条件
        let conditionsObj = {
            // 检索条件：收发货地点名称
            name: conditionLogSiteName,
            // 检索条件：所在城市
            city: conditionLogSiteCity === null ? '' : conditionLogSiteCity.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LogSiteSettingActionType.getLogSiteList, payload: res.result})
        } else if (res.success === false) {
            swal('获取收发货地点列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};