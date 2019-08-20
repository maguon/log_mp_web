import React from 'react';
import {HashRouter as Router, Route, Link, NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {fileHost} from '../../config/HostConfig';
import {
    FinancePanel,
    OrderPanel,
    OrderStatistic,
    InvoiceStatistic,
    RefundStatistic,
    InquiryStatistic,
    UserStatistic,
    PaymentStatistic,

    UserManager,
    UserManagerDetail,
    OrderManager,
    OrderManagerDetail,
    PaymentManager,
    PaymentManagerDetail,
    RefundApplyManager,
    RefundApplyManagerDetail,
    InquiryManager,
    InquiryManagerDetail,
    InvoiceTitleManager,
    InvoiceTitleManagerDetail,
    InvoiceApplyManager,
    InvoiceApplyManagerDetail,
    InvoiceManager,
    InvoiceManagerDetail,
    CitySetting,
    RouteSetting,
    SupplierSetting,
    SupplierSettingDetail,
    LogSiteSetting,
    LogSiteSettingDetail,
    CompanyBankSetting,
    DepartmentSetting,
    CallCenterSetting,
    AdminUserSetting,
    AdminUserSettingDetail,
    TransDemandManager,
    TransDemandManagerDetail,
    LoadTaskManager,
    LoadTaskManagerDetail,
    LoadTaskProfitManager,
    LoadTaskProfitManagerDetail,
    OrderProfitManager,
    OrderProfitManagerDetail,
    LoadTaskPaymentManager,
    LoadTaskPaymentManagerDetail,
    SupplierBusinessManager,
    SupplierBusinessManagerDetail,
    RecommenderSetting,
    RecommenderSettingDetail,
    RecommendBusinessManager,
    RecommendBusinessManagerDetail,
    CouponManager,
    CouponSetting
} from '../main/index';

const routes = [
    // 默认打开画面 - 暂定财务主控面板
    {
        path: "/",
        exact: true,
        component: FinancePanel
    },
    // 财务主控面板
    {
        path: "/finance_panel",
        exact: true,
        component: FinancePanel
    },
    // 订单主控面板
    {
        path: "/order_panel",
        exact: true,
        component: OrderPanel
    },

    // 统计
    {
        // 订单统计
        path: "/order_statistic",
        exact: true,
        component: OrderStatistic
    },
    {
        // 发票统计
        path: "/invoice_statistic",
        exact: true,
        component: InvoiceStatistic
    },
    {
        // 退款统计
        path: "/refund_statistic",
        exact: true,
        component: RefundStatistic
    },
    {
        // 询价统计
        path: "/inquiry_statistic",
        exact: true,
        component: InquiryStatistic
    },
    {
        // 用户统计
        path: "/user_statistic",
        exact: true,
        component: UserStatistic
    },
    {
        // 支付统计
        path: "/payment_statistic",
        exact: true,
        component: PaymentStatistic
    },

    // 用户信息
    {
        // 用户管理
        path: "/user",
        exact: true,
        component: UserManager
    },
    {
        path: '/user/:id',
        exact: true,
        component: UserManagerDetail
    },
    {
        // 用户发票信息管理
        path: "/invoice_title",
        exact: true,
        component: InvoiceTitleManager
    },
    {
        path: '/invoice_title/:id',
        exact: true,
        component: InvoiceTitleManagerDetail
    },
    {
        // 开票申请
        path: "/invoice_apply",
        exact: true,
        component: InvoiceApplyManager
    },
    {
        path: '/invoice_apply/:id',
        exact: true,
        component: InvoiceApplyManagerDetail
    },
    {
        // 发票管理
        path: "/invoice",
        exact: true,
        component: InvoiceManager
    },
    {
        path: '/invoice/:id',
        exact: true,
        component: InvoiceManagerDetail
    },

    // 订单信息
    {
        // 询价管理
        path: "/inquiry",
        exact: true,
        component: InquiryManager
    },
    {
        path: '/inquiry/:id',
        exact: true,
        component: InquiryManagerDetail
    },
    {
        // 订单管理
        path: "/order",
        exact: true,
        component: OrderManager
    },
    {
        path: '/order/:id',
        exact: true,
        component: OrderManagerDetail
    },
    {
        // 支付管理
        path: "/payment",
        exact: true,
        component: PaymentManager
    },
    {
        path: '/payment/:id',
        exact: true,
        component: PaymentManagerDetail
    },
    {
        // 订单退款管理
        path: "/refund",
        exact: true,
        component: RefundApplyManager
    },
    {
        path: '/refund/:id',
        exact: true,
        component: RefundApplyManagerDetail
    },
    {
        // 运输需求管理
        path: "/trans_demand",
        exact: true,
        component: TransDemandManager
    },
    {
        path: '/trans_demand/:id',
        exact: true,
        component: TransDemandManagerDetail
    },
    {
        // 线路管理
        path: "/load_task",
        exact: true,
        component: LoadTaskManager
    },
    {
        path: '/load_task/:id',
        exact: true,
        component: LoadTaskManagerDetail
    },
    {
        // 车辆利润
        path: "/load_task_profit",
        exact: true,
        component: LoadTaskProfitManager
    },
    {
        path: '/load_task_profit/:id',
        exact: true,
        component: LoadTaskProfitManagerDetail
    },
    {
        // 订单利润
        path: "/order_profit",
        exact: true,
        component: OrderProfitManager
    },
    {
        path: '/order_profit/:id',
        exact: true,
        component: OrderProfitManagerDetail
    },
    {
        // 线路结算
        path: "/load_task_payment",
        exact: true,
        component: LoadTaskPaymentManager
    },
    {
        path: '/load_task_payment/:id',
        exact: true,
        component: LoadTaskPaymentManagerDetail
    },
    {
        // 供应商业务
        path: "/supplier_business",
        exact: true,
        component: SupplierBusinessManager
    },
    {
        path: '/supplier_business/:id',
        exact: true,
        component: SupplierBusinessManagerDetail
    },
    {
        // 推广业绩
        path: "/recommend_business",
        exact: true,
        component: RecommendBusinessManager
    },
    {
        path: '/recommend_business/:id',
        exact: true,
        component: RecommendBusinessManagerDetail
    },

    // 设置模块
    {
        // 城市
        path: "/city_setting",
        exact: true,
        component: CitySetting
    },
    {
        // 线路
        path: "/route_setting",
        exact: true,
        component: RouteSetting
    },
    {
        // 供应商
        path: "/supplier_setting",
        exact: true,
        component: SupplierSetting
    },
    {
        // 供应商 - 详情
        path: '/supplier_setting/:id',
        exact: true,
        component: SupplierSettingDetail
    },
    {
        // 收发货地点
        path: "/log_site_setting",
        exact: true,
        component: LogSiteSetting
    },
    {
        // 收发货地点 - 详情
        path: '/log_site_setting/:id',
        exact: true,
        component: LogSiteSettingDetail
    },
    {
        // 收款账户设置
        path: "/company_bank_setting",
        exact: true,
        component: CompanyBankSetting
    },
    {
        // 部门管理
        path: "/department_setting",
        exact: true,
        component: DepartmentSetting
    },
    {
        // 部门管理
        path: "/call_center_setting",
        exact: true,
        component: CallCenterSetting
    },
    {
        // 员工管理
        path: "/admin_user_setting",
        exact: true,
        component: AdminUserSetting
    },
    {
        path: '/admin_user_setting/:id',
        exact: true,
        component: AdminUserSettingDetail
    },
    {
        // 推荐人管理
        path: "/recommend_setting",
        exact: true,
        component: RecommenderSetting
    },
    {
        path: '/recommend_setting/:id',
        exact: true,
        component: RecommenderSettingDetail
    },
    {
        // 优惠券领取
        path: "/coupon_manager",
        exact: true,
        component: CouponManager
    },
    {
        // 优惠券设置
        path: "/coupon_setting",
        exact: true,
        component: CouponSetting
    }
];

class Container extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {headerReducer} = this.props;
        let avatarUrl = "";
        if (headerReducer.userInfo && headerReducer.userInfo.avatar_image) {
            avatarUrl = "http://" + fileHost + "/api/image/" + headerReducer.userInfo.avatar_image;
        } else {
            avatarUrl = "/assets/images/avatar.png"
        }

        // TODO 后期可以根据登录用户权限 动态生成 不同的菜单数组
        let menuItem = [
            {
                "label": '主控面板',
                "icon": 'mdi-speedometer',
                "children": [
                    {
                        "link": '/finance_panel',
                        "name": '财务主控'
                    },
                    {
                        "link": '/order_panel',
                        "name": '订单主控'
                    },
                    {
                        "link": '/recommend_business',
                        "name": '推广业绩'
                    }
                ]
            }, {
                "label": '数据统计',
                "icon": 'mdi-chart-line',
                "children": [
                    {
                        "link": '/order_statistic',
                        "name": '订单统计'
                    },
                    {
                        "link": '/invoice_statistic',
                        "name": '发票统计'
                    },
                    {
                        "link": '/refund_statistic',
                        "name": '退款统计'
                    },
                    {
                        "link": '/inquiry_statistic',
                        "name": '询价统计'
                    },
                    {
                        "link": '/user_statistic',
                        "name": '用户统计'
                    },
                    {
                        "link": '/payment_statistic',
                        "name": '支付统计'
                    }
                ]
            },
            {
                "label": '用户信息',
                "icon": 'mdi-account-group',
                "children": [
                    {
                        "link": '/user',
                        "name": '用户管理'
                    },
                    {
                        "link": '/invoice_title',
                        "name": '用户发票信息管理'
                    }
                ]
            },{
                "label": '发票信息',
                "icon": 'mdi-cash-100',
                "children": [
                    {
                        "link": '/invoice_apply',
                        "name": '开票申请'
                    },
                    {
                        "link": '/invoice',
                        "name": '发票管理'
                    }
                ]
            },{
                "label": '订单信息',
                "icon": 'mdi-cart-outline',
                "children": [
                    {
                        "link": '/inquiry',
                        "name": '询价管理'
                    },
                    {
                        "link": '/order',
                        "name": '订单管理'
                    },
                    {
                        "link": '/trans_demand',
                        "name": '运输需求'
                    },
                    {
                        "link": '/load_task',
                        "name": '线路管理'
                    },
                    {
                        "link": '/supplier_business',
                        "name": '供应商业务'
                    }
                ]
            },
            {
                "label": '支付信息',
                "icon": 'mdi-currency-cny',
                "children": [
                    {
                        "link": '/payment',
                        "name": '支付管理'
                    },
                    {
                        "link": '/refund',
                        "name": '订单退款'
                    },
                    {
                        "link": '/coupon_manager',
                        "name": '优惠券领取'
                    }
                ]
            },
            {
                "label": '结算信息',
                "icon": 'mdi-cash-multiple',
                "children": [
                    {
                        "link": '/load_task_payment',
                        "name": '线路结算'
                    },
                    {
                        "link": '/load_task_profit',
                        "name": '车辆利润'
                    },
                    {
                        "link": '/order_profit',
                        "name": '订单利润'
                    }
                ]
            },
            {
                "label": '系统设置',
                "icon": 'mdi-settings-outline',
                "children": [
                    {
                        "link": '/city_setting',
                        "name": '城市'
                    },
                    {
                        "link": '/route_setting',
                        "name": '线路'
                    },
                    {
                        "link": '/supplier_setting',
                        "name": '供应商'
                    },
                    {
                        "link": '/log_site_setting',
                        "name": '收发货地点'
                    },
                    {
                        "link": '/company_bank_setting',
                        "name": '收款账户设置'
                    },
                    {
                        "link": '/department_setting',
                        "name": '部门管理'
                    },
                    {
                        "link": '/admin_user_setting',
                        "name": '员工管理'
                    },
                    {
                        "link": '/recommend_setting',
                        "name": '推荐人管理'
                    },
                    {
                        "link": '/coupon_setting',
                        "name": '优惠券设置'
                    },
                    {
                        "link": '/call_center_setting',
                        "name": '客服电话'
                    }
                ]
            }
        ];

        return (
            <Router hashType={"hashbang"}>
                <div className="main-body">
                    <ul id="slide-out" className="side-nav height-percent100">
                        <li>
                            <div className="user-view blue-grey">
                                <img className="circle" src={avatarUrl}/>
                                <span className="white-text name">Name:{headerReducer.userInfo.real_name}</span>
                                <span className="white-text email">Phone:{headerReducer.userInfo.phone}</span>
                            </div>
                        </li>

                        {menuItem.map(function (item) {
                            return (
                                <div>
                                    <li>
                                        <ul className="collapsible collapsible-accordion">
                                            <li>
                                                <a className="collapsible-header"><i className={`mdi ${item.icon}`}/>{item.label}</a>
                                                <div className="collapsible-body">
                                                    {item.children.map(function (menu) {
                                                        return (
                                                            <ul>
                                                                <li><NavLink to={menu.link} activeClassName="active"><i className="mdi mdi-chevron-right"/>{menu.name}
                                                                </NavLink></li>
                                                                <li><div className="divider"/></li>
                                                            </ul>
                                                        )
                                                    })}
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><div className="divider"/></li>
                                </div>
                            )
                        })}
                    </ul>
                    {routes.map((route, index) => (
                        // Render more <Route>s with the same paths as above, but different components this time.
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))}
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        headerReducer: state.HeaderReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    // getUserDetail: (userId) => {
    //     dispatch(headerAction.getUserDetail({userId: userId}));
    // },
    // logout: () => {
    //     dispatch(headerAction.logout())
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container)