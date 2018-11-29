import {handleActions} from 'redux-actions';
import {RouteSettingActionType} from '../../actionTypes';

const initialState = {
    // 开始城市
    startCityId: '',
    startCityName: '',
    // 终点城市
    endCityId: '',
    endCityName: '',
    // 开始城市 - 终点城市 里程
    distance: '',
    // 线路ID
    routeId: '',
    // 所有城市列表(左侧)
    startCityArray: [],
    // 所有城市列表(右侧)
    endCityArray: [],
    // 是否是编辑画面(true : 编辑路线，false : 新建路线)
    modifyFlag: false
};

export default handleActions({
    [RouteSettingActionType.setStartCityId]: (state, action) => {
        return {
            ...state,
            startCityId: action.payload
        }
    },
    [RouteSettingActionType.setStartCityName]: (state, action) => {
        return {
            ...state,
            startCityName: action.payload
        }
    },
    [RouteSettingActionType.setEndCityId]: (state, action) => {
        return {
            ...state,
            endCityId: action.payload
        }
    },
    [RouteSettingActionType.setEndCityName]: (state, action) => {
        return {
            ...state,
            endCityName: action.payload
        }
    },
    [RouteSettingActionType.setRouteId]: (state, action) => {
        return {
            ...state,
            routeId: action.payload
        }
    },
    [RouteSettingActionType.setDistance]: (state, action) => {
        return {
            ...state,
            distance: action.payload
        }
    },
    [RouteSettingActionType.getStartCityArray]: (state, action) => {
        return {
            ...state,
            startCityArray: action.payload
        }
    },
    [RouteSettingActionType.getEndCityArray]: (state, action) => {
        return {
            ...state,
            endCityArray: action.payload
        }
    },
    [RouteSettingActionType.setModifyFlag]: (state, action) => {
        return {
            ...state,
            modifyFlag: action.payload
        }
    }
}, initialState)