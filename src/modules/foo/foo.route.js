import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Foo from './foo'

const FooRouter = () => (
    <Switch>
        <Route path="/foo" component={Foo}/>
    </Switch>
);

export default FooRouter;
