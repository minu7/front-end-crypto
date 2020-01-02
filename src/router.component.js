// @flow

import React from 'react';
import { Header } from 'components';
import { LogoutUser } from 'sideEffects';
import {
  Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import type { State } from 'type';
import { router } from './Screens';
import dependencies from './Dependencies';

type Props = {
  logout: () => void,
  user: any,
}

const RouterComponent = (props: Props) => (
  <Router history={dependencies.Router}>
    {!dependencies.getToken() && <Redirect to="/login" />}
    <Switch>
      {router.filter(screen => {
        if (screen.forAdmin && props.user && !props.user.admin) {
          return false;
        }
        return true;
      }).map(screen => (
        <Route key={screen.path} exact={screen.exact} path={screen.path}>
          {screen.showHeader && <Header logout={() => {
            props.logout();
          }}
          />}
          <screen.component />
        </Route>
      ))}
      <Redirect to="/" />
    </Switch>
  </Router>
);

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(LogoutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);
