import React from 'react';
import {HashRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux';
import {fileHost} from '../../config/HostConfig';
import {
    Panel,
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
    InvoiceManager,
    InvoiceManagerDetail,
    CitySetting,
    RouteSetting,
    SupplierSetting,
    SupplierSettingDetail,
    LogSiteSetting,
    LogSiteSettingDetail
} from '../main/index';

const routes = [
    // 默认打开画面 - 主控面板
    // {
    //     path: "/",
    //     exact: true,
    //     component: MainPanel
    // },
    // 默认打开画面 - 暂定面板画面
    {
        path: "/",
        exact: true,
        component: Panel
    },
    // 面板
    {
        path: "/panel",
        exact: true,
        component: Panel
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

                        <li>
                            <Link to="/panel" className="side-navigation">
                                <i className="mdi mdi-cards-variant"/>面板
                            </Link>
                        </li>
                        <li>
                            <div className="divider"/>
                        </li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header"><i className="mdi mdi-account-group"/>用户信息</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/user"><i className="mdi mdi-chevron-right"/>用户管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/invoice"><i className="mdi mdi-chevron-right"/>用户发票信息管理</Link></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <div className="divider"/>
                        </li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header"><i className="mdi mdi-cart-outline"/>订单信息</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/inquiry"><i className="mdi mdi-chevron-right"/>询价管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/order"><i className="mdi mdi-chevron-right"/>订单管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/payment"><i className="mdi mdi-chevron-right"/>支付管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/refund"><i className="mdi mdi-chevron-right"/>订单退款</Link></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="divider"/>
                        </li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header"><i className="mdi mdi-settings-outline"/>系统设置</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/city_setting"><i className="mdi mdi-chevron-right"/>城市</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/route_setting"><i className="mdi mdi-chevron-right"/>线路</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/supplier_setting"><i className="mdi mdi-chevron-right"/>供应商</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/log_site_setting"><i className="mdi mdi-chevron-right"/>收发货地点</Link></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>


                    </ul>
                    {routes.map((route, index) => (
                        // Render more <Route>s with the same paths as
                        // above, but different components this time.
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