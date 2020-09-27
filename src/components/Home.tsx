import React from "react";
import { Typography, Table, Row, Col, Space, Divider } from "antd";

import { Loading } from "./Loading";
import { HealthStats } from "./commonTypes";

interface ServiceStatusProps {
  healthStats?: HealthStats;
}

interface HomeProps {
  loading: boolean;
  healthStats?: HealthStats;
}

interface HealthStatsRecord {
  key: string;
  feature: string;
  status: boolean;
  checkedAt: Date;
}

const { Title, Paragraph } = Typography;

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
    render: (status: boolean) =>
      status ? (
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
    dataIndex: "checkedAt",
    key: "checkedAt",
    render: (date: Date) => date.toLocaleString(),
  },
];

const UserActionFlow = () => (
  <ol className="info">
    <li>
      Sign up or sign in to top up your wallet (minimum amount of 5 €, you can
      save it for later{" "}
      <span role="img" aria-label="smiley-face">
        😊
      </span>
      )
    </li>
    <li>
      Upload and print your document (you can set color mode and page range as
      well)
    </li>
    <li>
      Get your documents at Vogeliusweg 12/12.1.3, 33100 Paderborn. See the map
      below. (Please try not to come after 23.00 and before 6.30, you can still
      print the documents and get it later though!)
    </li>
  </ol>
);

const ServiceStatus = ({ healthStats }: ServiceStatusProps) => {
  const now = new Date();
  const server: HealthStatsRecord = {
    key: "1",
    feature: "Printing server is online",
    status: false,
    checkedAt: now,
  };
  const printer: HealthStatsRecord = {
    key: "2",
    feature: "Printer is connected",
    status: false,
    checkedAt: now,
  };
  const welcome: HealthStatsRecord = {
    key: "3",
    feature: "Is now a good time to pick up my documents?",
    status: false,
    checkedAt: now,
  };

  if (healthStats) {
    server.status = true;
    printer.status = healthStats.printerConnected;
    welcome.status = healthStats.welcome;
  }

  return (
    <Table
      columns={columns}
      dataSource={[server, printer, welcome]}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export const Home = ({ healthStats, loading }: HomeProps) => {
  return (
    <>
      <Space className="expand-space" direction="vertical" size="large">
        <Row>
          <Col span={24}>
            <Title level={3}>
              <span className="avoidwrap">Print your documents,&nbsp;</span>
              <span className="avoidwrap">
                available almost 24 hours<sup className="origin">1</sup>!
              </span>
            </Title>
            <UserActionFlow />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Paragraph className="info">
              <sup>1</sup>The service is available from <b>DUSK TILL DAWN</b>{" "}
              around <b>18.00 - 08.00</b>. Please see the service health check
              below for realtime status.
            </Paragraph>
            <ServiceStatus healthStats={healthStats} />
          </Col>
        </Row>
        <Row>
          <Col className="info" span={24}>
            <Divider orientation="left">
              <Title level={4}>Pick it up here!</Title>
            </Divider>
            <iframe
              className="map-iframe"
              width="100%"
              height="450"
              title="gmaps"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCdAgrKsZH0EVltMS1uOE6sJxIZzB4H1X8&q=The+Prince:+almost-24-hour+printing+service"
              allowFullScreen={true}
            />
          </Col>
        </Row>
      </Space>
      <Loading
        title="Checking service"
        loading={loading}
        text="Please wait while we're checking the service's status."
      />
    </>
  );
};
