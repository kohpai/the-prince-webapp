import React, { FunctionComponent } from "react";
import { Col, Row } from "antd";

const LeftRightMargin: FunctionComponent = ({ children }) => (
  <Row className="padding-top">
    <Col span={1} />
    <Col span={22}>{children}</Col>
    <Col span={1} />
  </Row>
);

export default LeftRightMargin;
