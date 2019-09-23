import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

const loggerMiddleware = createLogger();

export default () => {
  const middleware = [thunk, loggerMiddleware];
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware))
  );
  return store;
};
