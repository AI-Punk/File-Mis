import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import ManagerPage from './routes/ManagerPage';
import EntryPage from './routes/EntryPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={ManagerPage} />
      <Route path="/entry" exact component={EntryPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
