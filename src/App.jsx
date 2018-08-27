import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "Lib/Header";
import Home from "./pages/Home";

class App extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="cityMatcherApp">
        <Header />
        <Home {...this.props} />
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
