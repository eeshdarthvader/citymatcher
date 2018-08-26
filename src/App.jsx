import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "Lib/Header";
import Home from "./pages/Home";

class App extends Component {
  render() {
    return (
      <div className="cityMatcherApp">
        <Header />
        <Home />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

App.defaultProps = {
  children: null
};

export default connect(
  null,
  null
)(App);
