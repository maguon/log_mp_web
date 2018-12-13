import {handleActions} from 'redux-actions';
import {NewLogSiteModalActionType} from '../../actionTypes';

const initialState = {
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
    logSiteLat: ''
};

export default handleActions({
    [NewLogSiteModalActionType.setLogSiteName]: (state, action) => {
        return {
            ...state,
            logSiteName: action.payload
        }
    },
    [NewLogSiteModalActionType.setLogSiteCity]: (state, action) => {
        return {
            ...state,
            logSiteCity: action.payload
        }
    },
    [NewLogSiteModalActionType.setLogSiteAddress]: (state, action) => {
        return {
            ...state,
            logSiteAddress: action.payload
        }
    },
    [NewLogSiteModalActionType.setLogSiteRemark]: (state, action) => {
        return {
            ...state,
            logSiteRemark: action.payload
        }
    },
    [NewLogSiteModalActionType.setLogSiteLon]: (state, action) => {
        return {
            ...state,
            logSiteLon: action.payload
        }
    },
    [NewLogSiteModalActionType.setLogSiteLat]: (state, action) => {
        return {
            ...state,
            logSiteLat: action.payload
        }
    }
}, initialState)