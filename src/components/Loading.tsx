import React from "react";
import { Col, Row, Space, Spin, Modal } from "antd";

interface LoadingProps {
  title: string;
  text?: string;
  loading: boolean;
  onFinish?(): void;
}

export const Loading = ({ title, text, loading, onFinish }: LoadingProps) => {
  return (
    <Modal
      className="undo-info"
      title={title}
      visible={loading}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      closable={false}
      afterClose={onFinish}
    >
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
    </Modal>
  );
};
