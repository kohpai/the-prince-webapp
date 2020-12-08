import React, { FunctionComponent } from "react";
import { Col, Row } from "antd";

const LeftRightMargin: FunctionComponent = ({ children }) => (
  <Row>
    <Col span={1} />
    <Col span={22}>{children}</Col>
    <Col span={1} />
  </Row>
);

export default LeftRightMargin;
