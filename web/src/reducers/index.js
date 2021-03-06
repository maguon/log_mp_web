import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import LoginReducer from './layout/LoginReducer';
import HeaderReducer from './layout/HeaderReducer';
import InquiryModalReducer from './modules/InquiryModalReducer';
import EditLoginUserModalReducer from './modules/EditLoginUserModalReducer';

import CommonReducer from './main/CommonReducer';
import FinancePanelReducer from './main/FinancePanelReducer';
import OrderPanelReducer from './main/OrderPanelReducer';

import OrderStatisticReducer from './main/OrderStatisticReducer';
import InvoiceStatisticReducer from './main/InvoiceStatisticReducer';
import RefundStatisticReducer from './main/RefundStatisticReducer';
import InquiryStatisticReducer from './main/InquiryStatisticReducer';
import PaymentStatisticReducer from './main/PaymentStatisticReducer';
import UserStatisticReducer from './main/UserStatisticReducer';

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
import DepartmentSettingReducer from './main/DepartmentSettingReducer';
import CallCenterSettingReducer from './main/CallCenterSettingReducer';
import CompanyBankSettingReducer from './main/CompanyBankSettingReducer';
import RefundApplyManagerReducer from './main/RefundApplyManagerReducer';
import RefundApplyManagerDetailReducer from './main/RefundApplyManagerDetailReducer';
import AdminUserSettingReducer from './main/AdminUserSettingReducer';
import AdminUserSettingDetailReducer from './main/AdminUserSettingDetailReducer';
import TransDemandManagerReducer from './main/TransDemandManagerReducer';
import TransDemandManagerDetailReducer from './main/TransDemandManagerDetailReducer';
import LoadTaskManagerReducer from './main/LoadTaskManagerReducer';
import LoadTaskManagerDetailReducer from './main/LoadTaskManagerDetailReducer';
import LoadTaskProfitManagerReducer from './main/LoadTaskProfitManagerReducer';
import LoadTaskProfitManagerDetailReducer from './main/LoadTaskProfitManagerDetailReducer';
import OrderProfitManagerReducer from './main/OrderProfitManagerReducer';
import OrderProfitManagerDetailReducer from './main/OrderProfitManagerDetailReducer';
import LoadTaskPaymentManagerReducer from './main/LoadTaskPaymentManagerReducer';
import LoadTaskPaymentManagerDetailReducer from './main/LoadTaskPaymentManagerDetailReducer';
import SupplierBusinessManagerReducer from './main/SupplierBusinessManagerReducer';
import SupplierBusinessManagerDetailReducer from './main/SupplierBusinessManagerDetailReducer';
import RecommenderSettingReducer from './main/RecommenderSettingReducer';
import RecommenderSettingDetailReducer from './main/RecommenderSettingDetailReducer';
import RecommendBusinessManagerReducer from './main/RecommendBusinessManagerReducer';
import RecommendBusinessManagerDetailReducer from './main/RecommendBusinessManagerDetailReducer';
import CouponSettingReducer from './main/CouponSettingReducer';
import CouponManagerReducer from './main/CouponManagerReducer';
import ProductReducer from './main/ProductReducer';
import ProductDetailReducer from './main/ProductDetailReducer';
import ProductOrderReducer from './main/ProductOrderReducer';
import ProductOrderDetailReducer from './main/ProductOrderDetailReducer';
import ProductRemindReducer from './main/ProductRemindReducer';
import ProductPaymentReducer from './main/ProductPaymentReducer';
import ProductPaymentDetailReducer from './main/ProductPaymentDetailReducer';

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
import EditCompanyBankModalReducer from './modules/EditCompanyBankModalReducer';
import EditDepartmentModalReducer from './modules/EditDepartmentModalReducer';
import EditCustomerPhoneModalReducer from './modules/EditCustomerPhoneModalReducer';
import ConfirmPaymentModalReducer from './modules/ConfirmPaymentModalReducer';
import ConfirmRefundModalReducer from './modules/ConfirmRefundModalReducer';
import RefuseRefundModalReducer from './modules/RefuseRefundModalReducer';
import RefuseInvoiceModalReducer from './modules/RefuseInvoiceModalReducer';
import NewAdminModalReducer from './modules/NewAdminModalReducer';
import NewLoadTaskModalReducer from './modules/NewLoadTaskModalReducer';
import LoadTaskCarDetailModalReducer from './modules/LoadTaskCarDetailModalReducer';
import EditLogAddressModalReducer from './modules/EditLogAddressModalReducer';
import SyncInfoModalReducer from './modules/SyncInfoModalReducer';
import SupplierPaymentDetailModalReducer from './modules/SupplierPaymentDetailModalReducer';
import OrderPaymentDetailModalReducer from './modules/OrderPaymentDetailModalReducer';
import LoadTaskInfoModalReducer from './modules/LoadTaskInfoModalReducer';
import NewRecommenderModalReducer from './modules/NewRecommenderModalReducer';
import AdvertisingModalReducer from './modules/AdvertisingModalReducer';
import EditCouponModalReducer from './modules/EditCouponModalReducer';
import EditUserCouponModalReducer from './modules/EditUserCouponModalReducer';
import NewProductModalReducer from './modules/NewProductModalReducer';
import EditProductRemindModalReducer from './modules/EditProductRemindModalReducer';
import ProductInfoModalReducer from './modules/ProductInfoModalReducer';
import ProductOrderRefundModalReducer from './modules/ProductOrderRefundModalReducer';
import NewProductRecommendModalReducer from './modules/NewProductRecommendModalReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,
    InquiryModalReducer,
    EditLoginUserModalReducer,

    CommonReducer,
    FinancePanelReducer,
    OrderPanelReducer,
    OrderStatisticReducer,
    InvoiceStatisticReducer,
    RefundStatisticReducer,
    InquiryStatisticReducer,
    PaymentStatisticReducer,
    UserStatisticReducer,

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
    DepartmentSettingReducer,
    CallCenterSettingReducer,
    CompanyBankSettingReducer,
    RefundApplyManagerReducer,
    RefundApplyManagerDetailReducer,
    AdminUserSettingReducer,
    AdminUserSettingDetailReducer,
    TransDemandManagerReducer,
    TransDemandManagerDetailReducer,
    LoadTaskManagerReducer,
    LoadTaskManagerDetailReducer,
    LoadTaskProfitManagerReducer,
    LoadTaskProfitManagerDetailReducer,
    OrderProfitManagerReducer,
    OrderProfitManagerDetailReducer,
    LoadTaskPaymentManagerReducer,
    LoadTaskPaymentManagerDetailReducer,
    SupplierBusinessManagerReducer,
    SupplierBusinessManagerDetailReducer,
    RecommenderSettingReducer,
    RecommenderSettingDetailReducer,
    RecommendBusinessManagerReducer,
    RecommendBusinessManagerDetailReducer,
    CouponSettingReducer,
    CouponManagerReducer,
    ProductReducer,
    ProductDetailReducer,
    ProductOrderReducer,
    ProductOrderDetailReducer,
    ProductRemindReducer,
    ProductPaymentReducer,
    ProductPaymentDetailReducer,

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
    EditCompanyBankModalReducer,
    EditDepartmentModalReducer,
    EditCustomerPhoneModalReducer,
    ConfirmPaymentModalReducer,
    ConfirmRefundModalReducer,
    RefuseRefundModalReducer,
    RefuseInvoiceModalReducer,
    NewAdminModalReducer,
    NewLoadTaskModalReducer,
    LoadTaskCarDetailModalReducer,
    EditLogAddressModalReducer,
    SyncInfoModalReducer,
    SupplierPaymentDetailModalReducer,
    OrderPaymentDetailModalReducer,
    LoadTaskInfoModalReducer,
    NewRecommenderModalReducer,
    AdvertisingModalReducer,
    EditCouponModalReducer,
    EditUserCouponModalReducer,
    NewProductModalReducer,
    EditProductRemindModalReducer,
    ProductInfoModalReducer,
    ProductOrderRefundModalReducer,
    NewProductRecommendModalReducer
})