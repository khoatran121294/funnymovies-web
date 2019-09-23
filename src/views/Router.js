import React from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import _ from "lodash";
import Home from "./home";
import AppHeader from "../components/Header";
import ShareMovie from "./share-movie";

const history = createBrowserHistory();

const AppRouter = ({ account }) => (
  <Router history={history} basename="/">
    <AppHeader history={history} />
    <Switch>
      <Route
        exact
        path="/"
        component={matchprops => <Home {...matchprops} />}
      />
      <Route path="/home" component={matchprops => <Home {...matchprops} />} />
      <Route
        path="/share-movie"
        render={matchprops =>
          _.isEmpty(account.token) ? (
            <Redirect to={{ pathname: "/home" }} />
          ) : (
            <ShareMovie {...matchprops} />
          )
        }
      />
    </Switch>
  </Router>
);

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  null
)(AppRouter);
