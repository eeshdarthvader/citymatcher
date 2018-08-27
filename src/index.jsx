import React from "react";
import ReactDOM, { hydrate } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { isEmpty } from "utils";
import { Router, browserHistory } from "react-router";
import Routes from "./Routes";
import reducer from "./reducers";
import dataService from "../src/dataMiddleware";

import "./styles/app.scss";

const initialState = window.__STATE__ || {};
delete window.___STATE__;

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__() &&
    initialState,
  applyMiddleware(dataService)
);

const isHydration = !isEmpty(initialState);

const isProd = process.env.NODE_ENV === "production";

const renderRoot = hydration => {
  if (hydration) {
    ReactDOM.hydrate(
      <Provider store={store}>
        <Router history={browserHistory} routes={Routes} />
      </Provider>,
      document.getElementById("root")
    );
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory} routes={Routes} />
      </Provider>,
      document.getElementById("root")
    );
  }
};

renderRoot(isHydration);

store.dispatch({ type: "GET_NEWCITY_DATA" });

if (!isProd && module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept("./Routes", () => {
    renderRoot();
  });
}
