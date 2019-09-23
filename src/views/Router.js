import React from "react";
import { Switch, Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./home";
import Register from "./register";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history} basename="/">
    <Switch>
      <Route exact path="/" component={() => <Home />} />
      <Route path="/home" component={() => <Home />} />
      <Route
        path="/register"
        component={matchprops => <Register {...matchprops} />}
      />
      <Route render={() => <div>404 Page Not Found</div>} />
    </Switch>
  </Router>
);

export default AppRouter;
