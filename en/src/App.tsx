import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Layout, Row, Col, Divider, Affix } from "antd";

import firebase from "./lib/firebase";

import {
  Home,
  About,
  UserAction,
  AuthUI,
  NavBar,
  ContactIcons,
} from "./components";

import "./App.css";

const { Header, Content, Footer } = Layout;

const HEALTH_STATS = gql`
  query HealthStats {
    healthStats {
      printerConnected
      welcome
    }
  }
`;

const App = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const { data, loading } = useQuery(HEALTH_STATS);

  const page = window.location.pathname.substr(1);

  firebase
    .auth()
    .onAuthStateChanged((signedInUser) =>
      signedInUser ? setUser(signedInUser) : setUser(null)
    );

  return (
    <div className="App">
      <Router>
        <Row>
          <Col md={6} />
          <Col md={12} className="fill-display-width">
            <Layout>
              <Affix offsetTop={0}>
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
              </Affix>
              <Content className="padding-top">
                <Row>
                  <Col span={1} />
                  <Col span={22}>
                    <Switch>
                      {user && (
                        <Route path="/user">
                          <UserAction healthStats={data?.healthStats} />
                        </Route>
                      )}
                      <Route path="/about">
                        <About />
                      </Route>
                      <Route path="/home">
                        <Home
                          loading={loading}
                          healthStats={data?.healthStats}
                        />
                      </Route>
                      <Route path="/">
                        <Redirect to="/home" />
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
