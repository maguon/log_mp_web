import React from 'react';
import ReactDOM from 'react-dom';

import {Login,Register,ResetPassword} from './layout/index';

import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'

import reducers from '../reducers'
import {applyMiddleware,createStore,compose} from 'redux';

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const routes = [
    {

        path:"/",
        exact: true,
        component : Login
    },
    {
        path: "/register",
        exact: true,
        component : Register
    },
    {
        path: "/reset",
        exact: true,
        component : ResetPassword
    }
];
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

)

ReactDOM.render(
    body,
    document.getElementById('root')
);