import {handleActions} from 'redux-actions';
import {RouteSettingActionType} from '../../actionTypes';

const initialState = {
    // 开始城市
    startCityName: '',
    // 终点城市
    endCityName: '',
    // 开始城市 - 终点城市 里程
    distance: '',
    // 所有城市列表(左侧)
    startCityArray: [],
    // 所有城市列表(右侧)
    endCityArray: []
};

export default handleActions({
    [RouteSettingActionType.setStartCityName]: (state, action) => {
        return {
            ...state,
            startCityName: action.payload
        }
    },
    [RouteSettingActionType.setEndCityName]: (state, action) => {
        return {
            ...state,
            endCityName: action.payload
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
    }
}, initialState)

