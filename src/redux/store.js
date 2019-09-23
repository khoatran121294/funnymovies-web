import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import _ from "lodash";
import rootReducer from "./reducers";
import http from "../helpers/http";

const loggerMiddleware = createLogger();

export default (initialState) => {
  initialState = JSON.parse(window.localStorage.getItem('state')) || initialState;
  const middleware = [thunk, loggerMiddleware];
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
  const token = _.get(initialState, "account.token") || null;
  if (token) {
    http.setAuthorizationHeader(token);
  }
  store.subscribe(() => {
    const state = store.getState();
    const persist = {
      account: state.account
    };
    window.localStorage.setItem('state', JSON.stringify(persist));
  });
  return store;
};
