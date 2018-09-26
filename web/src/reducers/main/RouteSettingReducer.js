import {handleActions} from 'redux-actions';
import {RouteSettingActionType} from '../../actionTypes';

const initialState = {
    // 开始城市
    startCityName: '',
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

