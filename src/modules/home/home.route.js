import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home';

const HomeRouter = () => (
    <Switch>
        <Route path="/" exact component={Home}/>
    </Switch>
);

export default HomeRouter;
