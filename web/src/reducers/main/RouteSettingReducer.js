import {handleActions} from 'redux-actions';
import {RouteSettingActionType} from '../../actionTypes';

const initialState = {
    // 开始城市
    startCityName: '暂无',
    // 所有城市列表(右侧)
    cityArray: [],
};

export default handleActions({
    [RouteSettingActionType.setStartCityName]: (state, action) => {
        return {
            ...state,
            startCityName: action.payload
        }
    },
    [RouteSettingActionType.getCityArray]: (state, action) => {
        return {
            ...state,
            cityArray: action.payload
        }
    }
}, initialState)

