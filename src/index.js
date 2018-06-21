import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './routes';

const root = document.createElement('div');

document.body.appendChild(root);

const store = createStore(() => ({strong: 1})
, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
), root);