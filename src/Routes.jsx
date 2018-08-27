import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./App";
import Home from "./pages/Home";

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={App} />
    <Route path="/:id" component={Home} />
  </Route>
);

export default Routes;
