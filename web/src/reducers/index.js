import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';

import UserReducer from './main/UserReducer';
import CitySettingReducer from './main/CitySettingReducer';
import RouteSettingReducer from './main/RouteSettingReducer';

import EnquiryModalReducer from './modules/EnquiryModalReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,HeaderReducer,UserReducer,CitySettingReducer,RouteSettingReducer,EnquiryModalReducer
})