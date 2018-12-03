import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';

import CitySettingReducer from './main/CitySettingReducer';
import RouteSettingReducer from './main/RouteSettingReducer';
import UserManagerReducer from './main/UserManagerReducer';
import UserManagerDetailReducer from './main/UserManagerDetailReducer';
import InquiryManagerReducer from './main/InquiryManagerReducer';
import InquiryManagerDetailReducer from './main/InquiryManagerDetailReducer';

import InquiryModalReducer from './modules/InquiryModalReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,

    CitySettingReducer,
    RouteSettingReducer,
    UserManagerReducer,
    UserManagerDetailReducer,
    InquiryManagerReducer,
    InquiryManagerDetailReducer,

    InquiryModalReducer
})