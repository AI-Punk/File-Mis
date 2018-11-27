import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ManagerPage from './routes/ManagerPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/user" exact component={IndexPage} />
      <Route path="/manager" exact component={ManagerPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
