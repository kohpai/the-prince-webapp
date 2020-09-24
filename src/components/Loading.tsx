import React from "react";
import { Col, Row, Space, Spin } from "antd";

interface LoadingProps {
  text?: string;
}

export const Loading = ({ text }: LoadingProps) => {
  return (
    <Space direction="vertical">
      <Row>
        <Col span={24}>
          <Spin size="large" />
        </Col>
      </Row>
      {text && (
        <Row>
          <Col span={24}>{text}</Col>
        </Row>
      )}
    </Space>
  );
};
