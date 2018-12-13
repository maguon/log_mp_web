import {handleActions} from 'redux-actions';
import {LogSiteSettingDetailActionType} from '../../actionTypes';

const initialState = {
    // 收发货地点ID
    logSiteId: '',
    // 收发货地点名称
    logSiteName: '',
    // 所在城市
    logSiteCity: null,
    // 地址
    logSiteAddress: '',
    // 备注
    logSiteRemark: '',
    // 经度
    logSiteLon: '',
    // 纬度
    logSiteLat: '',

    // 联系方式列表
    logSiteContactArray: []
};

export default handleActions({
    [LogSiteSettingDetailActionType.setLogSiteId]: (state, action) => {
        return {
            ...state,
            logSiteId: action.payload
        }
    },
    [LogSiteSettingDetailActionType.setLogSiteName]: (state, action) => {
        return {
            ...state,
            logSiteName: action.payload
        }
    },
    [LogSiteSettingDetailActionType.setLogSiteCity]: (state, action) => {
        return {
            ...state,
            logSiteCity: action.payload
        }
    },
    [LogSiteSettingDetailActionType.setLogSiteAddress]: (state, action) => {
        return {
            ...state,
            logSiteAddress: action.payload
        }
    },
    [LogSiteSettingDetailActionType.setLogSiteRemark]: (state, action) => {
        return {
            ...state,
            logSiteRemark: action.payload
        }
    },
    [LogSiteSettingDetailActionType.setLogSiteLon]: (state, action) => {
        return {
            ...state,
            logSiteLon: action.payload
        }
    },
    [LogSiteSettingDetailActionType.setLogSiteLat]: (state, action) => {
        return {
            ...state,
            logSiteLat: action.payload
        }
    },
    [LogSiteSettingDetailActionType.getLogSiteContactList]: (state, action) => {
        return {
            ...state,
            logSiteContactArray: action.payload
        }
    }
}, initialState)