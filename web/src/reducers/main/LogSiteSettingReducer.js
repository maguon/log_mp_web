import {handleActions} from 'redux-actions';
import {LogSiteSettingActionType} from '../../actionTypes';

const initialState = {
    // 检索条件：收发货地点名称
    conditionLogSiteName: '',
    // 检索条件：所在城市
    conditionLogSiteCity: null,

    // 收发货地点列表
    logSiteArray: []
};

export default handleActions({
    [LogSiteSettingActionType.getLogSiteList]: (state, action) => {
        return {
            ...state,
            logSiteArray: action.payload
        }
    },
    [LogSiteSettingActionType.setConditionLogSiteName]: (state, action) => {
        return {
            ...state,
            conditionLogSiteName: action.payload
        }
    },
    [LogSiteSettingActionType.setConditionLogSiteCity]: (state, action) => {
        return {
            ...state,
            conditionLogSiteCity: action.payload
        }
    }
}, initialState)