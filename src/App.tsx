import React from "react";
import { Layout, Typography, Row, Col, Table } from "antd";

// import logo from "./logo.svg";
import "./App.css";

type FeatureStatus = "Good" | "Bad";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const columns = [
    {
      title: "Service Feature",
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: FeatureStatus) =>
        status === "Good" ? (
          <span role="img" aria-label="smiley-face">
            ✔️
          </span>
        ) : (
          <span role="img" aria-label="smiley-face">
            ❌
          </span>
        ),
    },
    {
      title: "Last check",
      dataIndex: "checked_at",
      key: "checked_at",
      render: (date: Date) => date.toLocaleTimeString(),
    },
  ];
  const data = [
    {
      key: "1",
      feature: "Printing server is online",
      status: "Good",
      checked_at: new Date(),
    },
    {
      key: "2",
      feature: "Printer is connected",
      status: "Bad",
      checked_at: new Date(),
    },
    {
      key: "3",
      feature: "Is now a good time to pick up my documents?",
      status: "Good",
      checked_at: new Date(),
    },
  ];
  return (
    <div className="App">
      <Row>
        <Col md={6} />
        <Col md={12}>
          <Layout>
            <Header>
              <span style={{ color: "whitesmoke" }}>Header</span>
            </Header>
            <Content>
              <Row>
                <Col span={1} />
                <Col span={22}>
                  <Title level={3}>
                    <span className="avoidwrap">
                      Print your documents,&nbsp;
                    </span>
                    <span className="avoidwrap">
                      available almost 24 hours<sup className="origin">1</sup>!
                    </span>
                  </Title>
                  <ol style={{ textAlign: "left" }}>
                    <li>
                      Register or login to top up your wallet (minimum amount of
                      5 €, you can save it for later{" "}
                      <span role="img" aria-label="smiley-face">
                        😊
                      </span>
                      )
                    </li>
                    <li>
                      Upload and print your document (you can set color mode and
                      page range as well)
                    </li>
                    <li>
                      Get your documents at Vogeliusweg 12/12.1.3, 33100
                      Paderborn. See the map below. (Please try not to come
                      after 23.00 and before 6.30, you can still print the
                      documents and get it later though!)
                    </li>
                  </ol>
                  <Paragraph
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <sup>1</sup>The service is available from{" "}
                    <b>DUSK TILL DAWN</b> around <b>18.00 - 08.00</b>. Please
                    see the service health check below for realtime status.
                  </Paragraph>
                  <Row>
                    <Col md={2} />
                    <Col md={20}>
                      <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{ hideOnSinglePage: true }}
                      />
                    </Col>
                    <Col md={2} />
                  </Row>
                </Col>
                <Col span={1} />
              </Row>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Col>
        <Col md={6} />
      </Row>
    </div>
  );
}

export default App;
