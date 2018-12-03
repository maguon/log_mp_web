import React from 'react';
import {HashRouter as Router, Route, Link} from "react-router-dom";
import {connect} from 'react-redux';
import {fileHost} from '../../config/HostConfig';
import {Panel, User, UserDetail, InquiryManager, InquiryManagerDetail, CitySetting, RouteSetting} from '../main/index';

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
    // 用户管理
    {
        path: "/user",
        exact: true,
        component: User
    },
    {
        path: '/user/:id',
        exact: true,
        component: UserDetail
    },
    // 询价管理
    {
        path: "/inquiry",
        exact: true,
        component: InquiryManager
    },
    {
        path: '/inquiry/:id',
        exact: true,
        component: InquiryManagerDetail
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
                            <Link to="/user" className="side-navigation">
                                <i className="mdi mdi-account-group"/>用户
                            </Link>
                        </li>
                        <li>
                            <div className="divider"/>
                        </li>

                        <li>
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header"><i className="mdi mdi-lock"/>询价管理</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/inquiry"><i className="mdi mdi-chevron-right"/>询价管理</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/XXXXXX"><i className="mdi mdi-chevron-right"/>XXXXXX</Link></li>
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
                                    <a className="collapsible-header"><i className="mdi mdi-lock"/>设置</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/city_setting"><i className="mdi mdi-chevron-right"/>城市</Link></li>
                                            <li><div className="divider"/></li>
                                            <li><Link to="/route_setting"><i className="mdi mdi-chevron-right"/>线路</Link></li>
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
    getUserDetail: (userId) => {
        dispatch(headerAction.getUserDetail({userId: userId}))
    },
    logout: () => {
        dispatch(headerAction.logout())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container)