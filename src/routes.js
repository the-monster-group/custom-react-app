import React from 'react';
import HomeRouter from './modules/home/home.route';
import FooRouter from './modules/foo/foo.route';
import './vendors.scss';

import { hot } from 'react-hot-loader'

const Routes = () => (
    <div>
        <HomeRouter />
        <FooRouter />
    </div>
)

export default hot(module)(Routes)
