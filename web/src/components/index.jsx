import React from 'react';
import ReactDOM from 'react-dom';

import {Footer,Header,Container,Nav} from './layout/index';

import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import reducers from '../reducers'
import {applyMiddleware,createStore,compose} from 'redux';

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const body = (
    <Provider store={store}>
        <div>
            <Header/>
            <Container/>
            <Footer/>
        </div>
    </Provider>

)

ReactDOM.render(
    body,
    document.getElementById('root')
);