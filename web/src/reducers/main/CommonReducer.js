import {handleActions} from 'redux-actions';
import {CommonActionType} from '../../actionTypes';

const initialState = {
    // 城市列表
    cityList: []
};

export default handleActions({
    [CommonActionType.getCityList]: (state, action) => {
        let cityList = [];
        action.payload.forEach((value) => {
            cityList.push({value: value.id, label: value.city_name})
        });
        return {
            ...state,
            cityList: cityList
        }
    }
}, initialState)

