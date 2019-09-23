import React from "react";
import { Switch, Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./home";
import AppHeader from '../components/Header';
import ShareMovie from "./share-movie";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history} basename="/">
    <AppHeader history={history} />
    <Switch>
      <Route exact path="/" component={matchprops => <Home {...matchprops} />} />
      <Route path="/home" component={matchprops => <Home {...matchprops} />} />
      <Route
        path="/share-movie"
        component={matchprops => <ShareMovie {...matchprops} />}
      />
      <Route render={() => <div>404 Page Not Found</div>} />
    </Switch>
  </Router>
);

export default AppRouter;
