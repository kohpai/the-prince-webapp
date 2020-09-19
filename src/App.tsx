import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Row, Col } from "antd";

import { Home } from "./Home";
import { About } from "./About";
import { UserAction } from "./UserAction";
import { AuthUI } from "./AuthUI";
import { NavBar } from "./NavBar";

import "./App.css";
import { FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const App = () => {
  const page = window.location.pathname.substr(1);
  console.log("Kohpai", page);
  return (
    <div className="App">
      <Router>
        <Row>
          <Col md={6} />
          <Col md={12} style={{ flexGrow: 1 }}>
            <Layout>
              <Header style={{ padding: "0 1em" }}>
                <Row>
                  <Col style={{ textAlign: "left" }} span={12}>
                    <NavBar page={page} />
                  </Col>
                  <Col style={{ textAlign: "right" }} span={12}>
                    <AuthUI />
                  </Col>
                </Row>
              </Header>
              <Content style={{ paddingTop: "1em" }}>
                <Row>
                  <Col span={1} />
                  <Col span={22}>
                    <Switch>
                      <Route path="/user">
                        <UserAction />
                      </Route>
                      <Route path="/about">
                        <About />
                      </Route>
                      <Route path="/">
                        <Home />
                      </Route>
                    </Switch>
                  </Col>
                  <Col span={1} />
                </Row>
              </Content>
              <Footer style={{ textAlign: "left" }}>
                Contact us:
                <a
                  href="https://www.facebook.com/The-Prince-almost-24-hour-printing-service-115488230299288/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookFilled style={{ width: "4em" }} />
                </a>
                <a
                  href="https://github.com/kohpai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoogleCircleFilled />
                </a>
              </Footer>
            </Layout>
          </Col>
          <Col md={6} />
        </Row>
      </Router>
    </div>
  );
};

export default App;
