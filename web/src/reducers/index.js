import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';

import CommonReducer from './main/CommonReducer';
import UserStatisticReducer from './main/UserStatisticReducer';
import OrderStatisticReducer from './main/OrderStatisticReducer';
import InvoiceStatisticReducer from './main/InvoiceStatisticReducer';

import UserManagerReducer from './main/UserManagerReducer';
import UserManagerDetailReducer from './main/UserManagerDetailReducer';
import OrderManagerReducer from './main/OrderManagerReducer';
import OrderManagerDetailReducer from './main/OrderManagerDetailReducer';
import PaymentManagerReducer from './main/PaymentManagerReducer';
import PaymentManagerDetailReducer from './main/PaymentManagerDetailReducer';
import InquiryManagerReducer from './main/InquiryManagerReducer';
import InquiryManagerDetailReducer from './main/InquiryManagerDetailReducer';
import InvoiceTitleManagerReducer from './main/InvoiceTitleManagerReducer';
import InvoiceTitleManagerDetailReducer from './main/InvoiceTitleManagerDetailReducer';
import InvoiceApplyManagerReducer from './main/InvoiceApplyManagerReducer';
import InvoiceApplyManagerDetailReducer from './main/InvoiceApplyManagerDetailReducer';
import InvoiceManagerReducer from './main/InvoiceManagerReducer';
import InvoiceManagerDetailReducer from './main/InvoiceManagerDetailReducer';
import CitySettingReducer from './main/CitySettingReducer';
import RouteSettingReducer from './main/RouteSettingReducer';
import SupplierSettingReducer from './main/SupplierSettingReducer';
import SupplierSettingDetailReducer from './main/SupplierSettingDetailReducer';
import LogSiteSettingReducer from './main/LogSiteSettingReducer';
import LogSiteSettingDetailReducer from './main/LogSiteSettingDetailReducer';
import RefundApplyManagerReducer from './main/RefundApplyManagerReducer';
import RefundApplyManagerDetailReducer from './main/RefundApplyManagerDetailReducer';

import InquiryModalReducer from './modules/InquiryModalReducer';
import InquiryInfoModalReducer from './modules/InquiryInfoModalReducer';
import NewSupplierModalReducer from './modules/NewSupplierModalReducer';
import NewSupplierBankModalReducer from './modules/NewSupplierBankModalReducer';
import NewSupplierContactModalReducer from './modules/NewSupplierContactModalReducer';
import NewLogSiteModalReducer from './modules/NewLogSiteModalReducer';
import NewLogSiteContactModalReducer from './modules/NewLogSiteContactModalReducer';
import NewOfferModalReducer from './modules/NewOfferModalReducer';
import NewOrderModalReducer from './modules/NewOrderModalReducer';
import NewPaymentModalReducer from './modules/NewPaymentModalReducer';
import NewRefundModalReducer from './modules/NewRefundModalReducer';
import NewInvoiceModalReducer from './modules/NewInvoiceModalReducer';
import CancelInquiryModalReducer from './modules/CancelInquiryModalReducer';
import CancelOrderModalReducer from './modules/CancelOrderModalReducer';
import EditUserAddressModalReducer from './modules/EditUserAddressModalReducer';
import EditOrderCarModalReducer from './modules/EditOrderCarModalReducer';
import ConfirmPaymentModalReducer from './modules/ConfirmPaymentModalReducer';
import ConfirmRefundModalReducer from './modules/ConfirmRefundModalReducer';
import RefuseRefundModalReducer from './modules/RefuseRefundModalReducer';
import RefuseInvoiceModalReducer from './modules/RefuseInvoiceModalReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,

    CommonReducer,
    UserStatisticReducer,
    OrderStatisticReducer,
    InvoiceStatisticReducer,

    UserManagerReducer,
    UserManagerDetailReducer,
    OrderManagerReducer,
    OrderManagerDetailReducer,
    PaymentManagerReducer,
    PaymentManagerDetailReducer,
    InquiryManagerReducer,
    InquiryManagerDetailReducer,
    InvoiceTitleManagerReducer,
    InvoiceTitleManagerDetailReducer,
    InvoiceApplyManagerReducer,
    InvoiceApplyManagerDetailReducer,
    InvoiceManagerReducer,
    InvoiceManagerDetailReducer,
    CitySettingReducer,
    RouteSettingReducer,
    SupplierSettingReducer,
    SupplierSettingDetailReducer,
    LogSiteSettingReducer,
    LogSiteSettingDetailReducer,
    RefundApplyManagerReducer,
    RefundApplyManagerDetailReducer,

    InquiryModalReducer,
    InquiryInfoModalReducer,
    NewSupplierModalReducer,
    NewSupplierBankModalReducer,
    NewSupplierContactModalReducer,
    NewLogSiteModalReducer,
    NewLogSiteContactModalReducer,
    NewOfferModalReducer,
    NewOrderModalReducer,
    NewPaymentModalReducer,
    NewRefundModalReducer,
    NewInvoiceModalReducer,
    CancelInquiryModalReducer,
    CancelOrderModalReducer,
    EditUserAddressModalReducer,
    EditOrderCarModalReducer,
    ConfirmPaymentModalReducer,
    ConfirmRefundModalReducer,
    RefuseRefundModalReducer,
    RefuseInvoiceModalReducer
})