import React from "react";
import { Layout, Row, Col } from "antd";

import { AuthUI } from "./AuthUI";
import { NavBar } from "./NavBar";

const { Header, Content, Footer } = Layout;

interface PageProps {
  content: React.ReactNode;
}

export const PageLayout = (props: PageProps) => {
  return (
    <Row>
      <Col md={6} />
      <Col md={12}>
        <Layout>
          <Header style={{ padding: "0 1em" }}>
            <Row>
              <Col style={{ textAlign: "left" }} span={12}>
                <NavBar />
              </Col>
              <Col style={{ textAlign: "right" }} span={12}>
                <AuthUI />
              </Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col span={1} />
              <Col span={22}>{props.content}</Col>
              <Col span={1} />
            </Row>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Col>
      <Col md={6} />
    </Row>
  );
};
