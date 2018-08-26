import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { configureStore } from "redux";
import App from "../src/App";
import reducer from "../src/reducers";

const render = initialState => {
  // Model the initial state
  const store = configureStore(reducer, initialState);
  let content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const preloadedState = store.getState();
  return { content, preloadedState };
};

export default render;
