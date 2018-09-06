import React from 'react';

import {Panel, Setting, User, UserDetail} from '../main/index';
import {HashRouter as Router, Route, Link} from "react-router-dom";

import {fileHost} from '../../config/HostConfig';

import {connect} from 'react-redux';

const routes = [
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
    {
        path: "/setting",
        exact: true,
        component: Setting
    },
    {
        path: "/panel",
        exact: true,
        component: Panel
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
        console.log(headerReducer.userInfo);
        const avatarUrl = "http://" + fileHost + "/api/image/" + headerReducer.userInfo.avatar_image;
        return (
            <Router hashType={"hashbang"}>
                <div className="context-height">
                    <ul id="slide-out" className="sidenav">
                        <li>
                            <div className="user-view blue-grey">
                                <a>

                                    <img class="circle" src={avatarUrl}/>
                                </a>
                                <a>
                                    <span className="white-text name">Name:{headerReducer.userInfo.real_name}</span>
                                </a>
                                <a>
                                    <span className="white-text email">Phone:{headerReducer.userInfo.mobile}</span>
                                </a>
                            </div>
                        </li>
                        <li className="no-padding"><Link to="/panel" className="collapsible-header"><i
                            className="mdi mdi-cards-variant"></i>面板</Link></li>
                        <li>
                            <div class="divider"></div>
                        </li>

                        <li className="no-padding"><Link to="/user" className="collapsible-header"><i
                            className="mdi mdi-account-group"></i>用户</Link></li>

                        <li>
                            <div class="divider"></div>
                        </li>
                        <li className="no-padding">
                            <ul className="collapsible collapsible-accordion">
                                <li>
                                    <a className="collapsible-header"><i className="mdi mdi-lock"></i>选项</a>
                                    <div className="collapsible-body">
                                        <ul>
                                            <li><Link to="/setting">设置</Link></li>
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
