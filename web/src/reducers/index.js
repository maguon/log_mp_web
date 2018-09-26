import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';

import EnquiryReducer from './main/EnquiryReducer';
import UserReducer from './main/UserReducer';
import CitySettingReducer from './main/CitySettingReducer';
import RouteSettingReducer from './main/RouteSettingReducer';
import TempReducer from './main/TempReducer';

export default combineReducers({
    form: reduxFormReducer,
    UserReducer,LoginReducer,HeaderReducer,EnquiryReducer,CitySettingReducer,RouteSettingReducer,TempReducer
})