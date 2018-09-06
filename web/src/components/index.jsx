import React from 'react';
import ReactDOM from 'react-dom';

import {Footer, Header, Container} from './layout/index';

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
 * 主画面。(store 用来存放全局变量)
 */
const body = (
    <Provider store={store}>
        <div style={{height: '100%'}}>
            <Header/>
            <Container/>
            <Footer/>
        </div>
    </Provider>
);

/**
 * 主渲染。(根节点 渲染 组件)
 */
ReactDOM.render(
    body,
    document.getElementById('root')
);