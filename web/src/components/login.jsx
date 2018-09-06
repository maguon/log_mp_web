import React from 'react';
import ReactDOM from 'react-dom';

import {Login, Register, ResetPassword} from './layout/index';

import {HashRouter as Router, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'

import reducers from '../reducers'
import {applyMiddleware, createStore, compose} from 'redux';

/**
 * 数据仓库(存放全局变量, 将reducers注入store)
 */
const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * 登录画面路由配置。
 */
const routes = [
    // 登录画面
    {
        path: "/",
        exact: true,
        component: Login
    },
    // 注册用户
    {
        path: "/register",
        exact: true,
        component: Register
    },
    // 重置密码
    {
        path: "/reset",
        exact: true,
        component: ResetPassword
    }
];

/**
 * 主画面。(store 用来存放全局变量)
 */
const body = (
    <Provider store={store}>
        <Router hashType={"hashbang"}>
            <div>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </div>
        </Router>
    </Provider>
);

/**
 * 主渲染。(根节点 渲染 组件)
 */
ReactDOM.render(
    body,
    document.getElementById('root')
);