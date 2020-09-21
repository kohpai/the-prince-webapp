import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Row, Col, Divider } from "antd";

import { Home } from "./Home";
import { About } from "./About";
import { UserAction } from "./UserAction";
import { AuthUI } from "./AuthUI";
import { NavBar } from "./NavBar";
import { ContactIcons } from "./ContactIcons";

import "./App.css";

const { Header, Content, Footer } = Layout;

const App = () => {
  const page = window.location.pathname.substr(1);

  return (
    <div className="App">
      <Router>
        <Row>
          <Col md={6} />
          <Col md={12} className="fill-display-width">
            <Layout>
              <Header className="padding-left-right">
                <Row>
                  <Col className="info" span={12}>
                    <NavBar page={page} />
                  </Col>
                  <Col className="right-header" span={12}>
                    <AuthUI />
                  </Col>
                </Row>
              </Header>
              <Content className="padding-top">
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
              <Footer className="info">
                <Divider />
                Contact us:&nbsp; <ContactIcons />
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
