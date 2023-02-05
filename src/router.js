import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
// import IndexPage from './routes/Index/IndexPage.tsx';
import ReactArray from '@src/routes/ReactArray/IndexPage.jsx';
import PositionTest from '@src/routes/PositionTest/Index.jsx';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={IndexPage} /> */}
        <Route path="/reactArray" exact component={ReactArray} />
        <Route path="/position" exact component={PositionTest} />
        <Redirect path="/" to="/position"/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
