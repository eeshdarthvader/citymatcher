import React from "react";
import { Col } from "react-flexbox-grid/lib";

const Box = props => {
  return (
    <Col {...props}>
      <div className="box">{props.children}</div>
    </Col>
  );
};

export default Box;
