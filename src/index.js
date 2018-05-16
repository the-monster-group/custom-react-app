import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
const BRAND = process.env.BRAND;

import Routes from './routes';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
const root = document.createElement('div');

document.body.appendChild(root);
// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        router: routerReducer
    }),
    applyMiddleware(middleware)
);

ReactDOM.render((
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <ConnectedRouter history={history}>
            <Routes />
        </ConnectedRouter>
    </Provider>
), root);