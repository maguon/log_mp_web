import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';

import CommonReducer from './main/CommonReducer';
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
import LogSiteSettingReducer from './main/LogSiteSettingReducer';
import LogSiteSettingDetailReducer from './main/LogSiteSettingDetailReducer';

import InquiryModalReducer from './modules/InquiryModalReducer';
import InquiryInfoModalReducer from './modules/InquiryInfoModalReducer';
import NewSupplierModalReducer from './modules/NewSupplierModalReducer';
import NewSupplierBankModalReducer from './modules/NewSupplierBankModalReducer';
import NewSupplierContactModalReducer from './modules/NewSupplierContactModalReducer';
import NewLogSiteModalReducer from './modules/NewLogSiteModalReducer';
import NewLogSiteContactModalReducer from './modules/NewLogSiteContactModalReducer';
import NewOfferModalReducer from './modules/NewOfferModalReducer';
import CancelInquiryModalReducer from './modules/CancelInquiryModalReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,

    CommonReducer,
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
    LogSiteSettingReducer,
    LogSiteSettingDetailReducer,

    InquiryModalReducer,
    InquiryInfoModalReducer,
    NewSupplierModalReducer,
    NewSupplierBankModalReducer,
    NewSupplierContactModalReducer,
    NewLogSiteModalReducer,
    NewLogSiteContactModalReducer,
    NewOfferModalReducer,
    CancelInquiryModalReducer
})