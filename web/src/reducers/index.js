import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';

import UserReducer from './main/UserReducer'
import LoginReducer from './layout/LoginReducer'
import HeaderReducer from './layout/HeaderReducer'

export default combineReducers({
    form: reduxFormReducer,
    UserReducer,LoginReducer,HeaderReducer
})