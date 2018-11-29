import {handleActions} from 'redux-actions';
import {CitySettingActionType} from '../../actionTypes';

const initialState = {
    cityArray: [],
    cityFormFlag: false,
    cityName: ''
};

export default handleActions({
    [CitySettingActionType.getCityInfo]: (state, action) => {

        return {
            ...state,
            cityArray: action.payload
        }
    },
    [CitySettingActionType.setCityFormFlag]: (state, action) => {

        return {
            ...state,
            cityFormFlag: action.payload
        }
    },
    [CitySettingActionType.setCityName]: (state, action) => {

        return {
            ...state,
            cityName: action.payload
        }
    }
}, initialState)