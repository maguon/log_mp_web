import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';

import UserManagerReducer from './main/UserManagerReducer';
import UserManagerDetailReducer from './main/UserManagerDetailReducer';
import InquiryManagerReducer from './main/InquiryManagerReducer';
import InquiryManagerDetailReducer from './main/InquiryManagerDetailReducer';
import InvoiceManagerReducer from './main/InvoiceManagerReducer';
import InvoiceManagerDetailReducer from './main/InvoiceManagerDetailReducer';
import CitySettingReducer from './main/CitySettingReducer';
import RouteSettingReducer from './main/RouteSettingReducer';
import SupplierSettingReducer from './main/SupplierSettingReducer';
import SupplierSettingDetailReducer from './main/SupplierSettingDetailReducer';

import InquiryModalReducer from './modules/InquiryModalReducer';
import InquiryInfoModalReducer from './modules/InquiryInfoModalReducer';
import NewSupplierModalReducer from './modules/NewSupplierModalReducer';
import NewSupplierBankModalReducer from './modules/NewSupplierBankModalReducer';
import NewSupplierContactModalReducer from './modules/NewSupplierContactModalReducer';
import NewOfferModalReducer from './modules/NewOfferModalReducer';
import CancelInquiryModalReducer from './modules/CancelInquiryModalReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,

    UserManagerReducer,
    UserManagerDetailReducer,
    InquiryManagerReducer,
    InquiryManagerDetailReducer,
    InvoiceManagerReducer,
    InvoiceManagerDetailReducer,
    CitySettingReducer,
    RouteSettingReducer,
    SupplierSettingReducer,
    SupplierSettingDetailReducer,

    InquiryModalReducer,
    InquiryInfoModalReducer,
    NewSupplierModalReducer,
    NewSupplierBankModalReducer,
    NewSupplierContactModalReducer,
    NewOfferModalReducer,
    CancelInquiryModalReducer
})